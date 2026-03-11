from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel

from backend.database import get_db
from backend.models import PantryItem

router = APIRouter(prefix="/pantry", tags=["Pantry"])


# ── Schemas (what the API expects / returns) ──────────────────────────────────

class PantryItemCreate(BaseModel):
    name: str
    quantity: float
    unit: str | None = None  # optional, e.g. "grams", "pieces", "ml"

class PantryItemUpdate(BaseModel):
    quantity: float


# ── Routes ────────────────────────────────────────────────────────────────────

# GET /pantry — fetch everything in the pantry
@router.get("/")
def get_pantry(db: Session = Depends(get_db)):
    items = db.query(PantryItem).all()
    return {"pantry": items}


# POST /pantry/add — add a new item (or update quantity if it already exists)
@router.post("/add")
def add_item(item: PantryItemCreate, db: Session = Depends(get_db)):
    # normalize name — lowercase and strip spaces
    name = item.name.lower().strip()

    # check if item already exists
    existing = db.query(PantryItem).filter(PantryItem.name == name).first()

    if existing:
        # if it exists, just add to the quantity
        existing.quantity += item.quantity
        db.commit()
        db.refresh(existing)
        return {"message": f"Updated {name}", "item": existing}

    # otherwise create a new row
    new_item = PantryItem(name=name, quantity=item.quantity, unit=item.unit)
    db.add(new_item)
    db.commit()
    db.refresh(new_item)
    return {"message": f"Added {name}", "item": new_item}


# DELETE /pantry/{item_name} — remove an item from pantry
@router.delete("/{item_name}")
def delete_item(item_name: str, db: Session = Depends(get_db)):
    name = item_name.lower().strip()
    item = db.query(PantryItem).filter(PantryItem.name == name).first()

    if not item:
        raise HTTPException(status_code=404, detail=f"{name} not found in pantry")

    db.delete(item)
    db.commit()
    return {"message": f"Removed {name} from pantry"}


# PATCH /pantry/{item_name} — manually update quantity (e.g. used 2 eggs)
@router.patch("/{item_name}")
def update_quantity(item_name: str, update: PantryItemUpdate, db: Session = Depends(get_db)):
    name = item_name.lower().strip()
    item = db.query(PantryItem).filter(PantryItem.name == name).first()

    if not item:
        raise HTTPException(status_code=404, detail=f"{name} not found in pantry")

    if update.quantity <= 0:
        # if quantity hits 0 or below, just delete the item
        db.delete(item)
        db.commit()
        return {"message": f"{name} used up, removed from pantry"}

    item.quantity = update.quantity
    db.commit()
    db.refresh(item)
    return {"message": f"Updated {name}", "item": item}


# POST /pantry/deduct — auto-deduct ingredients after cooking a recipe
@router.post("/deduct")
def deduct_ingredients(ingredients: list[str], db: Session = Depends(get_db)):
    not_found = []
    deducted = []

    for ingredient in ingredients:
        name = ingredient.lower().strip()
        item = db.query(PantryItem).filter(PantryItem.name == name).first()

        if not item:
            not_found.append(name)
            continue

        # for now deduct by 1 unit — will refine when recipe returns quantities
        item.quantity -= 1

        if item.quantity <= 0:
            db.delete(item)
        else:
            db.commit()
            db.refresh(item)

        deducted.append(name)

    db.commit()
    return {
        "deducted": deducted,
        "not_found": not_found
    }
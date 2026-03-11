import os
import json
from groq import Groq

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from dotenv import load_dotenv

from backend.database import get_db
from backend.models import PantryItem

load_dotenv()

router = APIRouter(prefix="/recipe", tags=["Recipe"])

client = Groq(api_key=os.getenv("GROQ_API_KEY"))


# ── Schema ────────────────────────────────────────────────────────────────────

class RecipeRequest(BaseModel):
    calorie_target: int | None = None  # optional, e.g. 500


# ── Route ─────────────────────────────────────────────────────────────────────

@router.post("/suggest")
def suggest_recipe(request: RecipeRequest, db: Session = Depends(get_db)):

    # 1. fetch current pantry from DB
    pantry_items = db.query(PantryItem).all()

    if not pantry_items:
        raise HTTPException(status_code=400, detail="Your pantry is empty. Add some ingredients first.")

    # 2. format pantry into a readable string for the prompt
    pantry_str = ", ".join(
        [f"{item.quantity} {item.unit or ''} {item.name}".strip() for item in pantry_items]
    )

    # 3. build calorie instruction
    calorie_instruction = (
        f"The recipe should be around {request.calorie_target} calories total."
        if request.calorie_target
        else "Show the estimated calorie count for the recipe."
    )

    # 4. build the prompt
    prompt = f"""You are a nutritionist chef. The user has these ingredients at home: {pantry_str}.

Suggest one simple, balanced recipe using only these ingredients.
{calorie_instruction}

Respond ONLY with a JSON object in this exact format, no extra text, no markdown:
{{
  "recipe_name": "name of the recipe",
  "ingredients_used": ["ingredient1", "ingredient2"],
  "steps": ["step 1", "step 2", "step 3"],
  "total_calories": 400,
  "macros": {{
    "protein_g": 20,
    "carbs_g": 45,
    "fat_g": 10
  }},
  "serving_size": "1 bowl / 2 servings etc"
}}"""

    # 5. call Groq (Llama 3.3 70B)
    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "system",
                    "content": "You are a nutritionist chef. Always respond with valid JSON only. No extra text, no markdown, no code fences."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.7,
            max_tokens=1000,
        )

        raw = response.choices[0].message.content

        # 6. parse the JSON response
        clean = raw.replace("```json", "").replace("```", "").strip()
        recipe = json.loads(clean)

    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Model returned an unexpected format. Try again.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Groq API error: {str(e)}")

    return {
        "pantry_used": pantry_str,
        "recipe": recipe
    }
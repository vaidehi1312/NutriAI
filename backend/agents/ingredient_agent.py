import json
from pathlib import Path

# Fixed path — looks for nutrition.json inside backend/data/
DATA_PATH = Path(__file__).resolve().parents[1] / "data" / "nutrition.json"

with open(DATA_PATH) as f:
    NUTRITION_DB = json.load(f)


def normalize_ingredients(user_items: list[str]) -> list[dict]:
    """
    Takes a list of raw ingredient strings from the user.
    Returns a list of matched ingredients with their nutrition data.
    """
    results = []

    for item in user_items:
        item = item.lower().strip()

        # remove common quantity words like "some", "a few", "fresh"
        for word in ["some", "a few", "fresh", "frozen", "dried", "large", "small", "medium"]:
            item = item.replace(word, "").strip()

        # simple plural handling — "eggs" → "egg", "bananas" → "banana"
        if item.endswith("s") and item[:-1] in NUTRITION_DB:
            item = item[:-1]

        if item in NUTRITION_DB:
            results.append({
                "ingredient": item,
                "nutrition_per_100g": NUTRITION_DB[item]
            })
        else:
            # still include it but flag as unrecognized
            results.append({
                "ingredient": item,
                "nutrition_per_100g": None,
                "note": "not found in nutrition database"
            })

    return results


def get_nutrition(ingredient_name: str) -> dict | None:
    """
    Direct lookup for a single ingredient by name.
    Returns nutrition data or None if not found.
    """
    name = ingredient_name.lower().strip()

    if name in NUTRITION_DB:
        return NUTRITION_DB[name]

    # try without trailing s
    if name.endswith("s") and name[:-1] in NUTRITION_DB:
        return NUTRITION_DB[name[:-1]]

    return None
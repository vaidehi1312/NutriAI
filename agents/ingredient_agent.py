import json
from pathlib import Path

DATA_PATH = Path(__file__).resolve().parents[1] / "data" / "nutrition.json"

with open(DATA_PATH) as f:
    NUTRITION_DB = json.load(f)


def normalize_ingredients(user_items):
    cleaned = []

    for item in user_items:
        item = item.lower().strip()

        # simple plural handling
        if item.endswith("s"):
            item = item[:-1]

        if item in NUTRITION_DB:
            cleaned.append(item)

    return cleaned

from fastapi import FastAPI
from app.agents.ingredient_agent import normalize_ingredients

app = FastAPI(title="NutriAI Backend")

@app.post("/normalize")
def normalize(items: list[str]):
    cleaned = normalize_ingredients(items)
    return {
        "original": items,
        "cleaned_ingredients": cleaned
    }

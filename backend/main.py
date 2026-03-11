from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.database import Base, engine
from backend import models
from backend.routes.pantry import router as pantry_router
from backend.routes.recipe import router as recipe_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="NutriAI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(pantry_router)
app.include_router(recipe_router)
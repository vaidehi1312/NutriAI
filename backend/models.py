from sqlalchemy import Column, Integer, String, Float
from backend.database import Base


class PantryItem(Base):
    __tablename__ = "pantry"

    id       = Column(Integer, primary_key=True, index=True)
    name     = Column(String, unique=True, nullable=False)  # e.g. "eggs"
    quantity = Column(Float, nullable=False)                # e.g. 6.0
    unit     = Column(String, nullable=True)                # e.g. "pieces", "grams", "ml"
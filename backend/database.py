from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# This creates a local file called nutriai.db in your project root
DATABASE_URL = "sqlite:///./nutriai.db"

# The engine is the core connection to the database
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}  # needed for SQLite only
)

# Each instance of SessionLocal will be a database session
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class that all models (tables) will inherit from
Base = declarative_base()


# Dependency — use this in your route files to get a DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

import sys
import os

# Add parent directory to path to import app modules
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.database import engine, Base
from app import models  # Import models so they are registered with Base

def reset_database():
    print("Dropping all tables...")
    try:
        Base.metadata.drop_all(bind=engine)
        print("All tables dropped.")
    except Exception as e:
        print(f"Error dropping tables: {e}")

    print("Creating all tables...")
    try:
        Base.metadata.create_all(bind=engine)
        print("All tables created successfully.")
    except Exception as e:
        print(f"Error creating tables: {e}")

if __name__ == "__main__":
    reset_database()


import sys
import os
from sqlalchemy import create_url
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

# Add parent directory to path to import app modules
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.database import engine
from app import models

def check_students():
    print("\n--- Current Students in Database ---")
    with Session(engine) as session:
        students = session.query(models.Student).all()
        if not students:
            print("No students found in the database.")
            return

        for s in students:
            print(f"ID: {s.id} | Name: {s.name} | Email: {s.email} | Edu: {s.education} | Bg: {s.background} | Status: {s.degree_status}")
    print("------------------------------------\n")

if __name__ == "__main__":
    check_students()

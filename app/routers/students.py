
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app import models, schemas, database

router = APIRouter(
    prefix="/students",
    tags=["Students"]
)

@router.post("/", response_model=schemas.StudentResponse)
def create_student(student: schemas.StudentCreate, db: Session = Depends(database.get_db)):
    # Check if student exists by email
    db_student = db.query(models.Student).filter(models.Student.email == student.email).first()
    if db_student:
        return db_student
    
    new_student = models.Student(
        name=student.name,
        email=student.email,
        phone=student.phone,
        education=student.education,
        interests=student.interests,
        budget=student.budget
    )
    db.add(new_student)
    db.commit()
    db.refresh(new_student)
    return new_student

@router.get("/{student_id}", response_model=schemas.StudentResponse)
def get_student(student_id: int, db: Session = Depends(database.get_db)):
    student = db.query(models.Student).filter(models.Student.id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    return student

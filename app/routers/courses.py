
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app import models, schemas, database

router = APIRouter(
    prefix="/courses",
    tags=["Courses"]
)

@router.get("/", response_model=List[schemas.CourseResponse])
def get_courses(
    skip: int = 0,
    limit: int = 10,
    min_fees: Optional[int] = Query(None, description="Minimum fees"),
    max_fees: Optional[int] = Query(None, description="Maximum fees"),
    duration: Optional[str] = Query(None, description="Course duration"),
    search: Optional[str] = Query(None, description="Search by title or description"),
    db: Session = Depends(database.get_db)
):
    query = db.query(models.Course)

    if min_fees:
        query = query.filter(models.Course.fees >= min_fees)
    if max_fees:
        query = query.filter(models.Course.fees <= max_fees)
    if duration:
        query = query.filter(models.Course.duration.ilike(f"%{duration}%"))
    if search:
        query = query.filter(
            (models.Course.title.ilike(f"%{search}%")) | 
            (models.Course.description.ilike(f"%{search}%"))
        )

    courses = query.offset(skip).limit(limit).all()
    return courses

@router.get("/{course_id}", response_model=schemas.CourseResponse)
def get_course(course_id: int, db: Session = Depends(database.get_db)):
    course = db.query(models.Course).filter(models.Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return course

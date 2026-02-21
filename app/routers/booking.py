
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app import models, schemas, database
from datetime import datetime

router = APIRouter(
    prefix="/bookings",
    tags=["Bookings"]
)

@router.post("/book-session", response_model=schemas.BookingResponse)
def book_session(booking: schemas.BookingCreate, db: Session = Depends(database.get_db)):
    print(f"DEBUG: Booking session for student {booking.student_id} and course {booking.course_id}")
    # Check if course exists
    course = db.query(models.Course).filter(models.Course.id == booking.course_id).first()
    if not course:
        print("DEBUG: Course not found")
        raise HTTPException(status_code=404, detail="Course not found")

    # Check if student exists
    student = db.query(models.Student).filter(models.Student.id == booking.student_id).first()
    if not student:
        print("DEBUG: Student not found")
        raise HTTPException(status_code=404, detail="Student not found")

    # Check for existing booking
    existing_booking = db.query(models.Booking).filter(
        models.Booking.student_id == booking.student_id,
        models.Booking.course_id == booking.course_id
    ).first()
    
    if existing_booking:
         print("DEBUG: Duplicate booking detected")
         # If already paid, we just return it instead of erroring, or handle specifically
         if existing_booking.payment_status == 'paid':
             return existing_booking
         raise HTTPException(status_code=400, detail="Booking already exists for this course")

    new_booking = models.Booking(
        student_id=booking.student_id,
        course_id=booking.course_id,
        payment_status=booking.payment_status,
        booking_date=datetime.utcnow()
    )
    
    db.add(new_booking)
    db.commit()
    db.refresh(new_booking)
    print(f"DEBUG: Booking success: {new_booking.id}")
    return new_booking

@router.get("/", response_model=list[schemas.BookingResponse])
def get_bookings(skip: int = 0, limit: int = 10, db: Session = Depends(database.get_db)):
    bookings = db.query(models.Booking).offset(skip).limit(limit).all()
    return bookings

from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

# -------------------------
# STUDENT SCHEMAS
# -------------------------
class StudentBase(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    education: Optional[str] = None
    background: Optional[str] = None
    degree_status: Optional[str] = None
    interests: Optional[str] = None
    budget: Optional[int] = None

class StudentCreate(StudentBase):
    pass

class StudentResponse(StudentBase):
    id: int
    
    class Config:
        from_attributes = True

# -------------------------
# COURSE SCHEMAS
# -------------------------
class CourseBase(BaseModel):
    title: str
    description: Optional[str] = None
    duration: Optional[str] = None
    fees: int
    career_path: Optional[str] = None
    eligibility: Optional[str] = None

class CourseCreate(CourseBase):
    pass

class CourseResponse(CourseBase):
    id: int
    
    class Config:
        from_attributes = True

# -------------------------
# BOOKING SCHEMAS
# -------------------------
class BookingBase(BaseModel):
    student_id: int
    course_id: int
    payment_status: Optional[str] = "pending"

class BookingCreate(BookingBase):
    pass

class BookingResponse(BookingBase):
    id: int
    booking_date: datetime
    
    class Config:
        from_attributes = True

# -------------------------
# CHAT SCHEMAS
# -------------------------
class ChatRequest(BaseModel):
    session_id: Optional[str] = None
    student_id: Optional[int] = None
    query: str

class ChatResponse(BaseModel):
    session_id: str
    response: str
    recommended_courses: List[CourseResponse] = []

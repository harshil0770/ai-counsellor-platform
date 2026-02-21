from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime

from app.database import Base



# -------------------------
# STUDENT TABLE
# -------------------------
class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    email = Column(String(100), unique=True)
    phone = Column(String(20))
    education = Column(String(200))  # e.g. "High School", "Bachelor's"
    background = Column(String(50))   # e.g. "IT", "Non-IT"
    degree_status = Column(String(50)) # e.g. "Pursuing", "Completed"
    interests = Column(String(500))  # Comma-separated or JSON string
    budget = Column(Integer)         # Max budget

    bookings = relationship("Booking", back_populates="student")


# -------------------------
# COURSE TABLE
# -------------------------
class Course(Base):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200))
    description = Column(String(500))
    duration = Column(String(50))
    fees = Column(Integer)
    career_path = Column(String(500))
    eligibility = Column(String(500))

    bookings = relationship("Booking", back_populates="course")


# -------------------------
# BOOKING TABLE
# -------------------------
class Booking(Base):
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True, index=True)

    student_id = Column(Integer, ForeignKey("students.id"))
    course_id = Column(Integer, ForeignKey("courses.id"))

    booking_date = Column(DateTime, default=datetime.utcnow)
    payment_status = Column(String(20), default="pending")  # pending, paid, failed

    student = relationship("Student", back_populates="bookings")
    course = relationship("Course", back_populates="bookings")


# -------------------------
# CHAT MEMORY TABLES
# -------------------------
class ChatSession(Base):
    __tablename__ = "chat_sessions"

    id = Column(String(36), primary_key=True, index=True) # UUID
    student_id = Column(Integer, ForeignKey("students.id"), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    messages = relationship("ChatMessage", back_populates="session", cascade="all, delete-orphan")


class ChatMessage(Base):
    __tablename__ = "chat_messages"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(String(36), ForeignKey("chat_sessions.id"))
    sender = Column(String(10)) # "user" or "bot"
    message = Column(String(1000))
    timestamp = Column(DateTime, default=datetime.utcnow)

    session = relationship("ChatSession", back_populates="messages")

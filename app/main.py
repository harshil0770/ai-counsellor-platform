
import logging
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine
from app import models
from app.routers import courses, booking, chat, payment, students

# Configure Logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
logger.info("Backend connection established")

app = FastAPI(title="Agentic AI Counsellor Backend")

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ AUTO CREATE TABLES
models.Base.metadata.create_all(bind=engine)

# Routers
app.include_router(courses.router)
app.include_router(booking.router)
app.include_router(chat.router)
app.include_router(payment.router)
app.include_router(students.router)

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Global Error: {exc}")
    return JSONResponse(
        status_code=500,
        content={"message": "Internal Server Error", "details": str(exc)},
    )

@app.get("/")
def home():
    return {"message": "AI Counsellor API running"}
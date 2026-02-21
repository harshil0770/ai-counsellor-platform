
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import models, schemas, database
from app.agents.intent import intent_agent
from app.agents.retrieval import retrieval_agent
from app.agents.recommendation import recommendation_agent
# from app.agents.eligibility import eligibility_agent # Can be used for advanced filtering

router = APIRouter(
    prefix="/chat",
    tags=["Chat"]
)


from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import models, schemas, database
from app.agents.intent import intent_agent
from app.agents.retrieval import retrieval_agent
from app.agents.recommendation import recommendation_agent
import uuid

router = APIRouter(
    prefix="/chat",
    tags=["Chat"]
)

@router.post("/", response_model=schemas.ChatResponse)
def chat(request: schemas.ChatRequest, db: Session = Depends(database.get_db)):
    # 1. Manage Session
    session_id = request.session_id
    if not session_id:
        session_id = str(uuid.uuid4())
        new_session = models.ChatSession(id=session_id, student_id=request.student_id)
        db.add(new_session)
        db.commit()
    else:
        # Verify session exists
        session = db.query(models.ChatSession).filter(models.ChatSession.id == session_id).first()
        if not session:
            # Create if ID provided but not found (or raise error depending on policy)
            new_session = models.ChatSession(id=session_id, student_id=request.student_id)
            db.add(new_session)
            db.commit()

    # 2. Store User Message
    user_msg = models.ChatMessage(session_id=session_id, sender="user", message=request.query)
    db.add(user_msg)
    db.commit()

    # 3. Retrieve History
    history_objs = db.query(models.ChatMessage).filter(models.ChatMessage.session_id == session_id).order_by(models.ChatMessage.timestamp).all()
    history = [{"sender": msg.sender, "message": msg.message} for msg in history_objs]

    # 4. Analyze Intent (Pass history if needed, for now just query)
    # Enhancement: We could extract entities from history too
    intent_data = intent_agent.analyze(request.query)
    intent = intent_data["intent"]
    entities = intent_data["entities"]

    # 5. Retrieve Courses
    courses = []
    if intent in ["course_query", "book_session"] or entities.get("interests") or entities.get("budget"):
        raw_courses = retrieval_agent.search_courses(entities, db)
        
        # 5.1 Smart Filtering (Background & Degree)
        # Fetch student if available to apply profile-based filtering
        student = None
        if request.student_id:
            student = db.query(models.Student).filter(models.Student.id == request.student_id).first()
        
        from app.agents.eligibility import eligibility_agent
        if student:
            courses = [c for c in raw_courses if eligibility_agent.check_eligibility(student, c)]
        else:
            courses = raw_courses

    # 6. Generate Recommendation with History
    response_text = recommendation_agent.generate_response(intent, courses, entities, history)

    # 7. Store Bot Response
    bot_msg = models.ChatMessage(session_id=session_id, sender="bot", message=response_text)
    db.add(bot_msg)
    db.commit()

    return schemas.ChatResponse(
        session_id=session_id,
        response=response_text,
        recommended_courses=courses
    )

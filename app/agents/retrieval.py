
from sqlalchemy.orm import Session
from app import models

class RetrievalAgent:
    def search_courses(self, entities: dict, db: Session):
        query = db.query(models.Course)
        
        interests = entities.get("interests", [])
        budget = entities.get("budget")

        if interests:
            # Filter by interest in title or description
            filters = []
            for interest in interests:
                filters.append(models.Course.title.ilike(f"%{interest}%"))
                filters.append(models.Course.description.ilike(f"%{interest}%"))
            query = query.filter((filters[0]) | (filters[1] if len(filters) > 1 else filters[0]))
            # Note: This is a simplified OR for the demo. In production, use properly constructed OR clauses.
            from sqlalchemy import or_
            query = query.filter(or_(*filters))

        if budget:
            query = query.filter(models.Course.fees <= budget)
            
        return query.limit(5).all()

retrieval_agent = RetrievalAgent()

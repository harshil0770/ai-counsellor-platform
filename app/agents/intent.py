
import re


class IntentAgent:
    def __init__(self):
        self.intents = {
            "book_session": ["book", "booking", "enroll", "appointment", "schedule", "register", "join"],
            "course_query": ["course", "learn", "study", "fees", "duration", "cost", "price", "teach", "classes", "path", "roadmap"],
            "eligibility": ["eligible", "eligibility", "can i", "requirements", "criteria", "can join"],
            "general_info": ["hello", "hi", "help", "info", "about", "who are you", "what do you do"]
        }

    def analyze(self, query: str) -> dict:
        query_lower = query.lower()
        detected_intent = "general_info"
        entities = {}

        # Detect Intent
        for intent, keywords in self.intents.items():
            if any(word in query_lower for word in keywords):
                detected_intent = intent
                break
        
        # Extract Budget: "under 5000", "5k", "budget of 10,000", "max 50000"
        budget_match = re.search(r'(?:under|budget|max|limit|within|around|costing|for)\s?([\d,]+)(k?)', query_lower)
        if not budget_match:
            # Fallback for just "5k" or "5000"
            budget_match = re.search(r'\b([\d,]+)(k?)\b', query_lower)

        if budget_match:
            try:
                amount_str = budget_match.group(1).replace(',', '')
                amount = int(amount_str)
                if budget_match.group(2).lower() == 'k':
                    amount *= 1000
                if amount > 100: # Ignore very small numbers that might be IDs
                    entities["budget"] = amount
            except:
                pass
        
        # Interests: Broaden tech keywords
        tech_keywords = [
            "python", "java", "data science", "web development", "react", "machine learning", "ai", 
            "cloud", "aws", "cybersecurity", "design", "ui/ux", "frontend", "backend", "full stack",
            "javascript", "sql", "analyst", "devops", "flutter", "mobile"
        ]
        detected_interests = [kw for kw in tech_keywords if kw in query_lower]
        if detected_interests:
            entities["interests"] = detected_interests

        return {
            "intent": detected_intent,
            "entities": entities
        }

intent_agent = IntentAgent()

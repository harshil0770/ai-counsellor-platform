
from typing import List
from app import models

class RecommendationAgent:
    def generate_response(self, intent: str, courses: List[models.Course], entities: dict, history: List[dict] = []) -> str:
        # Check history for context (simple example)
        user_name = "Student"
        # Logic to extract name from history could go here
            
        if intent == "general_info":
            return f"Hello {user_name}! I am your **AI Career Assistant**. 🤖\n\nI can help you with:\n* 🔍 **Finding Courses**: Search by tech or budget.\n* ⚖️ **Eligibility Check**: See if you qualify for a course.\n* 📅 **Booking**: Secure your spot in a session.\n\nWhat would you like to explore today?"
            
        if intent == "book_session":
            return "To book a session, you can go to the **Explore** page and click 'Enroll Now' on your desired course, or just tell me which course you're interested in!"

        if intent == "eligibility":
            if not courses:
                return "I can check your eligibility, but I need to know which course you are interested in first. Please tell me a subject or course name!"
            return f"For **{courses[0].title}**, the eligibility criteria is: *{courses[0].eligibility}*. \n\nDoes this match your profile?"

        if not courses:
            if not entities.get("interests"):
                return "I'd love to help! Could you tell me what subjects or technologies you're interested in? (e.g., Python, AI, Web Dev)"
            
            msg = "I couldn't find any specific courses matching your exact criteria right now."
            if "budget" in entities:
                 msg += f" (Budget: ₹{entities['budget']:,})"
            
            return msg + " \n\nWould you like to see our **most popular courses** instead?"

        # Recommendations found
        top_courses = courses[:3]
        count = len(courses)
        
        if entities.get('budget'):
            response = f"Success! I found **{count}** courses within your budget of **₹{entities['budget']:,}**.\n\n"
        elif entities.get('interests'):
            response = f"Based on your interest in **{', '.join(entities['interests'])}**, here are the best options for you:\n\n"
        else:
            response = "Here are some great courses you might like:\n\n"
            
        for i, course in enumerate(top_courses):
            response += f"#### {i+1}. {course.title}\n"
            response += f"* ⏱️ **Duration:** {course.duration}\n"
            response += f"* 💰 **Fee:** ₹{course.fees:,}\n"
            response += f"* 🚀 **Path:** {course.career_path}\n"
            response += f"[View Details & Register](/book/{course.id})\n\n"
        
        if count > 3:
            response += f"*...and {count - 3} more matching courses! Ask for more if needed.*\n\n"
        
        response += "Would you like me to help you with the registration for any of these?"
        
        return response

recommendation_agent = RecommendationAgent()


from app import models

class EligibilityAgent:
    def check_eligibility(self, student: models.Student, course: models.Course) -> bool:
        # Simple Logic: If course requires "Bachelor" and student has "High School", return False
        if not student.education:
            return True # Assume eligible if unknown
            
        course_req = course.eligibility.lower() if course.eligibility else ""
        student_edu = student.education.lower()

        if "bachelor" in course_req and "high school" in student_edu:
            return False

        # Background Check: Prevent Non-IT from jumping straight into advanced tech unless it's a "Beginner" course
        course_title = course.title.lower()
        is_advanced_tech = any(x in course_title for x in ["data science", "machine learning", "artificial intelligence", "deep learning"])
        
        if student.background == "Non-IT" and is_advanced_tech:
            # If student is Non-IT and it's an advanced tech course, check if description mentions "Beginner"
            if "beginner" not in (course.description or "").lower():
                return False
            
        return True

eligibility_agent = EligibilityAgent()

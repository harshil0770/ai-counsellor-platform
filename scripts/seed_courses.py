
import sys
import os
import random

# Add parent directory to path to import app modules
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.database import SessionLocal, engine, Base
from app.models import Course

def create_courses():
    # Base.metadata.drop_all(bind=engine) # Optional: Uncomment to reset DB
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    categories = {
        "Data Science": ["Python for Data Science", "Machine Learning A-Z", "Deep Learning Specialization", "Data Visualization with Tableau", "Big Data Analytics"],
        "Web Development": ["Full Stack Web Development", "React - The Complete Guide", "Node.js API Masterclass", "Angular Zero to Hero", "HTML5 & CSS3 Bootcamp"],
        "Cyber Security": ["Ethical Hacking for Beginners", "Cyber Security Analyst", "Network Security Fundamentals", "Penetration Testing", "CISSP Preparation"],
        "Digital Marketing": ["SEO Mastery", "Social Media Marketing", "Google Ads Certification", "Content Marketing Strategy", "Email Marketing Essentials"],
        "UI/UX Design": ["Google UX Design Professional Certificate", "Figma for UI Design", "User Research Fundamentals", "Adobe XD Masterclass", "Design Thinking Workshop"],
        "Cloud Computing": ["AWS Certified Solutions Architect", "Azure Fundamentals", "Google Cloud Associate Engineer", "DevOps on AWS", "Kubernetes for Beginners"],
        "AI": ["Artificial Intelligence A-Z", "Natural Language Processing with Python", "Computer Vision Masterclass", "Generative AI Fundamentals", "TensorFlow Developer Certificate"]
    }

    levels = ["Beginner", "Intermediate", "Advanced", "Professional"]
    
    courses = []
    
    print("Generating diverse courses...")
    
    for category, titles in categories.items():
        for title in titles:
            # Generate 3 variations for each title
            for i in range(3):
                level = random.choice(levels)
                final_title = f"{title} - {level}"
                if i > 0:
                    final_title += f" (Batch {i+1})"
                
                fees = random.randint(3000, 80000) # INR
                
                # Mix of Weeks and Months
                if random.choice([True, False]):
                    duration_val = random.choice([4, 6, 8, 10, 12, 16, 20, 24])
                    duration = f"{duration_val} Weeks"
                else:
                    duration_val = random.choice([3, 6, 9, 12, 18, 24])
                    duration = f"{duration_val} Months"
                
                description = f"Become an expert in {category} with this {level} level course. {final_title} covers all essential topics including real-world projects, mentorship, and career guidance."
                
                course = Course(
                    title=final_title,
                    description=description,
                    duration=duration,
                    fees=fees,
                    career_path=f"{category} Specialist, {category} Engineer",
                    eligibility="Bachelor's Degree or Equivalent Interest"
                )
                courses.append(course)

    # Add some random filler courses to reach a higher count if needed, but the category ones are high quality
    
    try:
        db.add_all(courses)
        db.commit()
        print(f"Successfully added {len(courses)} premium courses!")
    except Exception as e:
        print(f"Error adding courses: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    create_courses()

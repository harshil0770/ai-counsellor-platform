
import os
import pymysql
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def check_students():
    db_url = os.getenv("DB_URL")
    if not db_url:
        print("DB_URL not found in .env")
        return

    # Parse mysql+pymysql://root:root@localhost/ai_counsellor
    try:
        url = db_url.replace("mysql+pymysql://", "")
        auth, rest = url.split("@")
        user, password = auth.split(":")
        host_db = rest.split("/")
        host = host_db[0]
        db_name = host_db[1]

        connection = pymysql.connect(
            host=host,
            user=user,
            password=password,
            database=db_name,
            cursorclass=pymysql.cursors.DictCursor
        )

        with connection.cursor() as cursor:
            sql = "SELECT id, name, email, background, degree_status FROM students"
            cursor.execute(sql)
            result = cursor.fetchall()
            
            print("\n--- Current Students in MySQL ---")
            if not result:
                print("No students found.")
            for row in result:
                print(f"ID: {row['id']} | Name: {row['name']} | Email: {row['email']} | Background: {row['background']} | Status: {row['degree_status']}")
            print("---------------------------------\n")

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    check_students()

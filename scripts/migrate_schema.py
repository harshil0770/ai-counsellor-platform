
import os
import pymysql
from dotenv import load_dotenv

load_dotenv()

def migrate_db():
    db_url = os.getenv("DB_URL")
    if not db_url:
        print("DB_URL not found")
        return

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
            database=db_name
        )

        with connection.cursor() as cursor:
            print("Checking schema...")
            # Check if columns exist
            cursor.execute("DESCRIBE students")
            columns = [row[0] for row in cursor.fetchall()]
            
            if "background" not in columns:
                print("Adding 'background' column...")
                cursor.execute("ALTER TABLE students ADD COLUMN background VARCHAR(50)")
            
            if "degree_status" not in columns:
                print("Adding 'degree_status' column...")
                cursor.execute("ALTER TABLE students ADD COLUMN degree_status VARCHAR(50)")
            
            connection.commit()
            print("Schema updated successfully!")

    except Exception as e:
        print(f"Error migrating: {e}")

if __name__ == "__main__":
    migrate_db()

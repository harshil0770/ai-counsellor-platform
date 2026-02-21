
import os
from dotenv import load_dotenv

def check_env():
    # Load .env manually to be sure
    load_dotenv()
    
    stripe_key = os.getenv("STRIPE_SECRET_KEY")
    if not stripe_key:
        print("STRIPE_SECRET_KEY: Not found")
    else:
        print(f"STRIPE_SECRET_KEY: Found (Length: {len(stripe_key)})")
        if stripe_key.startswith("sk_test_"):
            print("STRIPE_SECRET_KEY: Prefix correct (sk_test_)")
        else:
            print(f"STRIPE_SECRET_KEY: Invalid prefix (Starts with: {stripe_key[:5]}...)")
            
        if "your_key_here" in stripe_key:
             print("STRIPE_SECRET_KEY: WARN - Contains placeholder text 'your_key_here'")

if __name__ == "__main__":
    check_env()

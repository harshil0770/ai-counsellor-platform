
import requests
import json

def test_payment():
    url = "http://127.0.0.1:8000/payments/create-payment-intent"
    payload = {
        "amount": 5000,
        "description": "Test Integration Fee"
    }
    
    print(f"Sending POST request to {url} with amount 5000 INR...")
    try:
        response = requests.post(url, json=payload)
        response.raise_for_status()
        data = response.json()
        
        if "clientSecret" in data:
            print("SUCCESS: Payment Intent Created!")
            print(f"Client Secret: {data['clientSecret'][:15]}...") 
        else:
            print(f"FAILED: Unexpected response: {data}")
            
    except requests.exceptions.RequestException as e:
        print(f"ERROR: Request failed: {e}")
        if response is not None:
             print(f"Response Content: {response.text}")

if __name__ == "__main__":
    test_payment()

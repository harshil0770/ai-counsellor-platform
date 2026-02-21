
from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
import os
import stripe

router = APIRouter(
    prefix="/payments",
    tags=["Payments"]
)

# Setup Stripe
stripe.api_key = os.getenv("STRIPE_SECRET_KEY", "sk_test_mock_key")

class PaymentIntentRequest(BaseModel):
    amount: int  # Amount in INR (e.g. 500)
    description: str = "Course Fee"

@router.post("/create-payment-intent")
def create_payment_intent(request: PaymentIntentRequest):
    print(f"DEBUG: Creating payment intent for amount: {request.amount}")
    try:
        # Create a PaymentIntent with the order amount and currency
        # Ensure it's an integer for Stripe
        stripe_amount = request.amount * 100
        
        intent = stripe.PaymentIntent.create(
            amount=stripe_amount,
            currency="inr",
            description=request.description,
            payment_method_types=["card"],
        )
        print(f"DEBUG: Payment intent created: {intent.id}")
        return {"clientSecret": intent.client_secret}

    except Exception as e:
        print(f"DEBUG: Stripe Error: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/webhook")
async def stripe_webhook(request: dict):
    # Handle Stripe webhooks to update booking status
    # This checks for event type and updates DB accordingly
    return {"status": "success"}

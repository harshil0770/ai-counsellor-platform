
import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { createPaymentIntent, bookSession } from '../services/api';
import { Loader } from 'lucide-react';

const PaymentForm = ({ course, studentDetails, studentId, onSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        setProcessing(true);
        setError(null);

        try {
            // 1. Create Payment Intent
            const { clientSecret } = await createPaymentIntent(course.fees, `COURSE: ${course.title}`);

            // 2. Confirm Card Payment
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: studentDetails.name,
                        email: studentDetails.email,
                    },
                },
            });

            if (result.error) {
                setError(result.error.message);
            } else {
                if (result.paymentIntent.status === 'succeeded') {
                    // 3. Save Booking to Backend
                    await bookSession({
                        course_id: course.id,
                        student_id: studentId,
                        payment_status: 'paid'
                    });
                    onSuccess();
                }
            }
        } catch (err) {
            console.error("Payment Error:", err);
            const msg = err.response?.data?.detail || err.message || "Payment failed. Please try again.";
            setError(msg);
        } finally {
            setProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <CardElement options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': { color: '#aab7c4' },
                        },
                        invalid: { color: '#9e2146' },
                    },
                }} />
            </div>

            <div className="text-xs text-slate-400 text-center">
                Test Card: <span className="font-mono bg-slate-100 px-1 rounded">4242 4242 4242 4242</span> (Any Date/CVC)
            </div>

            {error && <div className="text-red-500 text-sm">{error}</div>}

            <button
                type="submit"
                disabled={!stripe || processing}
                className="w-full py-4 rounded-xl bg-accent-violet text-white font-bold shadow-lg shadow-accent-violet/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex justify-center items-center"
            >
                {processing ? <Loader className="animate-spin" /> : `Pay ₹${course.fees.toLocaleString()}`}
            </button>
        </form>
    );
};

export default PaymentForm;

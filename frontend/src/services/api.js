
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

export const api = axios.create({
    baseURL: API_URL,
});

export const getCourses = async (params) => {
    const response = await api.get('/courses/', { params });
    return response.data;
};

export const bookSession = async (bookingData) => {
    const response = await api.post('/bookings/book-session', bookingData);
    return response.data;
};

export const chatWithAI = async (query, sessionId, studentId = null) => {
    const response = await api.post('/chat/', {
        query,
        session_id: sessionId,
        student_id: studentId
    });
    return response.data;
};

export const createPaymentIntent = async (amount, description) => {
    const response = await api.post('/payments/create-payment-intent', { amount, description });
    return response.data;
};

export const createStudent = async (studentData) => {
    const response = await api.post('/students/', studentData);
    return response.data;
};

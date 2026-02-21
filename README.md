# 🤖 Agentic AI Student Counsellor Platform

A premium, full-stack educational assistant that goes beyond simple keyword matching. Built with an **Agentic AI architecture**, it reasons through student queries, maintains conversational context, and handles secure course bookings.

![Premium UI](https://img.shields.io/badge/UI-Premium_Glassmorphism-blueviolet)
![Tech Stack](https://img.shields.io/badge/Stack-FastAPI_%7C_React_%7C_MySQL-blue)
![AI](https://img.shields.io/badge/AI-Multi--Agent_Reasoning-green)

---

## ✨ Key Features

### 🧠 Intelligent Agentic AI
- **Context Awareness**: Remembers your chat history across sessions using `localStorage` and a backend memory layer.
- **Reasoning Loop**: The bot doesn't just reply; it identifies user intent, extracts entities (budget, interests), and asks clarifying questions if information is missing.
- **Rich Markdown Formatting**: Responses are rendered with bold headings, lists, and clickable links for a clear, structured experience.

### 💳 Seamless Course Booking
- **Stripe Integration**: Secure payment processing for course enrollments.
- **Entity Identification**: Automatically maps chat queries (e.g., "Python under 5k") to real database records.
- **Real-time Status**: Tracking of `pending`, `paid`, and `failed` payment states.

### 🎨 Premium User Experience
- **Glassmorphic Design**: A modern, sleek interface with blur effects, vibrant gradients, and smooth micro-animations.
- **Responsive Interface**: The chat widget and booking forms automatically adapt to different screen sizes.
- **Quick Action Chips**: Suggested queries to help users get started instantly.

---

## 🛠️ Tech Stack

### Backend
- **FastAPI**: High-performance Python framework for building APIs.
- **SQLAlchemy & MySQL**: Robust ORM and relational database for storing student, course, and booking data.
- **OpenAI/Gemini**: (Plug-and-play) Integration-ready for large language models.

### Frontend
- **React (Vite)**: Fast, modern frontend library.
- **Vanilla CSS**: Bespoke styling for maximum performance and design control.
- **Lucide React**: Premium icon set.
- **React Markdown**: Full GFM support for bot responses.

---

## 🚀 Installation & Setup

### 1. Prerequisites
- Python 3.9+
- Node.js 18+
- MySQL Server

### 2. Backend Setup
```bash
# Navigate to root
cd project_!234556777

# Create and activate virtual environment
python -m venv ai_counsellor/venv
source ai_counsellor/venv/bin/activate  # Or `venv\Scripts\activate` on Windows

# Install dependencies
pip install -r requirements.txt

# Configure .env (Use .env.example as a template)
# Add your DB_URL and STRIPE_SECRET_KEY
```

### 3. Frontend Setup
```bash
cd frontend
npm install
# Configure .env with your VITE_STRIPE_PUBLIC_KEY
npm run dev
```

---

## 📋 Database Schema
The system uses a relational schema with the following tables:
- `students`: Personal profiles, interests, and academic background.
- `courses`: Full catalog with fees, duration, and career paths.
- `bookings`: Join table managing enrollments and payment status.
- `chat_sessions` & `chat_messages`: Multi-session history tracking.

---

## 🤝 Contributing
Contributions are welcome! Whether it’s UI refinements or smarter AI agents, feel free to fork and PR.

## 📄 License
MIT License. Created by [harshil0770](https://github.com/harshil0770).

# 🎧 AI Music Recommendation System

A full-stack **AI-based Music Recommendation System** with a **ChatGPT-style conversational UI**.  
Users can chat with the system by typing a song name and receive personalized music recommendations generated using machine learning.

---

## 🚀 Features

- 💬 ChatGPT-like full-screen chat interface
- 🎶 Music recommendations based on song similarity
- 🤖 Machine Learning using cosine similarity
- ⚡ FastAPI backend for fast API responses
- 🎨 Modern React + Vite frontend
- 📊 Dataset enriched with song, artist, genre, and mood

---

## 🧠 How It Works

1. User enters a song name in the chat interface.
2. The backend processes the input using a **content-based filtering algorithm**.
3. Song features (artist, genre, mood) are vectorized.
4. **Cosine similarity** is used to find the most similar songs.
5. The system returns **Top 5 recommended songs with artist names**.

---

## 🛠 Tech Stack

### Frontend
- React
- Vite
- JavaScript
- CSS (inline styles)

### Backend
- Python
- FastAPI
- Pandas
- Scikit-learn

### Machine Learning
- Content-Based Filtering
- CountVectorizer
- Cosine Similarity

---

## 📁 Project Structure

Music-Analysis/
│
├── backend/
│ ├── app.py
│ ├── songs.csv
│ └── venv/
│
├── frontend/
│ ├── src/
│ │ └── App.jsx
│ ├── package.json
│ └── vite.config.js
│
└── README.md


---

## ▶️ How to Run the Project

### 1️⃣ Start Backend (FastAPI)

```bash
cd backend
uvicorn app:app --reload
http://127.0.0.1:8000


cd frontend
npm install
npm run dev

http://localhost:5173

💡 Example Interaction

User:
Believer

AI Response:
🎵 Thunder — Imagine Dragons
🎵 Radioactive — Imagine Dragons
🎵 Enemy — Imagine Dragons
🎵 Natural — Imagine Dragons
🎵 Whatever It Takes — Imagine Dragons



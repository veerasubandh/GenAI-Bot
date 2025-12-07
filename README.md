# 🧠 FinAI — GenAI Credit Card Virtual Assistant

> A smart AI-powered assistant that helps users with credit card queries such as card delivery, billing, statements, EMIs, repayment options, overdue collections — through **chat and voice** interaction.

This prototype showcases:

- Hybrid knowledge retrieval (Knowledge Base → LLM fallback → APIs)
- Action execution (mock microservices)
- Context-aware responses
- Email delivery with PDF statements
- Session tracking, feedback capture & analytics-ready architecture
- Voice input (Speech-to-Text) + AI speech responses (Text-to-Speech)

---

## 🚀 Features

| Capability | Status |
|-----------|--------|
| Conversational chat | ✅ |
| Voice input (browser microphone) | ✅ |
| Text-to-speech assistant replies | ✅ |
| LLM-powered intent detection & entity extraction | ✅ |
| Knowledge base–driven responses (MongoDB + Redis caching) | ✅ |
| Actionable workflows (EMI eligibility, card tracking, bill details) | ✅ |
| Email delivery with attached PDF statement | ✅ |
| Session storage + conversation logging | ✅ |
| Feedback collection (👍 / 👎) | ✅ |
| Analytics endpoints for Grafana dashboards | ✅ |
| Frontend UI (React + Tailwind + Framer UI) | ✅ |

---

## 🏗️ Tech Stack

### **Frontend**
- React (Vite)
- TailwindCSS v4
- Framer Motion
- Web Speech API (Voice input & TTS)

### **Backend**
- Node.js + Express
- MongoDB + Mongoose
- Redis (Caching & session memory)
- OpenAI API (Intent classification & entity extraction)
- PDFKit + Nodemailer (Email statements)
- Logging & analytics middleware

---

## 📁 Folder Structure

FinAI/
├── backend/
│ ├── src/
│ │ ├── controllers/
│ │ ├── routes/
│ │ ├── services/
│ │ ├── models/
│ │ ├── knowledgebase/
│ │ ├── utils/
│ │ └── app.js
│ ├── .env
│ └── package.json
├── frontend/
│ ├── src/pages/
│ ├── src/components/
│ ├── src/hooks/
│ ├── public/
│ ├── .env
│ └── package.json
└── README.md

## ⚙️ Prerequisites

Make sure the following are installed:

- Node.js ≥ 18
- MongoDB (local or Atlas)
- Redis (local or cloud)
- OpenAI API key

---

# 🧩 Backend Setup

### 1️⃣ Navigate to backend folder:

```sh
cd backend
2️⃣ Install dependencies:
sh
Copy code
npm install
3️⃣ Create .env file:
ini
Copy code
PORT=5000
MONGO_URI=mongodb://localhost:27017/finai
REDIS_URL=redis://localhost:6379
OPENAI_API_KEY=YOUR_OPENAI_KEY_HERE

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=youremail@gmail.com
SMTP_PASS=your-app-password
⚠️ If using Gmail, generate a Google App Password from security settings.

4️⃣ Seed the knowledgebase:
sh
Copy code
npm run seed:faq
5️⃣ Start backend:
sh
Copy code
npm run dev
If successful, you should see:

arduino
Copy code
🚀 FinAI backend running on http://localhost:5000
Connected to MongoDB
Redis connected
🖥️ Frontend Setup
1️⃣ Navigate:
sh
Copy code
cd frontend
2️⃣ Install dependencies:
sh
Copy code
npm install
3️⃣ Create .env:
ini
Copy code
VITE_API_BASE_URL=http://localhost:5000
4️⃣ Start development server:
sh
Copy code
npm run dev
App will open at:

👉 http://localhost:5173


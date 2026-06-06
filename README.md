# ResuMind AI 🚀

**ResuMind AI** is an AI-powered career assistant that helps job seekers optimize their resumes, evaluate ATS compatibility, match resumes against job descriptions, and prepare for interviews with personalized AI-generated questions and insights.

---

## 🌟 Features

### 📄 Resume Analysis

* Upload resumes in PDF format
* AI-powered resume evaluation
* ATS compatibility scoring
* Detailed feedback and recommendations
* Resume strengths and weaknesses analysis

### 🎯 Job Description Matching

* Compare resumes with job descriptions
* Identify missing keywords and skills
* Generate resume-job match scores
* Provide actionable optimization suggestions

### 🎤 AI Interview Preparation

* Generate personalized interview questions
* Technical interview questions
* Behavioral interview questions
* Resume-based interview preparation
* Job-description-specific interview practice

### 👤 Authentication & User Management

* Secure JWT authentication
* User registration and login
* Protected routes
* User-specific report history

### 📊 Report Management

* Save ATS analysis reports
* Store interview preparation reports
* Access previous reports anytime

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* Context API
* CSS
* Lucide React Icons

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Multer
* Zod Validation

### AI Integration

* Google Gemini API

### Deployment

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

---

## 🏗️ Architecture

```text
React Frontend
      │
      ▼
Axios API Calls
      │
      ▼
Node.js + Express Backend
      │
      ├── JWT Authentication
      ├── Resume Processing
      ├── ATS Analysis
      └── Interview Generation
      │
      ▼
MongoDB Atlas
      │
      ▼
Gemini AI API
```

---

## 📂 Project Structure

```bash
ResuMind_AI/
│
├── BACKEND/
│   ├── controllers/
│   ├── db/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── src/
│   │   ├── services/
│   │   └── app.js
│   │
│   ├── .env
│   └── server.js
│
├── FRONTEND/
│   ├── src/
│   │   ├── auth/
│   │   │   ├── hooks/
│   │   │   └── services/
│   │   │
│   │   ├── UI/
│   │   │   ├── components/
│   │   │   ├── pages/
│   │   │   └── theme/
│   │   │
│   │   └── styles/
│   │
│   ├── App.jsx
│   ├── app.routes.jsx
│   ├── main.jsx
│   └── index.html
│
├── README.md
└── .gitignore
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/your-username/resumind-ai.git

cd resumind-ai
```

### Backend Setup

```bash
cd BACKEND
npm install
```

Create a `.env` file:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

Start backend server:

```bash
node server.js 
```

### Frontend Setup

```bash
cd FRONTEND
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:3000
```

Start frontend:

```bash
npm run dev
```

---

## 🔐 Environment Variables

### Backend

| Variable       | Description                     |
| -------------- | ------------------------------- |
| PORT           | Backend server port             |
| MONGODB_URI    | MongoDB Atlas connection string |
| JWT_SECRET     | JWT secret key                  |
| GEMINI_API_KEY | Gemini API key                  |

### Frontend

| Variable     | Description     |
| ------------ | --------------- |
| VITE_API_URL | Backend API URL |

---

## 🚀 API Highlights

### Authentication

* User Registration
* User Login
* Protected Routes

### ATS Analysis

* Resume Upload
* ATS Score Generation
* Resume Feedback

### Job Matching

* Resume vs Job Description Analysis
* Keyword Matching
* Skill Gap Detection

### Interview Preparation

* Personalized Question Generation
* Technical Questions
* Behavioral Questions

---

## 📸 Screenshots

### Landing Page

(Add Screenshot)

### ATS Analysis Dashboard

(Add Screenshot)

### Resume Feedback Report

(Add Screenshot)

### Interview Preparation Module

(Add Screenshot)

### User Dashboard

(Add Screenshot)

---

## 🎯 Key Achievements

* Built a full-stack AI-powered career assistant using the MERN stack.
* Implemented secure JWT-based authentication and authorization.
* Developed ATS resume analysis and job-description matching workflows.
* Integrated Google Gemini API for intelligent resume evaluation and interview question generation.
* Created report storage and retrieval functionality using MongoDB.
* Designed a responsive and user-friendly interface for job seekers.

---

## 🔮 Future Enhancements

* Resume version management
* Cover letter generation
* Mock interview simulator
* Job application tracker
* LinkedIn profile analysis
* AI-powered career recommendations

---

## 👨‍💻 Author

**Shikhar A S**

Full Stack Developer | MERN Stack Developer

Passionate about building scalable web applications and AI-powered solutions.

---

## ⭐ Support

If you found this project useful, consider giving it a star on GitHub.

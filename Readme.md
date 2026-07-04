# SharanAI – AI Recruitment Intelligence Platform

> An AI-powered recruitment intelligence platform that automates resume analysis, candidate ranking, semantic search, recruiter insights, and hiring workflow management.

---

## 🌐 Live Demo

| Service | Link |
|----------|------|
| Frontend | **Coming Soon** |
| Backend API | **Coming Soon** |
| API Documentation | **Coming Soon** |

---

# ✨ Features

- AI-powered Resume Parsing
- Automatic Resume Analysis
- Intelligent Candidate Ranking
- Detailed Candidate Profiles
- Recruiter Analytics Dashboard
- AI Generated Recruiter Reports
- Semantic Candidate Search
- Skill Matching Engine
- Education & Experience Analysis
- Language & Certification Tracking
- Hiring Pipeline Insights
- Advanced Search & Filtering
- Fully Responsive Modern UI
- Fast REST APIs using FastAPI

---

# 🏗 System Architecture

```
                 Resume
                    │
                    ▼
        Resume Parsing Engine
                    │
                    ▼
       Sentence Transformer Model
                    │
                    ▼
          Vector Embeddings
                    │
                    ▼
             FAISS Index
                    │
                    ▼
        Semantic Similarity Search
                    │
                    ▼
         Candidate Ranking Engine
                    │
                    ▼
         Recruiter AI Dashboard
```

---

# 📂 Project Structure

```
recruiter-system/
│
├── backend/
│   ├── api/
│   ├── scoring/
│   ├── services/
│   ├── models/
│   ├── main.py
│   └── ...
│
├── frontend/
│   ├── src/
│   ├── routes/
│   ├── components/
│   ├── services/
│   ├── hooks/
│   ├── types/
│   └── ...
│
├── docs/
├── notebooks/
├── requirements.txt
├── runtime.txt
└── README.md
```

---

# 🛠 Tech Stack

## Frontend

- React 19
- TypeScript
- Vite
- TanStack Router
- Tailwind CSS
- shadcn/ui
- Lucide React
- Axios
- Sonner

---

## Backend

- FastAPI
- Python
- Uvicorn
- Pydantic

---

## AI & Machine Learning

- Sentence Transformers
- FAISS
- NumPy
- Pandas
- RapidFuzz

---

## Document Processing

- PyMuPDF
- python-docx

---

## Development Tools

- Git
- GitHub
- VS Code

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/Saiiii0906/recruiter-system.git

cd recruiter-system
```

---

## Backend Setup

```bash
cd backend

pip install -r ../requirements.txt

uvicorn main:app --reload
```

Backend runs on

```
http://127.0.0.1:8000
```

Swagger Docs

```
http://127.0.0.1:8000/docs
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on

```
http://localhost:8080
```

---

# 📊 Modules

## Dashboard

- Hiring Overview
- Recruiter Insights
- Recent Activities
- Statistics Cards

---

## Candidate Ranking

- AI Match Score
- Semantic Ranking
- Filtering
- Sorting
- Search

---

## Candidate Profile

- Professional Summary
- Skills
- Languages
- Education
- Career Timeline
- Certifications
- AI Intelligence Brief

---

## Reports

- Recruiter Reports
- Candidate Analysis
- Hiring Recommendation
- Export Ready Reports

---

## Analytics

- Hiring Statistics
- Candidate Distribution
- Pipeline Metrics
- Performance Insights

---

# AI Pipeline

```
Resume
   │
   ▼
Text Extraction
   │
   ▼
Cleaning & Processing
   │
   ▼
Sentence Embeddings
   │
   ▼
FAISS Similarity Search
   │
   ▼
Candidate Ranking
   │
   ▼
Recruiter Report
```

# API Endpoints

| Endpoint | Description |
|----------|-------------|
| `/docs` | Swagger Documentation |
| `/ranking` | Candidate Ranking |
| `/candidate/{id}` | Candidate Profile |
| `/report/{id}` | Recruiter Report |

---

# Deployment

## Frontend

**Vercel**

> Coming Soon

---

## Backend

**Render**

> Coming Soon

---

# Future Enhancements

- Authentication
- Recruiter Login
- Role Based Access
- PostgreSQL Integration
- Resume Upload Portal
- ATS Integration
- Interview Scheduler
- Email Notifications
- Export Reports as PDF
- LLM Powered Candidate Chat
- Multi Recruiter Workspace

---

# Author

## SriSaiKiran K T
**B.Tech CSE (Artificial Intelligence & Machine Learning)**
Parul University

### GitHub: https://github.com/Saiiii0906
### LinkedIn: https://www.linkedin.com/in/srisaikiran-tambalkar-479773298

---

# Contributing
Contributions are welcome!
1. Fork the repository
2. Create your feature branch
```bash
git checkout -b feature/NewFeature
```
3. Commit your changes
```bash
git commit -m "Add New Feature"
```
4. Push to the branch
```bash
git push origin feature/NewFeature
```

5. Open a Pull Request
---

# Show Your Support
If you found this project helpful, consider giving it a ⭐ Star on GitHub.

It helps the project grow and motivates future development.

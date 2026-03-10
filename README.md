# Nebula

A multi-platform search engine that aggregates content from popular platforms and generates AI-powered summaries.

The application allows users to search across platforms like TikTok, YouTube, Twitter/X, Reddit, Medium, Dev.to, GitHub, and StackOverflow from a single interface.

Built with FastAPI, React, TypeScript, and Exa AI Search.

---

## Setup

### Prerequisites

- Python 3.9+
- Node.js 18+
- Exa API Key
- OpenAI API Key

---

## Backend Setup

```bash
cd backend
cp .env.example .env
```

Add your API keys inside `.env`:

```
EXA_API_KEY=your_exa_api_key
OPENAI_API_KEY=your_openai_api_key
```

Install dependencies and start the server:

```bash
pip install -r requirements.txt
python -m uvicorn app.main:app --reload
```

Backend will run at: **http://localhost:8000**

API documentation: **http://localhost:8000/docs**

---

## Frontend Setup

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Frontend will run at: **http://localhost:5173**


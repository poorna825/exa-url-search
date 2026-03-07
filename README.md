# EXA Multi-Domain Search

A production-ready multi-domain search engine with AI-powered content summaries. Search across TikTok, YouTube, Twitter, Reddit, Medium, Dev.to, GitHub, and StackOverflow. Built with FastAPI, React, TypeScript, and modern best practices.

## 🚀 Features

- 🌐 **Multi-Domain Search** - Search across 8+ platforms simultaneously
  - TikTok, YouTube, Twitter/X, Reddit
  - Medium, Dev.to, GitHub, StackOverflow
- 🔍 Smart content discovery using Exa API
- 🤖 AI-powered content summarization (extractive)
- ⚡ Fast and responsive modern UI (React 19 + Vite + Tailwind)
- 🏗️ Production-ready architecture with proper error handling
- 📝 Full API documentation with OpenAPI/Swagger
- 🧪 Comprehensive test coverage
- 🔒 Configurable CORS and security settings
- 📦 Easy deployment to Vercel/Render/Railway
- 🎨 Beautiful domain-based color coding

## 📁 Project Structure

```
exa-url-search/
├── backend/              # Python FastAPI backend
│   ├── app/
│   │   ├── main.py      # Application entry point
│   │   ├── config.py    # Configuration management
│   │   ├── models.py    # Pydantic models
│   │   ├── routes/      # API endpoints
│   │   └── services/    # Business logic
│   ├── tests/           # Backend tests
│   ├── requirements.txt # Production dependencies
│   └── .env.example     # Environment template
│
├── frontend/            # React TypeScript frontend
│   ├── src/
│   │   ├── App.tsx     # Main component
│   │   └── ...
│   ├── tests/          # Frontend tests
│   └── .env.example    # Environment template
│
├── docs/               # Documentation
│   ├── API.md         # API documentation
│   └── DEPLOYMENT.md  # Deployment guide
│
├── scripts/           # Setup and utility scripts
│   ├── setup.ps1     # Windows setup
│   └── setup.sh      # Linux/Mac setup
│
└── .github/          # CI/CD workflows
    └── workflows/
```

## 🛠️ Quick Start

### Prerequisites

- Python 3.9+
- Node.js 18+
- [Exa API Key](https://exa.ai/)
- [OpenAI API Key](https://platform.openai.com/api-keys)

### Automated Setup

**Windows (PowerShell):**
```powershell
.\scripts\setup.ps1
```

**Linux/Mac:**
```bash
chmod +x scripts/setup.sh
./scripts/setup.sh
```

### Manual Setup

#### 1. Backend Setup

```bash
cd backend

# Copy environment template
cp .env.example .env

# Edit .env and add your API keys
# EXA_API_KEY=your_key_here
# OPENAI_API_KEY=your_key_here

# Install dependencies
pip install -r requirements.txt

# Run the server
python -m app.main
```

Backend will be available at: `http://localhost:8000`
- API Docs: `http://localhost:8000/docs`
- Health Check: `http://localhost:8000/health`

#### 2. Frontend Setup

```bash
cd frontend

# Copy environment template
cp .env.example .env

# Install dependencies
npm install

# Run development server
npm run dev
```

Frontend will be available at: `http://localhost:5173`

## 🔑 Environment Variables

### Backend (`backend/.env`)

```env
# Required
EXA_API_KEY=your_exa_api_key
OPENAI_API_KEY=your_openai_api_key

# Optional (with defaults)
HOST=0.0.0.0
PORT=8000
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
DEFAULT_NUM_RESULTS=5
MAX_NUM_RESULTS=20
OPENAI_MODEL=gpt-3.5-turbo
OPENAI_MAX_TOKENS=200
OPENAI_TEMPERATURE=0.3
```

### Frontend (`frontend/.env`)

```env
VITE_API_BASE_URL=http://localhost:8000
```

## 🧪 Testing

### Backend Tests
```bash
cd backend
pip install -r requirements-dev.txt
pytest tests/ -v --cov=app
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📚 API Usage

### Search Endpoint

```bash
# Basic search
curl "http://localhost:8000/api/search?query=cooking+recipes"

# With custom result count
curl "http://localhost:8000/api/search?query=cooking+recipes&num_results=10"
```

**Response:**
```json
{
  "results": [
    {
      "title": "Easy Pasta Recipe",
      "url": "https://www.tiktok.com/@user/video/123456",
      "snippet": "Quick and easy pasta...",
      "summary": "AI-generated summary..."
    }
  ],
  "query": "cooking recipes",
  "count": 5
}
```

See [API.md](docs/API.md) for complete documentation.

## 🚀 Deployment

### Quick Deploy

**Frontend (Vercel):**
```bash
cd frontend
npm install -g vercel
vercel --prod
```

**Backend (Render/Railway):**
- See [DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed instructions
- One-click deploy options available

### Environment Setup for Production

1. Set `CORS_ORIGINS` to your frontend URL
2. Set `VITE_API_BASE_URL` to your backend URL
3. Ensure all API keys are configured
4. Enable HTTPS for both services

## 🔒 Security Notes

- ✅ API keys stored in environment variables (not in code)
- ✅ CORS configured for specific origins
- ✅ Input validation with Pydantic
- ✅ Error messages don't expose sensitive data
- ⚠️ Add rate limiting for production (recommended)
- ⚠️ Consider adding authentication for public deployments

## 🛣️ Roadmap

- [ ] Add rate limiting
- [ ] Support for multiple platforms (YouTube, Instagram)
- [ ] Search history and favorites
- [ ] Result caching with Redis
- [ ] User authentication
- [ ] Pagination for results
- [ ] Advanced filtering options

## 📖 Documentation

- [API Documentation](docs/API.md)
- [Deployment Guide](docs/DEPLOYMENT.md)
- Interactive API Docs: `http://localhost:8000/docs`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests
5. Submit a pull request

## 📝 License

MIT

## 🙏 Acknowledgments

- [Exa](https://exa.ai/) - Search API
- [OpenAI](https://openai.com/) - AI summarization
- [FastAPI](https://fastapi.tiangolo.com/) - Backend framework
- [React](https://react.dev/) - Frontend framework
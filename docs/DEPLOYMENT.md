# Deployment Guide

## Prerequisites
- Backend: Python 3.9+
- Frontend: Node.js 18+
- Required API keys: Exa API, OpenAI API

## Backend Deployment

### Option 1: Render

1. **Create a new Web Service on Render**
   - Connect your GitHub repository
   - Select the `backend` directory

2. **Configure Build & Start Commands**
   ```bash
   Build Command: pip install -r requirements.txt
   Start Command: uvicorn app.main:app --host 0.0.0.0 --port $PORT
   ```

3. **Set Environment Variables**
   ```
   EXA_API_KEY=your_exa_api_key
   OPENAI_API_KEY=your_openai_api_key
   CORS_ORIGINS=https://your-frontend-url.vercel.app
   OPENAI_MODEL=gpt-3.5-turbo
   OPENAI_MAX_TOKENS=200
   OPENAI_TEMPERATURE=0.3
   ```

### Option 2: Railway

1. **Create New Project**
   - Connect GitHub repository
   - Select backend directory

2. **Add Environment Variables** (same as above)

3. **Railway will auto-detect** the Python app and deploy

### Option 3: Docker

```dockerfile
FROM python:3.9-slim

WORKDIR /app
COPY backend/requirements.txt .
RUN pip install -r requirements.txt

COPY backend/ .

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

## Frontend Deployment

### Vercel (Recommended)

1. **Install Vercel CLI** (optional)
   ```bash
   npm install -g vercel
   ```

2. **Deploy via GitHub**
   - Import your repository on Vercel
   - Set root directory to `frontend`
   - Framework: Vite
   - Build command: `npm run build`
   - Output directory: `dist`

3. **Set Environment Variables**
   ```
   VITE_API_BASE_URL=https://your-backend-url.onrender.com
   ```

4. **Deploy**
   ```bash
   cd frontend
   vercel --prod
   ```

### Netlify

1. **Build Settings**
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/dist`

2. **Environment Variables**
   ```
   VITE_API_BASE_URL=https://your-backend-url.onrender.com
   ```

## Post-Deployment Checklist

- [ ] Test health endpoint: `https://your-backend/health`
- [ ] Test search endpoint with sample query
- [ ] Verify CORS is configured correctly
- [ ] Check frontend can connect to backend
- [ ] Monitor logs for errors
- [ ] Set up error tracking (Sentry recommended)
- [ ] Configure custom domain (optional)
- [ ] Set up monitoring/uptime checks

## Environment Variables Reference

### Backend
- `EXA_API_KEY` - Required: Your Exa API key
- `OPENAI_API_KEY` - Required: OpenAI API key
- `OPENAI_MODEL` - Optional: OpenAI model to use (default: gpt-3.5-turbo)
- `OPENAI_MAX_TOKENS` - Optional: Max tokens for summarization (default: 200)
- `OPENAI_TEMPERATURE` - Optional: Temperature for summarization (default: 0.3, range: 0.0-2.0)
- `CORS_ORIGINS` - Required: Comma-separated allowed origins
- `HOST` - Optional: Server host (default: 0.0.0.0)
- `PORT` - Optional: Server port (default: 8000)
- `DEFAULT_NUM_RESULTS` - Optional: Default search results (default: 5)
- `MAX_NUM_RESULTS` - Optional: Maximum allowed results (default: 20)

### Frontend
- `VITE_API_BASE_URL` - Required: Backend API URL

## Troubleshooting

### CORS Errors
- Ensure `CORS_ORIGINS` includes your frontend URL
- Check for trailing slashes in URLs

### API Connection Failed
- Verify backend is running: visit `/health` endpoint
- Check `VITE_API_BASE_URL` is set correctly
- Ensure backend allows requests from frontend origin

### Summarization Slow/Failing
- OpenAI API requires active API key with credits
- Check API key validity and rate limits
- Consider adjusting OPENAI_MAX_TOKENS for faster responses
- Monitor OpenAI API usage in your account dashboard

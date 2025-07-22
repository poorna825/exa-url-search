from fastapi import FastAPI
from exa_py import Exa
import os
import requests
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware




load_dotenv()

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
exa = Exa(api_key=os.getenv("EXA_API_KEY"))

# Hugging Face summarization model
HF_API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn"
hf_headers = {"Authorization": f"Bearer {os.getenv('HF_API_TOKEN')}"}

def summarize_text(text):
    if not text:
        return "[No content to summarize]"
    try:
        response = requests.post(
            HF_API_URL,
            headers=hf_headers,
            json={"inputs": text, "max_length": 150, "min_length": 50, "do_sample": False}
        )
        if response.status_code == 200:
            return response.json()[0]['summary_text']
        else:
            return f"[Summary error: {response.status_code} - {response.text}]"
    except Exception as e:
        return f"[Summary error: {e}]"

@app.get("/search")
async def search_tiktok(query: str, num_results: int = 10):
    try:
        result = exa.search_and_contents(
            query,
            num_results=5,
            include_domains=["https://www.tiktok.com"],
            
          
        )

        results_with_summary = []
        for item in result.results:
            summary = summarize_text(item.text)
            results_with_summary.append({
                "title": item.title,
                "url": item.url,
                "snippet": item.text,
                "summary": summary
            })

        return {"results": results_with_summary}
    except Exception as e:
        return {"error": str(e)}
"""Direct OpenAI API test"""
from dotenv import load_dotenv
import os

# Load .env
load_dotenv()

api_key = os.getenv("OPENAI_API_KEY", "NOT_FOUND")
print(f"API Key from env: {api_key[:30]}... (length: {len(api_key)})")
print(f"Starts with sk-proj: {api_key.startswith('sk-proj')}")

# Test with OpenAI
try:
    from openai import OpenAI
    client = OpenAI(api_key=api_key)
    
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": "Say 'test successful' only"}],
        max_tokens=20
    )
    
    print(f"\n✓ OpenAI API WORKING!")
    print(f"Response: {response.choices[0].message.content}")
    print(f"Model used: {response.model}")
    
except Exception as e:
    print(f"\n✗ OpenAI API FAILED!")
    print(f"Error: {str(e)[:200]}")

"""Test actual API connectivity"""
import os
import sys
from dotenv import load_dotenv

load_dotenv()

print("=" * 70)
print("API CONNECTIVITY TEST")
print("=" * 70)
print()

# Test 1: Configuration
print("1. CHECKING API KEYS")
print("-" * 70)
exa_key = os.getenv("EXA_API_KEY", "")
openai_key = os.getenv("OPENAI_API_KEY", "")

print(f"   EXA_API_KEY: {exa_key[:20]}..." if len(exa_key) > 20 else f"   EXA_API_KEY: {exa_key}")
print(f"   OPENAI_API_KEY: {openai_key[:20]}..." if len(openai_key) > 20 else f"   OPENAI_API_KEY: {openai_key}")
print()

# Test 2: Exa API
print("2. TESTING EXA API")
print("-" * 70)
try:
    from exa_py import Exa
    exa_client = Exa(api_key=exa_key)
    
    # Try a simple search
    result = exa_client.search_and_contents(
        "test search",
        num_results=1,
        include_domains=["https://www.tiktok.com"],
    )
    
    if result and result.results:
        print(f"   ✓ Exa API is WORKING")
        print(f"   ✓ Found {len(result.results)} result(s)")
        print(f"   ✓ Sample result: {result.results[0].title[:50] if result.results[0].title else 'No title'}...")
    else:
        print(f"   ⚠ Exa API responded but returned no results")
        
except Exception as e:
    print(f"   ✗ Exa API FAILED: {str(e)}")
print()

# Test 3: OpenAI API
print("3. TESTING OPENAI API")
print("-" * 70)
try:
    from openai import OpenAI
    from app.config import settings
    
    client = OpenAI(api_key=openai_key)
    print(f"   Using model: {settings.OPENAI_MODEL}")
    
    # Test with a simple completion
    response = client.chat.completions.create(
        model=settings.OPENAI_MODEL,
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": "Say 'Hello, API test successful!' in exactly those words."}
        ],
        max_tokens=50,
        temperature=0.3,
        timeout=30
    )
    
    if response and response.choices:
        message = response.choices[0].message.content
        print(f"   ✓ OpenAI API is WORKING")
        print(f"   ✓ Response: {message[:60]}...")
        print(f"   ✓ Model used: {response.model}")
    else:
        print(f"   ⚠ OpenAI API responded but returned no content")
        
except Exception as e:
    print(f"   ✗ OpenAI API FAILED: {str(e)}")
print()

# Test 4: Search Service (Integration)
print("4. TESTING SEARCH SERVICE")
print("-" * 70)
try:
    from app.services.search_service import SearchService
    
    search_service = SearchService()
    
    # Use asyncio to run async function
    import asyncio
    
    async def test_search():
        results = await search_service.search_tiktok("cooking", num_results=2)
        return results
    
    results = asyncio.run(test_search())
    
    if results:
        print(f"   ✓ Search Service is WORKING")
        print(f"   ✓ Found {len(results)} result(s)")
        for i, result in enumerate(results, 1):
            print(f"   ✓ Result {i}: {result['title'][:50]}...")
    else:
        print(f"   ⚠ Search Service returned no results")
        
except Exception as e:
    print(f"   ✗ Search Service FAILED: {str(e)}")
print()

# Test 5: Summary Service
print("5. TESTING SUMMARY SERVICE")
print("-" * 70)
try:
    from app.services.summary_service import SummaryService
    
    summary_service = SummaryService()
    
    test_text = "This is a sample TikTok video about cooking delicious pasta. The creator shows step-by-step instructions on how to make a perfect Italian pasta dish with fresh ingredients. The video is very popular and has millions of views."
    
    summary = summary_service.summarize_text(test_text)
    
    if summary and not summary.startswith("["):
        print(f"   ✓ Summary Service is WORKING")
        print(f"   ✓ Generated summary: {summary[:60]}...")
    elif summary.startswith("[Summary"):
        print(f"   ⚠ Summary Service responded with error: {summary}")
    else:
        print(f"   ⚠ Summary Service returned: {summary}")
        
except Exception as e:
    print(f"   ✗ Summary Service FAILED: {str(e)}")
print()

print("=" * 70)
print("TEST COMPLETE")
print("=" * 70)

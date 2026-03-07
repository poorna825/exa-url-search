import { useState } from 'react';

// Define the structure of each result
interface SearchResult {
  title: string;
  url: string;
  snippet: string;
  summary: string;
}

function App() {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/search?query=${encodeURIComponent(query)}`);
      const data = await response.json();
      
      // TypeScript now knows each item has title, url, snippet, summary
      setResults(data.results || []);
    } catch (err) {
      console.error(err);
      alert("Error fetching results");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">TikTok Search & Summary</h1>
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter search term..."
          className="flex-1 p-2 border rounded"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {loading && <p>Loading results...</p>}

      {!loading && results.length > 0 && (
        <div className="space-y-6">
          {results.map((item) => (
            <div key={item.url} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold">
                <a 
                  href={item.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-600 hover:underline"
                >
                  {item.title}
                </a>
              </h2>
              <p className="text-gray-700 mt-2">{item.summary}</p>
              <p className="text-sm text-gray-500 mt-2 truncate">{item.snippet}</p>
            </div>
          ))}
        </div>
      )}

      {!loading && results.length === 0 && query && <p>No results found.</p>}
    </div>
  );
}

export default App;
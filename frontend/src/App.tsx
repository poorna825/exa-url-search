import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchBar } from './components/SearchBar';
import { ResultCard } from './components/ResultCard';
import { InsightPanel } from './components/InsightPanel';
import { Sidebar } from './components/Sidebar';
import { LoadingState } from './components/LoadingState';
import { EmptyState } from './components/EmptyState';
import { TrendWidget } from './components/TrendWidget';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

// Define the structure of each result
interface SearchResult {
  title: string;
  url: string;
  snippet: string;
  summary: string;
  domain: string;
}

interface DomainOption {
  key: string;
  url: string;
  label: string;
}

function App() {
  const [currentQuery, setCurrentQuery] = useState<string>('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [availableDomains, setAvailableDomains] = useState<DomainOption[]>([]);
  const [selectedDomains, setSelectedDomains] = useState<string[]>(['youtube', 'reddit', 'github']);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  // Fetch available domains on component mount
  useEffect(() => {
    const fetchDomains = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/domains`);
        const data = await response.json();
        
        if (response.ok && data.domains) {
          const domainOptions: DomainOption[] = Object.entries(data.domains).map(([key, url]) => ({
            key,
            url: url as string,
            label: key.charAt(0).toUpperCase() + key.slice(1)
          }));
          setAvailableDomains(domainOptions);
        }
      } catch (err) {
        console.error('Failed to fetch domains:', err);
        // Use default domains if API call fails
        setAvailableDomains([
          { key: 'tiktok', url: 'https://www.tiktok.com', label: 'TikTok' },
          { key: 'youtube', url: 'https://www.youtube.com', label: 'YouTube' },
          { key: 'twitter', url: 'https://twitter.com', label: 'Twitter' },
          { key: 'reddit', url: 'https://www.reddit.com', label: 'Reddit' },
          { key: 'github', url: 'https://github.com', label: 'GitHub' },
          { key: 'medium', url: 'https://medium.com', label: 'Medium' },
        ]);
      }
    };
    
    fetchDomains();
  }, []);

  const handleDomainToggle = (domainKey: string) => {
    setSelectedDomains(prev => {
      if (prev.includes(domainKey)) {
        // Don't allow deselecting if it's the last one
        if (prev.length === 1) return prev;
        return prev.filter(d => d !== domainKey);
      } else {
        return [...prev, domainKey];
      }
    });
  };

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;
    
    setCurrentQuery(query);
    setHasSearched(true);
    setLoading(true);
    setError('');
    
    try {
      const domainsParam = selectedDomains.join(',');
      const response = await fetch(
        `${API_BASE_URL}/api/search?query=${encodeURIComponent(query)}&domains=${domainsParam}`
      );
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.detail || data.error || 'Search failed');
      }
      
      setResults(data.results || []);
    } catch (err) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : "Error fetching results";
      setError(errorMessage);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      {/* Animated background gradient */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-pink-900/20 pointer-events-none" />
      
      <div className="relative z-10">
        {/* Search Bar - Sticky at top */}
        <div className="pt-8 pb-4">
          <SearchBar onSearch={handleSearch} loading={loading} />
        </div>

        {/* Main Layout */}
        <div className="flex gap-6 px-4 max-w-[1800px] mx-auto mt-8">
          {/* Left Sidebar */}
          <Sidebar
            availableDomains={availableDomains}
            selectedDomains={selectedDomains}
            onDomainToggle={handleDomainToggle}
          />

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-6 backdrop-blur-xl bg-red-900/30 border border-red-500/50 rounded-xl p-4 shadow-xl"
                >
                  <p className="text-red-300">
                    <strong className="font-semibold">Error:</strong> {error}
                  </p>
                </motion.div>
              )}

              {loading && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <LoadingState />
                </motion.div>
              )}

              {!loading && results.length > 0 && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  {/* Insights Panel */}
                  <InsightPanel
                    query={currentQuery}
                    resultCount={results.length}
                    domains={selectedDomains}
                  />

                  {/* Results Grid */}
                  <div className="space-y-4">
                    {results.map((result, index) => (
                      <ResultCard
                        key={`${result.url}-${index}`}
                        {...result}
                        index={index}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {!loading && results.length === 0 && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <EmptyState hasSearched={hasSearched} query={currentQuery} />
                </motion.div>
              )}
            </AnimatePresence>
          </main>

          {/* Right Sidebar - Trends */}
          <aside className="w-80 flex-shrink-0 hidden xl:block">
            <div className="sticky top-24">
              <TrendWidget />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default App;
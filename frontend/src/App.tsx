import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { SearchBar } from './components/SearchBar';
import { ResultCard } from './components/ResultCard';
import { InsightPanel } from './components/InsightPanel';
import { Sidebar } from './components/Sidebar';
import { LoadingState } from './components/LoadingState';
import { EmptyState } from './components/EmptyState';
import { TrendWidget } from './components/TrendWidget';
import { ThemeToggle } from './components/ThemeToggle';

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

interface ConsensusInsight {
  platform_insights: Record<string, string>;
  agreements: string[];
  disagreements: string[];
  top_entities: string[];
  overall_consensus: string;
}

interface DomainOption {
  key: string;
  url: string;
  label: string;
}

function App() {
  const [currentQuery, setCurrentQuery] = useState<string>('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [consensus, setConsensus] = useState<ConsensusInsight | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [availableDomains, setAvailableDomains] = useState<DomainOption[]>([]);
  const [selectedDomains, setSelectedDomains] = useState<string[]>(['youtube', 'reddit', 'github']);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

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
    setSidebarOpen(false); // Close mobile sidebar on search
    
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
      setConsensus(data.consensus || null);
    } catch (err) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : "Error fetching results";
      setError(errorMessage);
      setResults([]);
      setConsensus(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-cyan-50/30 dark:from-slate-950 dark:via-indigo-950 dark:to-slate-900 transition-colors duration-300">
      {/* Animated background gradient */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-300/20 via-violet-300/10 to-transparent dark:from-cyan-500/15 dark:via-violet-600/10 dark:to-transparent pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-coral-300/15 via-transparent to-transparent dark:from-orange-500/10 dark:via-transparent dark:to-transparent pointer-events-none" />
      
      <div className="relative z-10">
        {/* Theme Toggle - Fixed position */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed top-6 right-4 z-[60]"
        >
          <ThemeToggle />
        </motion.div>

        {/* Mobile Menu Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden fixed top-6 left-4 z-[60] p-3 backdrop-blur-xl bg-white/90 dark:bg-slate-900/90 border border-indigo-200 dark:border-indigo-500/30 rounded-xl shadow-lg shadow-indigo-500/10 hover:shadow-xl hover:shadow-cyan-500/20 hover:border-cyan-400 dark:hover:border-cyan-500/50 transition-all duration-300"
        >
          {sidebarOpen ? (
            <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          ) : (
            <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          )}
        </motion.button>

        {/* Search Bar - Sticky at top */}
        <div className="pt-8 pb-4">
          <SearchBar onSearch={handleSearch} loading={loading} />
        </div>

        {/* Main Layout */}
        <div className="flex gap-6 px-4 max-w-[1800px] mx-auto mt-8">
          {/* Left Sidebar - Desktop */}
          <div className="hidden lg:block">
            <Sidebar
              availableDomains={availableDomains}
              selectedDomains={selectedDomains}
              onDomainToggle={handleDomainToggle}
            />
          </div>

          {/* Left Sidebar - Mobile Overlay */}
          <AnimatePresence>
            {sidebarOpen && (
              <>
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSidebarOpen(false)}
                  className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                />
                
                {/* Sidebar */}
                <motion.div
                  initial={{ x: -300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  transition={{ type: 'spring', damping: 25 }}
                  className="lg:hidden fixed left-0 top-0 bottom-0 w-80 z-50 bg-gray-950 border-r border-gray-800 overflow-y-auto p-4"
                >
                  <div className="mt-16">
                    <Sidebar
                      availableDomains={availableDomains}
                      selectedDomains={selectedDomains}
                      onDomainToggle={handleDomainToggle}
                    />
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Main Content */}
          <main className="flex-1 min-w-0 pb-12">
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-6 backdrop-blur-xl bg-red-100/80 dark:bg-red-900/30 border border-red-300 dark:border-red-500/50 rounded-2xl p-5 shadow-xl"
                >
                  <p className="text-red-700 dark:text-red-300">
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
                    consensus={consensus}
                  />

                  {/* Results Grid */}
                  <div className="space-y-5">
                    <div className="flex items-center justify-between px-1">
                      <h2 className="text-lg font-bold text-gray-700 dark:text-gray-300">
                        Search Results
                      </h2>
                      <span className="text-sm text-gray-500 dark:text-gray-500">
                        {results.length} {results.length === 1 ? 'result' : 'results'}
                      </span>
                    </div>
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

          {/* Right Sidebar - Trends (Desktop Only) */}
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
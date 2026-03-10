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
          className="fixed top-6 right-6 z-[60]"
        >
          <ThemeToggle />
        </motion.div>

        {/* Mobile Menu Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden fixed top-6 left-6 z-[60] p-3 backdrop-blur-xl bg-white/90 dark:bg-slate-900/90 border border-indigo-200 dark:border-indigo-500/30 rounded-xl shadow-lg shadow-indigo-500/10 hover:shadow-xl hover:shadow-cyan-500/20 hover:border-cyan-400 dark:hover:border-cyan-500/50 transition-all duration-300"
        >
          {sidebarOpen ? (
            <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          ) : (
            <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          )}
        </motion.button>

        {/* Header Area - Large Command Interface */}
        <header className="relative">
          <div className="min-h-[40vh] flex items-center justify-center px-6 py-20">
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="w-full max-w-5xl"
            >
              <SearchBar onSearch={handleSearch} loading={loading} />
            </motion.div>
          </div>
          
          {/* Subtle separator */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="w-full h-px bg-gradient-to-r from-transparent via-cyan-300/50 dark:via-cyan-500/30 to-transparent"
          />
        </header>

        {/* Main Layout - Exploration Workspace */}
        <div className="flex gap-8 px-6 pb-12 max-w-[2000px] mx-auto">
          {/* Context Panel - Desktop Sidebar */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="sticky top-8"
            >
              <Sidebar
                availableDomains={availableDomains}
                selectedDomains={selectedDomains}
                onDomainToggle={handleDomainToggle}
              />
            </motion.div>
          </aside>

          {/* Mobile Sidebar Overlay */}
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
                  initial={{ x: -320, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -320, opacity: 0 }}
                  transition={{ type: 'spring', damping: 25 }}
                  className="lg:hidden fixed left-0 top-0 bottom-0 w-80 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-r border-indigo-200 dark:border-indigo-500/30 overflow-y-auto p-6"
                >
                  <div className="mt-20">
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

          {/* Exploration Workspace */}
          <main className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-8 backdrop-blur-xl bg-red-100/80 dark:bg-red-900/30 border border-red-300 dark:border-red-500/50 rounded-2xl p-6 shadow-xl"
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
                  className="space-y-12"
                >
                  {/* AI Consensus Insight - Centerpiece */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                  >
                    <InsightPanel
                      query={currentQuery}
                      resultCount={results.length}
                      domains={selectedDomains}
                      consensus={consensus}
                    />
                  </motion.div>

                  {/* Results Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between">
                      <motion.h2
                        className="text-2xl font-bold text-gray-900 dark:text-gray-100"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        Source Results
                      </motion.h2>
                      <motion.span
                        className="text-sm text-gray-500 dark:text-gray-500 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        {results.length} {results.length === 1 ? 'result' : 'results'}
                      </motion.span>
                    </div>

                    {/* Results Grid - Modular Layout */}
                    <motion.div
                      className="grid grid-cols-1 xl:grid-cols-2 gap-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      {results.map((result, index) => (
                        <motion.div
                          key={`${result.url}-${index}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                        >
                          <ResultCard
                            {...result}
                            index={index}
                          />
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
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

          {/* Trends Panel - Desktop Right Sidebar */}
          <aside className="hidden 2xl:block w-80 flex-shrink-0">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="sticky top-8"
            >
              <TrendWidget />
            </motion.div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default App;
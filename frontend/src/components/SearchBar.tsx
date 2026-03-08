import { useState, useEffect } from 'react';
import { Search, Command, Sparkles, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchBarProps {
  onSearch: (query: string) => void;
  loading: boolean;
}

export const SearchBar = ({ onSearch, loading }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      if (e.key === '/' && !isFocused) {
        e.preventDefault();
        document.getElementById('search-input')?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyboard);
    return () => document.removeEventListener('keydown', handleKeyboard);
  }, [isFocused]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-4 z-50 w-full max-w-4xl mx-auto px-4"
    >
      <form onSubmit={handleSubmit}>
        <motion.div
          animate={{
            scale: isFocused ? 1.02 : 1,
          }}
          transition={{ duration: 0.2 }}
          className={`relative backdrop-blur-xl bg-gradient-to-br from-white/95 to-gray-50/95 dark:from-slate-900/95 dark:to-slate-800/95 border transition-all duration-300 rounded-2xl shadow-2xl ${
            isFocused 
              ? 'border-cyan-400 dark:border-cyan-500/60 shadow-cyan-500/30 dark:shadow-cyan-500/40 ring-2 ring-cyan-500/20 dark:ring-cyan-500/30' 
              : 'border-indigo-200 dark:border-slate-700/50 shadow-indigo-200/50 dark:shadow-slate-900/50 hover:border-indigo-300 dark:hover:border-indigo-600/40'
          }`}
        >
          {/* Gradient accent on top */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 dark:via-cyan-400 to-transparent opacity-50" />
          
          <div className="flex items-center gap-4 px-6 py-5">
            {/* Search icon with animation */}
            <motion.div
              animate={{
                scale: isFocused ? 1.1 : 1,
                rotate: loading ? 360 : 0,
              }}
              transition={{
                scale: { duration: 0.2 },
                rotate: { duration: 1, repeat: loading ? Infinity : 0, ease: 'linear' }
              }}
            >
              {loading ? (
                <Sparkles className="w-6 h-6 text-cyan-500 dark:text-cyan-400" />
              ) : (
                <Search className={`w-6 h-6 transition-colors ${isFocused ? 'text-cyan-500 dark:text-cyan-400' : 'text-gray-500 dark:text-gray-500'}`} />
              )}
            </motion.div>

            {/* Input field */}
            <input
              id="search-input"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Search across platforms for insights..."
              className="flex-1 bg-transparent border-none outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 text-lg font-light tracking-wide"
              disabled={loading}
              autoComplete="off"
            />

            {/* Right side controls */}
            <div className="flex items-center gap-3">
              <AnimatePresence>
                {query.trim() && !loading && (
                  <motion.button
                    type="submit"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 text-gray-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-gray-100 dark:hover:bg-slate-800/60 rounded-lg transition-all"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                )}
              </AnimatePresence>

              {/* Keyboard shortcut hint */}
              <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-200 dark:bg-gray-800/60 rounded-lg border border-gray-300 dark:border-gray-700/40">
                <Command className="w-3.5 h-3.5 text-gray-500 dark:text-gray-500" />
                <span className="text-xs text-gray-500 dark:text-gray-500 font-medium">/</span>
              </div>
            </div>
          </div>
          
          {/* Loading progress bar */}
          {loading && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-500 via-violet-500 to-indigo-500"
            />
          )}
        </motion.div>
      </form>

      {/* Search tips - show when focused and empty */}
      <AnimatePresence>
        {isFocused && !query.trim() && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-3 px-6 py-4 backdrop-blur-xl bg-white/90 dark:bg-gray-900/80 border border-gray-300 dark:border-gray-700/50 rounded-xl shadow-xl"
          >
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 font-medium">Try asking about:</p>
            <div className="flex flex-wrap gap-2">
              {['AI development trends', 'React best practices', 'TypeScript tips', 'Web performance'].map((tip) => (
                <button
                  key={tip}
                  type="button"
                  onClick={() => setQuery(tip)}
                  className="px-3 py-1.5 bg-gray-100 dark:bg-slate-800/60 hover:bg-gradient-to-r hover:from-cyan-100 hover:to-indigo-100 dark:hover:from-cyan-500/20 dark:hover:to-indigo-500/20 border border-gray-300 dark:border-slate-700/40 hover:border-cyan-400 dark:hover:border-cyan-500/40 rounded-lg text-xs text-gray-600 dark:text-gray-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-all"
                >
                  {tip}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

import { useState, useEffect } from 'react';
import { Search, Command, Sparkles, ArrowRight, Zap, Globe, Brain } from 'lucide-react';
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
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="w-full"
    >
      <form onSubmit={handleSubmit}>
        <motion.div
          animate={{
            scale: isFocused ? 1.02 : 1,
          }}
          transition={{ duration: 0.3 }}
          className={`relative backdrop-blur-xl bg-gradient-to-br from-white/95 to-gray-50/95 dark:from-slate-900/95 dark:to-slate-800/95 border transition-all duration-500 rounded-3xl shadow-2xl overflow-hidden ${
            isFocused 
              ? 'border-cyan-400 dark:border-cyan-500/60 shadow-cyan-500/30 dark:shadow-cyan-500/40 ring-4 ring-cyan-500/20 dark:ring-cyan-500/30' 
              : 'border-indigo-200 dark:border-slate-700/50 shadow-indigo-200/50 dark:shadow-slate-900/50 hover:border-indigo-300 dark:hover:border-indigo-600/40'
          }`}
        >
          {/* Animated gradient background */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-violet-500/5 to-indigo-500/5 dark:from-cyan-500/10 dark:via-violet-500/10 dark:to-indigo-500/10"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
          
          {/* Decorative elements */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-400/20 dark:bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-violet-400/20 dark:bg-violet-500/10 rounded-full blur-3xl" />

          <div className="relative z-10 p-8">
            {/* Header */}
            <motion.div 
              className="text-center mb-8"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <Brain className="w-8 h-8 text-cyan-500 dark:text-cyan-400" />
                </motion.div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-600 via-indigo-600 to-violet-600 dark:from-cyan-300 dark:via-indigo-300 dark:to-violet-300 bg-clip-text text-transparent">
                  Nebula
                </h1>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-400 font-light">
                Explore knowledge across platforms with AI-powered insights
              </p>
            </motion.div>

            {/* Search Input Area */}
            <div className="flex items-center gap-6">
              {/* Search icon with animation */}
              <motion.div
                animate={{
                  scale: isFocused ? 1.2 : 1,
                  rotate: loading ? 360 : 0,
                }}
                transition={{
                  scale: { duration: 0.3 },
                  rotate: { duration: 1, repeat: loading ? Infinity : 0, ease: 'linear' }
                }}
                className="flex-shrink-0"
              >
                {loading ? (
                  <Sparkles className="w-8 h-8 text-cyan-500 dark:text-cyan-400" />
                ) : (
                  <Search className={`w-8 h-8 transition-colors ${isFocused ? 'text-cyan-500 dark:text-cyan-400' : 'text-gray-500 dark:text-gray-500'}`} />
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
                placeholder="What would you like to explore today?"
                className="flex-1 bg-transparent border-none outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 text-2xl font-light tracking-wide"
                disabled={loading}
                autoComplete="off"
              />

              {/* Right side controls */}
              <div className="flex items-center gap-4">
                <AnimatePresence>
                  {query.trim() && !loading && (
                    <motion.button
                      type="submit"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-4 bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-600 hover:to-indigo-600 text-white rounded-2xl shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/40 transition-all duration-300"
                    >
                      <ArrowRight className="w-6 h-6" />
                    </motion.button>
                  )}
                </AnimatePresence>

                {/* Keyboard shortcut hint */}
                <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-800/60 rounded-xl border border-gray-300 dark:border-gray-700/40">
                  <Command className="w-4 h-4 text-gray-500 dark:text-gray-500" />
                  <span className="text-sm text-gray-500 dark:text-gray-500 font-medium">/</span>
                </div>
              </div>
            </div>

            {/* Feature highlights */}
            <motion.div 
              className="flex items-center justify-center gap-8 mt-8 text-sm text-gray-500 dark:text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-500" />
                <span>AI-Powered</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-indigo-500" />
                <span>Multi-Platform</span>
              </div>
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-violet-500" />
                <span>Smart Insights</span>
              </div>
            </motion.div>
          </div>
          
          {/* Loading progress bar */}
          {loading && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-cyan-500 via-violet-500 to-indigo-500"
            />
          )}
        </motion.div>
      </form>

      {/* Search tips - show when focused and empty */}
      <AnimatePresence>
        {isFocused && !query.trim() && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-6 px-8 py-6 backdrop-blur-xl bg-white/90 dark:bg-gray-900/80 border border-gray-300 dark:border-gray-700/50 rounded-2xl shadow-xl"
          >
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-4 font-medium text-center">Try exploring:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                'AI development trends',
                'React best practices', 
                'TypeScript tips',
                'Web performance optimization',
                'Machine learning basics',
                'Cloud architecture patterns'
              ].map((tip) => (
                <motion.button
                  key={tip}
                  type="button"
                  onClick={() => setQuery(tip)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-100 to-indigo-100 dark:from-cyan-500/20 dark:to-indigo-500/20 hover:from-cyan-200 hover:to-indigo-200 dark:hover:from-cyan-500/30 dark:hover:to-indigo-500/30 border border-cyan-300 dark:border-cyan-400/40 hover:border-cyan-400 dark:hover:border-cyan-400/60 rounded-xl text-sm text-cyan-900 dark:text-cyan-100 font-medium hover:text-cyan-800 dark:hover:text-cyan-200 transition-all shadow-lg shadow-cyan-400/20 dark:shadow-cyan-500/10"
                >
                  {tip}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

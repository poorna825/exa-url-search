import { useState, useEffect } from 'react';
import { Search, Command } from 'lucide-react';
import { motion } from 'framer-motion';

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
      className="sticky top-4 z-50 w-full max-w-3xl mx-auto px-4"
    >
      <form onSubmit={handleSubmit}>
        <div
          className={`relative backdrop-blur-xl bg-gray-900/80 border transition-all duration-300 rounded-2xl shadow-2xl ${
            isFocused ? 'border-purple-500 shadow-purple-500/20' : 'border-gray-700/50'
          }`}
        >
          <div className="flex items-center px-4 py-3">
            <Search className={`w-5 h-5 ${isFocused ? 'text-purple-400' : 'text-gray-500'} transition-colors`} />
            <input
              id="search-input"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Ask anything..."
              className="flex-1 bg-transparent border-none outline-none px-4 text-gray-100 placeholder-gray-500 text-lg"
              disabled={loading}
            />
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Command className="w-4 h-4" />
              <span>/</span>
            </div>
          </div>
          
          {loading && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 animate-pulse" />
          )}
        </div>
      </form>
    </motion.div>
  );
};

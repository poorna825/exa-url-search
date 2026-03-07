import { motion } from 'framer-motion';
import { Search, Sparkles } from 'lucide-react';

interface EmptyStateProps {
  hasSearched: boolean;
  query?: string;
}

export const EmptyState = ({ hasSearched, query }: EmptyStateProps) => {
  if (hasSearched) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="backdrop-blur-xl bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-gray-700/50 rounded-2xl p-12 text-center shadow-xl"
      >
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-800/50 rounded-full flex items-center justify-center">
          <Search className="w-8 h-8 text-gray-500" />
        </div>
        <h3 className="text-xl font-semibold text-gray-300 mb-2">No results found</h3>
        <p className="text-gray-500">
          We couldn't find any results for "{query}". Try different keywords or select more platforms.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="backdrop-blur-xl bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-gray-700/50 rounded-2xl p-12 text-center shadow-xl"
    >
      <motion.div
        animate={{
          rotate: [0, 10, -10, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center"
      >
        <Sparkles className="w-10 h-10 text-white" />
      </motion.div>
      
      <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent mb-3">
        Start Your Research
      </h3>
      <p className="text-gray-400 max-w-md mx-auto leading-relaxed">
        Search across multiple platforms and get AI-powered insights instantly. Press{' '}
        <kbd className="px-2 py-1 bg-gray-800 rounded text-purple-300 font-mono text-sm">/</kbd>{' '}
        to get started.
      </p>

      <div className="grid grid-cols-3 gap-4 mt-8 max-w-xl mx-auto">
        {['Quick', 'Accurate', 'Smart'].map((feature, i) => (
          <motion.div
            key={feature}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="p-4 bg-gray-800/50 rounded-lg border border-gray-700/30"
          >
            <p className="text-sm font-semibold text-gray-300">{feature}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

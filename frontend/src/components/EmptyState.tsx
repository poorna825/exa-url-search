import { motion } from 'framer-motion';
import { Search, Sparkles, Zap, Globe, Brain, TrendingUp } from 'lucide-react';

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
        className="backdrop-blur-xl bg-gradient-to-br from-white/95 to-gray-50/95 dark:from-gray-900/95 dark:to-gray-800/95 border border-gray-300 dark:border-gray-700/50 rounded-2xl p-16 text-center shadow-xl"
      >
        <motion.div 
          className="w-24 h-24 mx-auto mb-6 bg-gray-200 dark:bg-gray-800/50 rounded-2xl flex items-center justify-center border border-gray-300 dark:border-gray-700/40"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Search className="w-12 h-12 text-gray-500 dark:text-gray-500" />
        </motion.div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-300 mb-3">No Results Found</h3>
        <p className="text-gray-600 dark:text-gray-500 text-lg max-w-md mx-auto leading-relaxed">
          We couldn't find any results for <span className="text-purple-400 font-semibold">"{query}"</span>
        </p>
        <div className="mt-8 space-y-3 text-sm text-gray-500 dark:text-gray-600">
          <p>Try these suggestions:</p>
          <ul className="space-y-2">
            <li>• Use different keywords</li>
            <li>• Select more platforms from the sidebar</li>
            <li>• Check your spelling</li>
          </ul>
        </div>
      </motion.div>
    );
  }

  const features = [
    { 
      icon: Zap, 
      title: 'Lightning Fast', 
      description: 'Get results in seconds',
      color: 'from-yellow-500 to-orange-500',
      iconColor: 'text-yellow-400'
    },
    { 
      icon: Brain, 
      title: 'AI-Powered', 
      description: 'Smart summaries for every result',
      color: 'from-purple-500 to-pink-500',
      iconColor: 'text-purple-400'
    },
    { 
      icon: Globe, 
      title: 'Multi-Platform', 
      description: 'Search across multiple sources',
      color: 'from-blue-500 to-cyan-500',
      iconColor: 'text-blue-400'
    },
  ];

  const exampleSearches = [
    'AI development trends 2024',
    'React performance optimization',
    'Machine learning basics',
    'Web3 explained',
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Hero Section */}
      <div className="backdrop-blur-xl bg-gradient-to-br from-white/95 to-gray-50/95 dark:from-gray-900/95 dark:to-gray-800/95 border border-gray-300 dark:border-gray-700/50 rounded-2xl p-16 text-center shadow-xl relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-200 dark:bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-pink-200 dark:bg-pink-500/10 rounded-full blur-3xl" />
        
        <div className="relative z-10">
          <motion.div
            animate={{
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
            className="w-28 h-28 mx-auto mb-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-purple-500/30"
          >
            <Sparkles className="w-14 h-14 text-white" />
          </motion.div>
          
          <motion.h3 
            className="text-4xl font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-transparent mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Welcome to AI Search
          </motion.h3>
          
          <motion.p 
            className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Search across multiple platforms and get AI-powered insights instantly. 
            Your intelligent research companion that synthesizes information from across the web.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/40 rounded-xl"
          >
            <span className="text-sm text-gray-600 dark:text-gray-400">Press</span>
            <kbd className="px-3 py-2 bg-gray-200 dark:bg-gray-800 rounded-lg text-purple-600 dark:text-purple-300 font-mono text-lg border border-gray-300 dark:border-gray-700 shadow-lg">/</kbd>
            <span className="text-sm text-gray-600 dark:text-gray-400">to get started</span>
          </motion.div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="backdrop-blur-xl bg-gradient-to-br from-white/95 to-gray-50/95 dark:from-gray-900/95 dark:to-gray-800/95 border border-gray-300 dark:border-gray-700/50 rounded-2xl p-8 shadow-xl hover:border-purple-400 dark:hover:border-purple-500/50 transition-all group"
            >
              <motion.div 
                className={`w-16 h-16 mb-6 bg-gradient-to-br ${feature.color} bg-opacity-20 rounded-2xl flex items-center justify-center`}
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <Icon className={`w-8 h-8 ${feature.iconColor}`} />
              </motion.div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all">
                {feature.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Example Searches */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="backdrop-blur-xl bg-gradient-to-br from-white/95 to-gray-50/95 dark:from-gray-900/95 dark:to-gray-800/95 border border-gray-300 dark:border-gray-700/50 rounded-2xl p-10 shadow-xl"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg border border-green-500/30">
            <TrendingUp className="w-6 h-6 text-green-400" />
          </div>
          <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100">Popular Searches</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {exampleSearches.map((search, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + index * 0.1 }}
              whileHover={{ x: 4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 p-4 bg-gray-100 dark:bg-gray-800/50 hover:bg-gradient-to-r hover:from-purple-100 hover:to-pink-100 dark:hover:from-purple-500/10 dark:hover:to-pink-500/10 border border-gray-300 dark:border-gray-700/30 hover:border-purple-400 dark:hover:border-purple-500/40 rounded-xl text-left transition-all group"
            >
              <Search className="w-4 h-4 text-gray-500 dark:text-gray-500 group-hover:text-purple-500 dark:group-hover:text-purple-400 transition-colors flex-shrink-0" />
              <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors">
                {search}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

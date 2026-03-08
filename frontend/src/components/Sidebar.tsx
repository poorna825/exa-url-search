import { motion } from 'framer-motion';
import { Filter, Sparkles, Clock, Bookmark, TrendingUp, Info } from 'lucide-react';
import { PlatformFilter } from './PlatformFilter';

interface SidebarProps {
  availableDomains: Array<{ key: string; url: string; label: string }>;
  selectedDomains: string[];
  onDomainToggle: (domainKey: string) => void;
}

export const Sidebar = ({ availableDomains, selectedDomains, onDomainToggle }: SidebarProps) => {
  // Placeholder data for recent queries
  const recentQueries = [
    'AI development trends',
    'React best practices',
    'Web performance optimization',
  ];

  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-80 flex-shrink-0"
    >
      <div className="sticky top-24 space-y-5 max-h-[calc(100vh-7rem)] overflow-y-auto custom-scrollbar pr-2">
        {/* Branding */}
        <motion.div 
          className="backdrop-blur-xl bg-gradient-to-br from-white/95 to-gray-50/95 dark:from-gray-900/95 dark:to-gray-800/95 border border-gray-300 dark:border-gray-700/60 rounded-2xl p-6 shadow-2xl"
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <motion.div 
              className="p-2.5 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-xl shadow-purple-500/30"
              animate={{
                boxShadow: [
                  '0 0 20px rgba(168, 85, 247, 0.3)',
                  '0 0 30px rgba(236, 72, 153, 0.3)',
                  '0 0 20px rgba(168, 85, 247, 0.3)',
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Sparkles className="w-6 h-6 text-white" />
            </motion.div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              AI Search
            </h1>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-light">
            Multi-domain research powered by artificial intelligence
          </p>
        </motion.div>

        {/* Platform Filters */}
        <motion.div 
          className="backdrop-blur-xl bg-gradient-to-br from-white/95 to-gray-50/95 dark:from-gray-900/95 dark:to-gray-800/95 border border-gray-300 dark:border-gray-700/60 rounded-2xl p-6 shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-2.5 mb-5">
            <div className="p-2 bg-purple-500/20 rounded-lg border border-purple-500/30">
              <Filter className="w-5 h-5 text-purple-400" />
            </div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Platforms</h2>
          </div>
          
          <div className="space-y-2">
            {availableDomains.map((domain, index) => (
              <motion.div
                key={domain.key}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <PlatformFilter
                  domain={domain}
                  isSelected={selectedDomains.includes(domain.key)}
                  onToggle={() => onDomainToggle(domain.key)}
                />
              </motion.div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-300 dark:border-gray-700/50">
            <p className="text-xs text-gray-500 dark:text-gray-500 font-medium">
              {selectedDomains.length} of {availableDomains.length} platforms active
            </p>
          </div>
        </motion.div>

        {/* Recent Queries */}
        <motion.div 
          className="backdrop-blur-xl bg-gradient-to-br from-white/95 to-gray-50/95 dark:from-gray-900/95 dark:to-gray-800/95 border border-gray-300 dark:border-gray-700/60 rounded-2xl p-6 shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2.5 mb-4">
            <div className="p-2 bg-blue-500/20 rounded-lg border border-blue-500/30">
              <Clock className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Recent</h3>
          </div>

          <div className="space-y-2">
            {recentQueries.map((query, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                whileHover={{ x: 4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full text-left p-3 rounded-lg bg-gray-100 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700/30 hover:bg-purple-50 dark:hover:bg-gray-700/50 hover:border-purple-300 dark:hover:border-blue-500/30 transition-all group"
              >
                <p className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-blue-300 transition-colors truncate">
                  {query}
                </p>
              </motion.button>
            ))}
          </div>

          <motion.p 
            className="mt-4 text-xs text-gray-400 dark:text-gray-600 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Your search history appears here
          </motion.p>
        </motion.div>

        {/* Saved Searches - Placeholder */}
        <motion.div 
          className="backdrop-blur-xl bg-gradient-to-br from-white/95 to-gray-50/95 dark:from-gray-900/95 dark:to-gray-800/95 border border-gray-300 dark:border-gray-700/60 rounded-2xl p-6 shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-2.5 mb-4">
            <div className="p-2 bg-pink-500/20 rounded-lg border border-pink-500/30">
              <Bookmark className="w-5 h-5 text-pink-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Saved</h3>
          </div>

          <div className="text-center py-6">
            <div className="w-12 h-12 mx-auto mb-3 bg-gray-100 dark:bg-gray-800/50 rounded-xl flex items-center justify-center border border-gray-300 dark:border-gray-700/30">
              <Bookmark className="w-6 h-6 text-gray-400 dark:text-gray-600" />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-500 font-light">
              Save your favorite searches for quick access
            </p>
          </div>
        </motion.div>

        {/* Quick Tips */}
        <motion.div 
          className="backdrop-blur-xl bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/40 dark:to-blue-900/40 border border-purple-200 dark:border-purple-500/40 rounded-2xl p-6 shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-2.5 mb-4">
            <Info className="w-5 h-5 text-purple-400" />
            <h3 className="text-sm font-bold text-purple-700 dark:text-purple-200">Quick Tips</h3>
          </div>

          <div className="space-y-3 text-xs text-gray-600 dark:text-gray-400">
            <div className="flex items-start gap-2">
              <div className="mt-1 w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
              <p className="leading-relaxed">
                Press <kbd className="px-1.5 py-0.5 bg-gray-800 rounded text-purple-300 font-mono text-xs">/</kbd> to focus search
              </p>
            </div>
            <div className="flex items-start gap-2">
              <div className="mt-1 w-1.5 h-1.5 rounded-full bg-pink-400 flex-shrink-0" />
              <p className="leading-relaxed">
                Select multiple platforms for broader insights
              </p>
            </div>
            <div className="flex items-start gap-2">
              <div className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
              <p className="leading-relaxed">
                AI summaries highlight key information from each source
              </p>
            </div>
          </div>
        </motion.div>

        {/* Trending Badge */}
        <motion.a
          href="#"
          className="block backdrop-blur-xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/40 dark:to-emerald-900/40 border border-green-200 dark:border-green-500/40 rounded-2xl p-4 shadow-xl hover:border-green-400 dark:hover:border-green-500/60 transition-all group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/20 rounded-lg border border-green-500/30">
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-green-200">More Trending Topics</p>
              <p className="text-xs text-green-400/70">Discover what's hot now</p>
            </div>
          </div>
        </motion.a>
      </div>
    </motion.aside>
  );
};

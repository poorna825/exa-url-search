import { motion } from 'framer-motion';
import { Loader2, Sparkles, Search, Brain, Zap } from 'lucide-react';

export const LoadingState = () => {
  const loadingMessages = [
    { icon: Search, text: 'Searching across platforms...', color: 'text-purple-400' },
    { icon: Brain, text: 'Analyzing content...', color: 'text-pink-400' },
    { icon: Zap, text: 'Generating AI summaries...', color: 'text-blue-400' },
  ];

  return (
    <div className="space-y-5">
      {/* Loading header with animated messages */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative overflow-hidden backdrop-blur-xl bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 dark:from-purple-900/50 dark:via-pink-900/50 dark:to-blue-900/50 border-2 border-purple-300 dark:border-purple-500/40 rounded-2xl p-8 shadow-2xl"
      >
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            backgroundSize: '200% 100%',
          }}
        />

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <motion.div
                className="p-3 bg-gradient-to-br from-purple-500/40 to-pink-500/40 rounded-2xl backdrop-blur-sm border border-purple-300 dark:border-white/20 shadow-xl"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                rotate: { duration: 3, repeat: Infinity, ease: 'linear' },
                scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
              }}
            >
              <Sparkles className="w-7 h-7 text-white" />
            </motion.div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                AI Research in Progress
              </h3>
              <p className="text-sm text-purple-700 dark:text-purple-200/80">
                This may take a few moments...
              </p>
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <Loader2 className="w-6 h-6 text-purple-600 dark:text-purple-300" />
            </motion.div>
          </div>

          {/* Loading steps */}
          <div className="space-y-3">
            {loadingMessages.map((message, index) => {
              const Icon = message.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: [0.3, 1, 0.3],
                    x: 0,
                  }}
                  transition={{
                    opacity: {
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.6,
                    },
                    x: { duration: 0.4, delay: index * 0.2 }
                  }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-white/30 dark:bg-white/5 border border-purple-200 dark:border-white/10"
                >
                  <Icon className={`w-5 h-5 ${message.color}`} />
                  <span className="text-sm text-gray-800 dark:text-gray-200 font-medium">
                    {message.text}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* Progress bar */}
            <div className="mt-6 relative h-2 bg-gray-200 dark:bg-gray-800/50 rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>
        </div>
      </motion.div>

      {/* Enhanced skeleton cards */}
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * i, duration: 0.4 }}
          className="backdrop-blur-xl bg-gradient-to-br from-white/95 to-gray-50/95 dark:from-gray-900/95 dark:to-gray-800/95 border border-gray-300 dark:border-gray-700/50 rounded-2xl p-7 shadow-xl"
        >
          {/* Header skeleton */}
          <div className="flex items-center gap-3 mb-5">
            <motion.div 
              className="w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700/50 dark:to-gray-600/50 rounded-xl"
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
            <div className="space-y-2 flex-1">
              <motion.div 
                className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700/50 dark:to-gray-600/50 rounded w-24"
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2 + 0.1,
                }}
              />
            </div>
          </div>
          
          {/* Content skeleton */}
          <div className="space-y-4">
            {/* Title */}
            <motion.div 
              className="h-7 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700/50 dark:to-gray-600/50 rounded-lg w-3/4"
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2 + 0.2,
              }}
            />
            
            {/* AI Summary box */}
            <motion.div 
              className="h-24 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-500/10 dark:to-pink-500/10 border border-purple-200 dark:border-purple-500/20 rounded-xl relative overflow-hidden"
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2 + 0.3,
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 to-transparent"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            </motion.div>
            
            {/* Snippet lines */}
            <div className="space-y-2">
              <motion.div 
                className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700/50 dark:to-gray-600/50 rounded w-full"
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2 + 0.4,
                }}
              />
              <motion.div 
                className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700/50 dark:to-gray-600/50 rounded w-2/3"
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2 + 0.5,
                }}
              />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

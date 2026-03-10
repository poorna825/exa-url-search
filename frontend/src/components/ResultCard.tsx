import { motion } from 'framer-motion';
import { ExternalLink, Sparkles, LinkIcon, ChevronRight } from 'lucide-react';
import { PlatformIcon } from './PlatformIcon';

interface ResultCardProps {
  title: string;
  url: string;
  snippet: string;
  summary: string;
  domain: string;
  index: number;
}

export const ResultCard = ({ title, url, snippet, summary, domain, index }: ResultCardProps) => {
  const domainName = domain.replace(/^(https?:\/\/)?(www\.)?/, '').split('.')[0];

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      whileHover={{ y: -4, scale: 1.01 }}
      className="group relative backdrop-blur-xl bg-gradient-to-br from-white/95 to-gray-50/95 dark:from-gray-900/95 dark:to-gray-800/95 border border-gray-300 dark:border-gray-700/50 rounded-3xl p-8 hover:border-purple-500/60 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 overflow-hidden"
    >
      {/* Glassmorphism overlay with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/[0.02] dark:from-white/[0.04] via-transparent to-transparent rounded-3xl pointer-events-none" />
      
      {/* Animated gradient border on hover */}
      <motion.div 
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(99, 102, 241, 0.15) 100%)',
          padding: '2px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />
      
      <div className="relative z-10 space-y-6">
        {/* Header with platform icon and domain */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 400 }}
              className="flex-shrink-0"
            >
              <PlatformIcon domain={domain} />
            </motion.div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                {domainName}
              </span>
              <span className="text-sm text-gray-400 dark:text-gray-600 truncate">{new URL(url).hostname}</span>
            </div>
          </div>
          
          <motion.a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${title} in new tab`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0 p-3 bg-gray-100 dark:bg-slate-800/50 hover:bg-cyan-100 dark:hover:bg-cyan-500/20 border border-gray-300 dark:border-slate-700/40 hover:border-cyan-500/50 rounded-2xl opacity-60 group-hover:opacity-100 transition-all duration-300"
          >
            <ExternalLink className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors" />
          </motion.a>
        </div>

        {/* Title */}
        <motion.h3 
          className="text-2xl font-bold leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:via-indigo-500 group-hover:to-violet-500 transition-all duration-300"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.08 + 0.1 }}
        >
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-900 dark:text-gray-100 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-cyan-500 hover:via-indigo-500 hover:to-violet-500 transition-all duration-300"
          >
            {title}
          </a>
        </motion.h3>

        {/* AI Summary Section */}
        {summary && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.4, delay: index * 0.08 + 0.2 }}
            className="relative p-6 rounded-2xl bg-gradient-to-br from-cyan-50 dark:from-cyan-500/10 via-indigo-50 dark:via-indigo-500/10 to-violet-50 dark:to-violet-500/10 border border-cyan-200 dark:border-cyan-500/20 backdrop-blur-sm overflow-hidden"
          >
            {/* Decorative corner gradient */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-200 dark:from-cyan-500/10 to-transparent rounded-full blur-2xl" />
            
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: 'reverse',
                  }}
                >
                  <Sparkles className="w-5 h-5 text-cyan-500 dark:text-cyan-400" />
                </motion.div>
                <span className="text-sm text-cyan-700 dark:text-cyan-300 font-bold uppercase tracking-wider">
                  AI Summary
                </span>
              </div>
              <p className="text-base text-gray-700 dark:text-gray-200 leading-relaxed font-light">
                {summary}
              </p>
            </div>
          </motion.div>
        )}

        {/* Snippet */}
        <motion.div 
          className="space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.08 + 0.3 }}
        >
          <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3">
            {snippet}
          </p>
        </motion.div>

        {/* URL Footer */}
        <motion.div 
          className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-800/50"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.08 + 0.4 }}
        >
          <div className="flex items-center gap-2">
            <LinkIcon className="w-4 h-4 text-gray-400 dark:text-gray-600" />
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-500 dark:text-gray-600 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors inline-block truncate flex-1"
            >
              {url}
            </a>
          </div>
          <motion.div
            whileHover={{ x: 4 }}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight className="w-4 h-4 text-cyan-500" />
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient accent on hover */}
      <motion.div 
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.4 }}
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-indigo-500 to-violet-500 rounded-b-3xl origin-center"
      />
    </motion.article>
  );
};

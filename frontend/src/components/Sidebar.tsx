import { motion } from 'framer-motion';
import { Filter, Sparkles } from 'lucide-react';
import { PlatformFilter } from './PlatformFilter';

interface SidebarProps {
  availableDomains: Array<{ key: string; url: string; label: string }>;
  selectedDomains: string[];
  onDomainToggle: (domainKey: string) => void;
}

export const Sidebar = ({ availableDomains, selectedDomains, onDomainToggle }: SidebarProps) => {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-72 flex-shrink-0"
    >
      <div className="sticky top-24 space-y-6">
        {/* Branding */}
        <div className="backdrop-blur-xl bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-gray-700/50 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              AI Search
            </h1>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            Multi-domain research powered by AI
          </p>
        </div>

        {/* Filters */}
        <div className="backdrop-blur-xl bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-gray-700/50 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-purple-400" />
            <h2 className="text-lg font-semibold text-gray-100">Platforms</h2>
          </div>
          
          <div className="space-y-2">
            {availableDomains.map((domain) => (
              <PlatformFilter
                key={domain.key}
                domain={domain}
                isSelected={selectedDomains.includes(domain.key)}
                onToggle={() => onDomainToggle(domain.key)}
              />
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-700/50">
            <p className="text-xs text-gray-500">
              {selectedDomains.length} of {availableDomains.length} platforms selected
            </p>
          </div>
        </div>

        {/* Stats Card */}
        <div className="backdrop-blur-xl bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-500/30 rounded-2xl p-6 shadow-xl">
          <h3 className="text-sm font-semibold text-blue-300 mb-3">Pro Tip</h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            Use <kbd className="px-2 py-1 bg-gray-800 rounded text-purple-300 font-mono text-xs">/</kbd> to quickly focus the search bar
          </p>
        </div>
      </div>
    </motion.aside>
  );
};

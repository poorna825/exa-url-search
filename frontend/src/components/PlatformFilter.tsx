import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { PlatformIcon } from './PlatformIcon';

interface PlatformFilterProps {
  domain: {
    key: string;
    url: string;
    label: string;
  };
  isSelected: boolean;
  onToggle: () => void;
}

export const PlatformFilter = ({ domain, isSelected, onToggle }: PlatformFilterProps) => {
  return (
    <motion.button
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onToggle}
      className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
        isSelected
          ? 'bg-purple-100 dark:bg-purple-500/20 border border-purple-400 dark:border-purple-500/50'
          : 'bg-gray-100 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700/30 hover:bg-purple-50 dark:hover:bg-gray-700/50'
      }`}
    >
      <div className="flex items-center gap-3">
        <PlatformIcon domain={domain.url} />
        <span className={`text-sm font-medium ${isSelected ? 'text-gray-900 dark:text-gray-100' : 'text-gray-600 dark:text-gray-400'}`}>
          {domain.label}
        </span>
      </div>
      
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center"
        >
          <Check className="w-3 h-3 text-white" />
        </motion.div>
      )}
    </motion.button>
  );
};

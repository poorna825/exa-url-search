import { Youtube, Twitter, Github, MessageCircle, FileText, TrendingUp, Music, Video } from 'lucide-react';

interface PlatformIconProps {
  domain: string;
}

export const PlatformIcon = ({ domain }: PlatformIconProps) => {
  const getPlatform = (domain: string) => {
    const lowerDomain = domain.toLowerCase();
    
    if (lowerDomain.includes('youtube')) {
      return { icon: Youtube, color: 'text-red-500', bg: 'bg-red-500/15', border: 'border-red-500/20' };
    }
    if (lowerDomain.includes('twitter') || lowerDomain.includes('x.com')) {
      return { icon: Twitter, color: 'text-blue-400', bg: 'bg-blue-400/15', border: 'border-blue-400/20' };
    }
    if (lowerDomain.includes('github')) {
      return { icon: Github, color: 'text-gray-900 dark:text-gray-100', bg: 'bg-gray-200 dark:bg-gray-100/15', border: 'border-gray-300 dark:border-gray-100/20' };
    }
    if (lowerDomain.includes('reddit')) {
      return { icon: MessageCircle, color: 'text-orange-500', bg: 'bg-orange-500/15', border: 'border-orange-500/20' };
    }
    if (lowerDomain.includes('medium')) {
      return { icon: FileText, color: 'text-green-500', bg: 'bg-green-500/15', border: 'border-green-500/20' };
    }
    if (lowerDomain.includes('tiktok')) {
      return { icon: Music, color: 'text-pink-500', bg: 'bg-pink-500/15', border: 'border-pink-500/20' };
    }
    if (lowerDomain.includes('instagram')) {
      return { icon: Video, color: 'text-fuchsia-500', bg: 'bg-fuchsia-500/15', border: 'border-fuchsia-500/20' };
    }
    
    return { icon: TrendingUp, color: 'text-gray-600 dark:text-gray-400', bg: 'bg-gray-200 dark:bg-gray-400/15', border: 'border-gray-300 dark:border-gray-400/20' };
  };

  const { icon: Icon, color, bg, border } = getPlatform(domain);

  return (
    <div className={`p-2.5 rounded-xl ${bg} border ${border}`}>
      <Icon className={`w-5 h-5 ${color}`} />
    </div>
  );
};

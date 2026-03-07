import { Youtube, Twitter, Github, MessageCircle, FileText, TrendingUp } from 'lucide-react';

interface PlatformIconProps {
  domain: string;
}

export const PlatformIcon = ({ domain }: PlatformIconProps) => {
  const getPlatform = (domain: string) => {
    const lowerDomain = domain.toLowerCase();
    
    if (lowerDomain.includes('youtube')) {
      return { icon: Youtube, color: 'text-red-500', bg: 'bg-red-500/10' };
    }
    if (lowerDomain.includes('twitter')) {
      return { icon: Twitter, color: 'text-blue-400', bg: 'bg-blue-400/10' };
    }
    if (lowerDomain.includes('github')) {
      return { icon: Github, color: 'text-gray-300', bg: 'bg-gray-300/10' };
    }
    if (lowerDomain.includes('reddit')) {
      return { icon: MessageCircle, color: 'text-orange-500', bg: 'bg-orange-500/10' };
    }
    if (lowerDomain.includes('medium')) {
      return { icon: FileText, color: 'text-green-500', bg: 'bg-green-500/10' };
    }
    if (lowerDomain.includes('tiktok')) {
      return { icon: TrendingUp, color: 'text-pink-500', bg: 'bg-pink-500/10' };
    }
    
    return { icon: FileText, color: 'text-gray-400', bg: 'bg-gray-400/10' };
  };

  const { icon: Icon, color, bg } = getPlatform(domain);

  return (
    <div className={`p-2 rounded-lg ${bg}`}>
      <Icon className={`w-5 h-5 ${color}`} />
    </div>
  );
};

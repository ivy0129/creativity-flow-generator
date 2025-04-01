
import React from 'react';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/hooks/useLanguage';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

const Logo = ({ 
  size = 'md', 
  showText = true, 
  className 
}: LogoProps) => {
  const { t } = useLanguage();
  
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-10 w-10'
  };
  
  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="relative">
        <div className="absolute inset-0 blur-sm opacity-50 bg-purple-500 rounded-full"></div>
        <Sparkles 
          className={cn(
            sizeClasses[size], 
            'text-primary relative z-10'
          )} 
        />
      </div>
      
      {showText && (
        <span className={cn(
          "font-bold gradient-text", 
          textSizeClasses[size]
        )}>
          {t('promptOptimizer')}
        </span>
      )}
    </div>
  );
};

export default Logo;

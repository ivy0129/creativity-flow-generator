
import React from 'react';
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
        {/* Simple message bubble logo */}
        <div className={cn(
          "rounded-lg flex items-center justify-center relative",
          sizeClasses[size]
        )}>
          <svg viewBox="0 0 24 24" className={cn(sizeClasses[size])}>
            <rect width="20" height="16" x="2" y="4" rx="3" fill="#8B5CF6" className="drop-shadow-md" />
            <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" 
                  fill="white" fontSize="10" fontWeight="bold">AI</text>
          </svg>
        </div>
      </div>
      
      {showText && (
        <span className={cn(
          "font-bold text-primary", 
          textSizeClasses[size]
        )}>
          {t('promptOptimizer')}
        </span>
      )}
    </div>
  );
};

export default Logo;

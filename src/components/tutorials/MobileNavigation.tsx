
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Bookmark, Book, Info } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const MobileNavigation: React.FC = () => {
  const { t, language } = useLanguage();
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border flex justify-around items-center h-16 shadow-lg z-30">
      <Link to="/" className="flex flex-1 flex-col items-center justify-center h-full text-muted-foreground hover:text-primary">
        <Home className="h-5 w-5 mb-1" />
        <span className="text-xs">{t('home')}</span>
      </Link>
      <Link to="/saved" className="flex flex-1 flex-col items-center justify-center h-full text-muted-foreground hover:text-primary">
        <Bookmark className="h-5 w-5 mb-1" />
        <span className="text-xs">{t('savedPrompts')}</span>
      </Link>
      <Link to="/tutorials" className="flex flex-1 flex-col items-center justify-center h-full text-primary">
        <Book className="h-5 w-5 mb-1" />
        <span className="text-xs">{language === 'en' ? 'Tutorials' : '教程'}</span>
      </Link>
      <Link to="/settings" className="flex flex-1 flex-col items-center justify-center h-full text-muted-foreground hover:text-primary">
        <Info className="h-5 w-5 mb-1" />
        <span className="text-xs">{language === 'en' ? 'About Us' : '关于我们'}</span>
      </Link>
    </div>
  );
};

export default MobileNavigation;

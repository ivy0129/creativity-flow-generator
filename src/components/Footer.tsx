
import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Heart } from 'lucide-react';
import { Separator } from './ui/separator';
import { useLanguage } from '@/hooks/useLanguage';
import Logo from './Logo';

const Footer = () => {
  const { t, language, toggleLanguage } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col items-center md:items-start gap-2">
            <Logo size="sm" />
            <p className="text-sm text-muted-foreground text-center md:text-left">
              {t('footerDescription')}
            </p>
          </div>
          
          <div className="flex flex-col gap-4 items-center">
            <div className="flex space-x-4 items-center">
              <Link 
                to="#" 
                className="text-muted-foreground hover:text-foreground transition"
                onClick={(e) => {
                  e.preventDefault();
                  toggleLanguage();
                }}
              >
                {language === 'en' ? '中文' : 'English'}
              </Link>
              
              <Separator orientation="vertical" className="h-4" />
              
              <Link 
                to="/settings" 
                className="text-muted-foreground hover:text-foreground transition"
              >
                {t('settings')}
              </Link>
              
              <Separator orientation="vertical" className="h-4" />
              
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer" 
                className="text-muted-foreground hover:text-foreground transition"
              >
                <Github className="h-4 w-4" />
              </a>
            </div>
            
            <div className="text-sm text-muted-foreground flex items-center gap-1">
              <span>{t('madeWith')}</span>
              <Heart className="h-3 w-3 fill-red-500 text-red-500" />
              <span>&copy; {year}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

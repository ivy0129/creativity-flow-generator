
import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const { language } = useLanguage();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full py-8 px-4 sm:px-6 mt-auto bg-background/80">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {language === 'en' ? 'About Us' : '关于我们'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {language === 'en' 
                ? 'We are dedicated to helping new developers create better AI prompts.'
                : '我们致力于帮助新手开发者创建更好的AI提示词。'}
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {language === 'en' ? 'Quick Links' : '快速链接'}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {language === 'en' ? 'Home' : '首页'}
                </Link>
              </li>
              <li>
                <Link to="/saved" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {language === 'en' ? 'Saved Prompts' : '保存的提示词'}
                </Link>
              </li>
              <li>
                <Link to="/settings" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {language === 'en' ? 'About Us' : '关于我们'}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {language === 'en' ? 'Contact' : '联系我们'}
            </h3>
            <address className="not-italic">
              <p className="text-sm text-muted-foreground">
                Email: <a href="mailto:contact@myprompt.ai" className="hover:text-foreground transition-colors">contact@myprompt.ai</a>
              </p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-border pt-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground mb-2 md:mb-0">
              © {currentYear} AI提示优化助手. {language === 'en' ? 'All Rights Reserved.' : '保留所有权利.'}
            </p>
            
            <div className="flex space-x-4">
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {language === 'en' ? 'Privacy Policy' : '隐私政策'}
              </Link>
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {language === 'en' ? 'Terms of Service' : '服务条款'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

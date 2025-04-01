
import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';

const Footer: React.FC = () => {
  const { language } = useLanguage();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full py-6 px-4 sm:px-6 mt-auto bg-background/80 border-t border-border">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-2 md:mb-0">
            © {currentYear} AI提示优化助手. {language === 'en' ? 'All Rights Reserved.' : '保留所有权利.'}
          </p>
          
          <p className="text-sm text-muted-foreground">
            {language === 'en' 
              ? 'Contact/Feedback: ivyhan0129@gmail.com' 
              : '联系我们/意见反馈：ivyhan0129@gmail.com'}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

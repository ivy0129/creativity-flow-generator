
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-8 px-4 sm:px-6 mt-auto">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 sm:mb-0">
            © {new Date().getFullYear()} AI提示优化助手. 保留所有权利.
          </p>
          <div className="flex items-center space-x-6">
            <Link to="/saved" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              已保存的提示词
            </Link>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              隐私政策
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              使用条款
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              联系我们
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

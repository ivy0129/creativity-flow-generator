
import React from 'react';
import { Sparkles, Code } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="w-full py-6 px-4 sm:px-6">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Code className="h-6 w-6 text-purple-600" />
          <h1 className="text-2xl font-bold gradient-text">AI提示优化助手</h1>
        </Link>
        <nav className="hidden sm:flex items-center space-x-6">
          <Link to="/" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            首页
          </Link>
          <Link to="/saved" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            已保存的提示词
          </Link>
          <a href="#" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            使用指南
          </a>
          <a href="#" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            关于我们
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;

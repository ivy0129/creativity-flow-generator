
import React from 'react';
import { Sparkles, Code, LogIn, LogOut, Github, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/hooks/useAuth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header: React.FC = () => {
  const { isAuthenticated, user, login, logout, loading } = useAuth();

  return (
    <header className="w-full py-6 px-4 sm:px-6">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Code className="h-6 w-6 text-purple-600" />
          <h1 className="text-2xl font-bold gradient-text">AI提示优化助手</h1>
        </Link>
        <nav className="flex items-center space-x-6">
          <div className="hidden sm:flex items-center space-x-6">
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
          </div>
          
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="text-sm font-medium">
                  {user?.name}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout} className="text-sm font-medium text-red-500 cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  退出登录
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" disabled={loading}>
                  <LogIn className="mr-2 h-4 w-4" />
                  {loading ? "登录中..." : "登录"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => login('github')} className="cursor-pointer">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub 登录
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => login('google')} className="cursor-pointer">
                  <Mail className="mr-2 h-4 w-4" />
                  Google 登录
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;


import React from 'react';
import { Code, LogIn, LogOut, Github, Mail, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Toggle } from "@/components/ui/toggle";

const Header: React.FC = () => {
  const { isAuthenticated, user, login, logout, loading } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const isMobile = useIsMobile();

  return (
    <header className="w-full py-6 px-4 sm:px-6">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 min-w-0">
          <Code className="h-6 w-6 flex-shrink-0 text-purple-600" />
          <h1 className="text-xl sm:text-2xl font-bold gradient-text truncate">
            {t('appName')}
          </h1>
        </Link>
        <nav className="flex items-center space-x-2 sm:space-x-6 flex-shrink-0">
          <div className="hidden sm:flex items-center space-x-6">
            <Link to="/" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
              {t('home')}
            </Link>
            <Link to="/saved" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
              {t('savedPrompts')}
            </Link>
            <Link to="/settings" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
              {t('settings')}
            </Link>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size={isMobile ? "icon" : "sm"} className={isMobile ? "w-8 h-8 p-0" : "gap-2"}>
                <span className="font-medium">中/E</span>
                {!isMobile && (language === 'en' ? 'English' : '中文')}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem 
                onClick={() => setLanguage('en')} 
                className={`cursor-pointer ${language === 'en' ? 'font-bold' : ''}`}
              >
                English
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setLanguage('zh')} 
                className={`cursor-pointer ${language === 'zh' ? 'font-bold' : ''}`}
              >
                中文
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 sm:h-10 sm:w-10 rounded-full p-0">
                  <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="text-sm font-medium">
                  {user?.name}
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="flex items-center cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    {t('settings')}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-sm font-medium text-red-500 cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  {t('logout')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  size={isMobile ? "icon" : "sm"} 
                  disabled={loading}
                  className={isMobile ? "w-8 h-8 p-0" : ""}
                >
                  <LogIn className={isMobile ? "h-4 w-4" : "mr-2 h-4 w-4"} />
                  {!isMobile && (loading ? "..." : t('login'))}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => login('github')} className="cursor-pointer">
                  <Github className="mr-2 h-4 w-4" />
                  {t('githubLogin')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => login('google')} className="cursor-pointer">
                  <Mail className="mr-2 h-4 w-4" />
                  {t('googleLogin')}
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

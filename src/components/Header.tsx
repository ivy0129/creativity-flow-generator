
import React from 'react';
import { LogIn, LogOut, Settings, Globe } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
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
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const Header: React.FC = () => {
  const { isAuthenticated, user, logout, loading } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  return (
    <header className="w-full py-6 px-4 sm:px-6">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 min-w-0">
          <div className="w-9 h-9 flex-shrink-0 bg-purple-500 text-white flex items-center justify-center rounded-md">
            <div className="text-sm font-bold">AI</div>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-purple-600 truncate">
            MyPrompt
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
          
          <div className="flex items-center space-x-2">
            <button
              className="language-switcher"
              onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
            >
              <Globe className="globe-icon h-4 w-4" />
              <span className="language-text">
                {language === 'en' ? 'English' : '简体中文'}
              </span>
            </button>
            
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
              <Button 
                variant="outline" 
                size={isMobile ? "icon" : "sm"} 
                disabled={loading}
                className={isMobile ? "w-8 h-8 p-0" : ""}
                onClick={() => navigate('/auth')}
              >
                <LogIn className={isMobile ? "h-4 w-4" : "mr-2 h-4 w-4"} />
                {!isMobile && (loading ? "..." : t('login'))}
              </Button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;

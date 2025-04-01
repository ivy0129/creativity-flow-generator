
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Settings, BookMarked, User } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import Logo from './Logo';

const Header = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <header className="border-b border-border py-3 px-4 bg-background/80 backdrop-blur-md sticky top-0 z-30">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="focus:outline-none">
          <Logo />
        </Link>
        
        <div className="hidden md:flex items-center space-x-1">
          <Link to="/">
            <Button variant={isActive('/') ? 'default' : 'ghost'} size="sm">
              {t('home')}
            </Button>
          </Link>
          <Link to="/saved">
            <Button variant={isActive('/saved') ? 'default' : 'ghost'} size="sm">
              <BookMarked className="h-4 w-4 mr-2" />
              {t('saved')}
            </Button>
          </Link>
          <Link to="/settings">
            <Button variant={isActive('/settings') ? 'default' : 'ghost'} size="sm">
              <Settings className="h-4 w-4 mr-2" />
              {t('settings')}
            </Button>
          </Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-2">
          {isAuthenticated ? (
            <div className="flex items-center">
              <div className="mr-2 text-sm text-muted-foreground">
                {user?.name}
              </div>
              <div className="h-8 w-8 rounded-full overflow-hidden">
                <img 
                  src={user?.avatar || '/placeholder.svg'} 
                  alt={user?.name || 'User'} 
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          ) : (
            <Button size="sm" variant="default">
              <User className="h-4 w-4 mr-2" />
              {t('login')}
            </Button>
          )}
        </div>
        
        <div className="md:hidden flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col space-y-4 mt-8">
                <Link to="/" className="flex items-center">
                  <Button 
                    variant={isActive('/') ? 'default' : 'ghost'} 
                    size="sm" 
                    className="w-full justify-start"
                  >
                    {t('home')}
                  </Button>
                </Link>
                <Link to="/saved" className="flex items-center">
                  <Button 
                    variant={isActive('/saved') ? 'default' : 'ghost'} 
                    size="sm" 
                    className="w-full justify-start"
                  >
                    <BookMarked className="h-4 w-4 mr-2" />
                    {t('saved')}
                  </Button>
                </Link>
                <Link to="/settings" className="flex items-center">
                  <Button 
                    variant={isActive('/settings') ? 'default' : 'ghost'} 
                    size="sm" 
                    className="w-full justify-start"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    {t('settings')}
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;

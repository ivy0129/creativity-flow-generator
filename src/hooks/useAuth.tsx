import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "./useLanguage";

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (provider: 'github' | 'google') => void;
  logout: () => void;
  loading: boolean;
}

interface User {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  provider: 'github' | 'google';
  isPremium?: boolean;
}

const GITHUB_CLIENT_ID = "您的GitHub客户端ID"; // 替换为您的GitHub客户端ID
const GITHUB_REDIRECT_URI = `${window.location.origin}/auth/callback`;

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { t, language } = useLanguage();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    
    if (code) {
      exchangeCodeForToken(code);
    }
  }, []);
  
  const exchangeCodeForToken = async (code: string) => {
    setLoading(true);
    try {
      setTimeout(() => {
        const mockUser = {
          id: `github-${Date.now()}`,
          name: 'GitHub用户',
          email: 'github-user@example.com',
          avatar: 'https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png',
          provider: 'github' as const,
          isPremium: false
        };
        
        setUser(mockUser);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(mockUser));
        
        window.history.replaceState({}, document.title, window.location.pathname);
        
        const loginSuccessTitle = language === 'en' ? 'Login Successful' : '登录成功';
        const loginSuccessMessage = language === 'en' 
          ? 'You have successfully logged in with GitHub'
          : '您已成功通过GitHub登录系统';
        
        toast({
          title: loginSuccessTitle,
          description: loginSuccessMessage,
        });
        
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Failed to exchange code for token', error);
      setLoading(false);
      
      const errorTitle = language === 'en' ? 'Login Failed' : '登录失败';
      const errorMessage = language === 'en' 
        ? 'Failed to login with GitHub. Please try again.'
        : '通过GitHub登录失败，请重试。';
      
      toast({
        title: errorTitle,
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const login = (provider: 'github' | 'google') => {
    setLoading(true);
    
    if (provider === 'github') {
      const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(GITHUB_REDIRECT_URI)}&scope=user`;
      window.location.href = githubAuthUrl;
    } else {
      setTimeout(() => {
        const mockUser = {
          id: `google-${Date.now()}`,
          name: 'Google用户',
          email: 'user@example.com',
          avatar: 'https://lh3.googleusercontent.com/a/ACg8ocJJAAmI26QqgNZs2cX6OuJj3Z7GiuPvqJNAA0Hm=s96-c',
          provider: 'google' as const,
          isPremium: false
        };
        
        setUser(mockUser);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(mockUser));
        setLoading(false);
        
        const loginSuccessTitle = language === 'en' ? 'Login Successful' : '登录成功';
        const loginSuccessMessage = language === 'en' 
          ? 'You have successfully logged in with Google'
          : '您已成功通过Google登录系统';
        
        toast({
          title: loginSuccessTitle,
          description: loginSuccessMessage,
        });
      }, 1000);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    
    const logoutSuccessTitle = language === 'en' ? 'Logged Out' : '已退出登录';
    const logoutSuccessMessage = language === 'en' 
      ? 'You have been logged out'
      : '您已成功退出系统';
    
    toast({
      title: logoutSuccessTitle,
      description: logoutSuccessMessage,
    });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};


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
  name: string;
  email?: string;
  avatar?: string;
  provider: 'github' | 'google';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { t } = useLanguage();

  // 检查本地存储中是否有用户信息
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = (provider: 'github' | 'google') => {
    setLoading(true);
    
    // 模拟 OAuth 流程
    // 在实际实现中，这里会重定向到对应的授权页面
    setTimeout(() => {
      const mockUser = {
        name: provider === 'github' ? 'GitHub用户' : 'Google用户',
        email: 'user@example.com',
        avatar: provider === 'github' 
          ? 'https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png'
          : 'https://lh3.googleusercontent.com/a/ACg8ocJJAAmI26QqgNZs2cX6OuJj3Z7GiuPvqJNAA0Hm=s96-c',
        provider
      };
      
      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(mockUser));
      setLoading(false);
      
      toast({
        title: t('loginSuccess'),
        description: `${t('loginSuccessMessage')}${provider === 'github' ? 'GitHub' : 'Google'}`,
      });
    }, 1000);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    
    toast({
      title: t('logoutSuccess'),
      description: t('logoutSuccessMessage'),
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

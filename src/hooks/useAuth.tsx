import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "./useLanguage";
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  fetchSignInMethodsForEmail,
  updateProfile,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface AuthContextType {
  isAuthenticated: boolean;
  user: AppUser | null;
  login: (provider: 'github' | 'google' | 'email', credentials?: { email: string; password: string }) => void;
  register: (credentials: { email: string; password: string; name: string }) => void;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
  loading: boolean;
}

interface AppUser {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  provider: 'github' | 'google' | 'email';
  isPremium?: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { t, language } = useLanguage();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const userData: AppUser = {
          id: firebaseUser.uid,
          name: firebaseUser.displayName || '用户',
          email: firebaseUser.email || undefined,
          avatar: firebaseUser.photoURL || undefined,
          provider: 'email',
          isPremium: false
        };
        setUser(userData);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (provider: 'github' | 'google' | 'email', credentials?: { email: string; password: string }) => {
    setLoading(true);
    
    try {
      if (provider === 'github') {
        const githubProvider = new GithubAuthProvider();
        try {
          await signInWithPopup(auth, githubProvider);
        } catch (error: any) {
          if (error.code === 'auth/account-exists-with-different-credential') {
            const email = error.customData.email;
            const providers = await fetchSignInMethodsForEmail(auth, email);
            
            if (providers[0] === 'google.com') {
              const googleProvider = new GoogleAuthProvider();
              googleProvider.setCustomParameters({ login_hint: email });
              await signInWithPopup(auth, googleProvider);
            }
          } else {
            throw error;
          }
        }
      } else if (provider === 'google') {
        const googleProvider = new GoogleAuthProvider();
        await signInWithPopup(auth, googleProvider);
      } else if (provider === 'email' && credentials) {
        await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
      }

      const loginSuccessTitle = language === 'en' ? 'Login Successful' : '登录成功';
      const loginSuccessMessage = language === 'en' 
        ? 'You have successfully logged in'
        : '您已成功登录系统';
      
      toast({
        title: loginSuccessTitle,
        description: loginSuccessMessage,
      });
      setLoading(false);
    } catch (error: any) {
      console.error('Login failed:', error);
      setLoading(false);
      
      let errorMessage = language === 'en' 
        ? 'Failed to login. Please try again.'
        : '登录失败，请重试。';

      if (error.code === 'auth/account-exists-with-different-credential') {
        errorMessage = language === 'en'
          ? 'This email is already registered with a different login method. Please try using Google login.'
          : '该邮箱已通过其他方式注册，请尝试使用 Google 登录。';
      }
      
      toast({
        title: language === 'en' ? 'Login Failed' : '登录失败',
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const register = async (credentials: { email: string; password: string; name: string }) => {
    setLoading(true);
    
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );

      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: credentials.name
        });

        const userData: AppUser = {
          id: userCredential.user.uid,
          name: credentials.name,
          email: credentials.email,
          provider: 'email',
          isPremium: false
        };
        setUser(userData);
      }

      const registerSuccessTitle = language === 'en' ? 'Registration Successful' : '注册成功';
      const registerSuccessMessage = language === 'en' 
        ? 'You have successfully registered'
        : '您已成功注册系统';
      
      toast({
        title: registerSuccessTitle,
        description: registerSuccessMessage,
      });
      setLoading(false);
    } catch (error) {
      console.error('Registration failed:', error);
      setLoading(false);
      
      const errorTitle = language === 'en' ? 'Registration Failed' : '注册失败';
      const errorMessage = language === 'en' 
        ? 'Failed to register. Please try again.'
        : '注册失败，请重试。';
      
      toast({
        title: errorTitle,
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      
      const logoutSuccessTitle = language === 'en' ? 'Logged Out' : '已退出登录';
      const logoutSuccessMessage = language === 'en' 
        ? 'You have been logged out'
        : '您已成功退出系统';
      
      toast({
        title: logoutSuccessTitle,
        description: logoutSuccessMessage,
      });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const resetPassword = async (email: string) => {
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      
      const resetSuccessTitle = language === 'en' ? 'Reset Email Sent' : '重置邮件已发送';
      const resetSuccessMessage = language === 'en' 
        ? 'Please check your email to reset your password'
        : '请检查您的邮箱以重置密码';
      
      toast({
        title: resetSuccessTitle,
        description: resetSuccessMessage,
      });
    } catch (error) {
      console.error('Password reset failed:', error);
      
      const errorTitle = language === 'en' ? 'Reset Failed' : '重置失败';
      const errorMessage = language === 'en' 
        ? 'Failed to send reset email. Please try again.'
        : '发送重置邮件失败，请重试。';
      
      toast({
        title: errorTitle,
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user, 
      login, 
      register, 
      logout, 
      resetPassword,
      loading 
    }}>
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

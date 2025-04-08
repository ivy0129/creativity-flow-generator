
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

  const handleAuthError = (error: any) => {
    console.error('认证错误:', error);
    
    let errorMessage = language === 'en' 
      ? 'Authentication failed. Please try again.'
      : '认证失败，请重试。';

    // 处理常见的Firebase认证错误
    if (error.code === 'auth/account-exists-with-different-credential') {
      errorMessage = language === 'en'
        ? 'This email is already registered with a different login method. Please try using Google login.'
        : '该邮箱已通过其他方式注册，请尝试使用 Google 登录。';
    } else if (error.code === 'auth/invalid-credential') {
      errorMessage = language === 'en'
        ? 'Invalid login credentials. Please check your email and password.'
        : '登录凭据无效，请检查您的邮箱和密码。';
    } else if (error.code === 'auth/user-disabled') {
      errorMessage = language === 'en'
        ? 'This account has been disabled. Please contact support.'
        : '此账户已被禁用，请联系支持团队。';
    } else if (error.code === 'auth/user-not-found') {
      errorMessage = language === 'en'
        ? 'No account found with this email. Please register first.'
        : '未找到使用此邮箱的账户，请先注册。';
    } else if (error.code === 'auth/wrong-password') {
      errorMessage = language === 'en'
        ? 'Incorrect password. Please try again.'
        : '密码错误，请重试。';
    } else if (error.code === 'auth/email-already-in-use') {
      errorMessage = language === 'en'
        ? 'This email is already registered. Please login instead.'
        : '此邮箱已注册，请直接登录。';
    } else if (error.code === 'auth/weak-password') {
      errorMessage = language === 'en'
        ? 'Password is too weak. Please use a stronger password.'
        : '密码强度太弱，请使用更强的密码。';
    } else if (error.code === 'auth/unauthorized-domain') {
      errorMessage = language === 'en'
        ? 'This domain is not authorized for Firebase Authentication. Try using email login instead.'
        : '该域名未获授权，暂时不支持社交登录。请尝试使用邮箱登录。';
    }
    
    toast({
      title: language === 'en' ? 'Authentication Error' : '认证错误',
      description: errorMessage,
      variant: "destructive",
    });
  };

  const login = async (provider: 'github' | 'google' | 'email', credentials?: { email: string; password: string }) => {
    setLoading(true);
    
    try {
      if (provider === 'github') {
        const githubProvider = new GithubAuthProvider();
        try {
          await signInWithPopup(auth, githubProvider);
        } catch (error: any) {
          if (error.code === 'auth/account-exists-with-different-credential') {
            const email = error.customData?.email;
            if (email) {
              const providers = await fetchSignInMethodsForEmail(auth, email);
              
              if (providers && providers[0] === 'google.com') {
                const googleProvider = new GoogleAuthProvider();
                googleProvider.setCustomParameters({ login_hint: email });
                await signInWithPopup(auth, googleProvider);
              }
            } else {
              throw error;
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
    } catch (error: any) {
      handleAuthError(error);
    } finally {
      setLoading(false);
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
    } catch (error: any) {
      handleAuthError(error);
    } finally {
      setLoading(false);
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
    } catch (error: any) {
      handleAuthError(error);
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

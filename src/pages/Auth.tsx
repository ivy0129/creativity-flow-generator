import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Auth = () => {
  const navigate = useNavigate();
  const { login, register, resetPassword, loading } = useAuth();
  const { language } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isResetting, setIsResetting] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login('email', { email, password });
    navigate('/');
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      await resetPassword(email);
      setIsResetting(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    await register({ email, password, name });
    navigate('/');
  };

  const handleGoogleLogin = async () => {
    await login('google');
    navigate('/');
  };

  const handleGithubLogin = async () => {
    await login('github');
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background hero-gradient">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <Card className="p-6">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">
                  {language === 'en' ? 'Login' : '登录'}
                </TabsTrigger>
                <TabsTrigger value="register">
                  {language === 'en' ? 'Register' : '注册'}
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                {isResetting ? (
                  <form onSubmit={handleResetPassword} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="reset-email">
                        {language === 'en' ? 'Email' : '邮箱'}
                      </Label>
                      <Input
                        id="reset-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        type="submit" 
                        className="flex-1 gradient-bg text-white"
                        disabled={loading || !email}
                      >
                        {loading 
                          ? (language === 'en' ? 'Sending...' : '发送中...')
                          : (language === 'en' ? 'Send Reset Email' : '发送重置邮件')
                        }
                      </Button>
                      <Button 
                        type="button"
                        variant="outline"
                        onClick={() => setIsResetting(false)}
                      >
                        {language === 'en' ? 'Back' : '返回'}
                      </Button>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">
                        {language === 'en' ? 'Email' : '邮箱'}
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="password">
                          {language === 'en' ? 'Password' : '密码'}
                        </Label>
                        <Button
                          type="button"
                          variant="link"
                          className="px-0 text-sm"
                          onClick={() => setIsResetting(true)}
                        >
                          {language === 'en' ? 'Forgot Password?' : '忘记密码？'}
                        </Button>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full gradient-bg text-white"
                      disabled={loading}
                    >
                      {loading 
                        ? (language === 'en' ? 'Logging in...' : '登录中...')
                        : (language === 'en' ? 'Login' : '登录')
                      }
                    </Button>
                  </form>
                )}
                
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      {language === 'en' ? 'Or continue with' : '或使用以下方式'}
                    </span>
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleGoogleLogin}
                  disabled={loading}
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  {language === 'en' ? 'Continue with Google' : '使用 Google 账号登录'}
                </Button>

                <Button 
                  variant="outline" 
                  className="w-full mt-2"
                  onClick={handleGithubLogin}
                  disabled={loading}
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385c.6.105.825-.255.825-.57c0-.285-.015-1.23-.015-2.235c-3.015.555-3.795-.735-4.035-1.41c-.135-.345-.72-1.41-1.23-1.695c-.42-.225-1.02-.78-.015-.795c.945-.015 1.62.87 1.845 1.23c1.08 1.815 2.805 1.305 3.495.99c.105-.78.42-1.305.765-1.605c-2.67-.3-5.46-1.335-5.46-5.925c0-1.305.465-2.385 1.23-3.225c-.12-.3-.54-1.53.12-3.18c0 0 1.005-.315 3.3 1.23c.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23c.66 1.65.24 2.88.12 3.18c.765.84 1.23 1.905 1.23 3.225c0 4.605-2.805 5.625-5.475 5.925c.435.375.81 1.095.81 2.22c0 1.605-.015 2.895-.015 3.3c0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"
                    />
                  </svg>
                  {language === 'en' ? 'Continue with GitHub' : '使用 GitHub 账号登录'}
                </Button>
              </TabsContent>
              
              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      {language === 'en' ? 'Name' : '姓名'}
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-email">
                      {language === 'en' ? 'Email' : '邮箱'}
                    </Label>
                    <Input
                      id="register-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-password">
                      {language === 'en' ? 'Password' : '密码'}
                    </Label>
                    <Input
                      id="register-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full gradient-bg text-white"
                    disabled={loading}
                  >
                    {loading 
                      ? (language === 'en' ? 'Registering...' : '注册中...')
                      : (language === 'en' ? 'Register' : '注册')
                    }
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Auth; 
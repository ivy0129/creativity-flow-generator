import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import { Github, Key, Link, Save, Check } from 'lucide-react';

const DAILY_FREE_LIMIT = 10; // 免费用户每天10次
const DAILY_PREMIUM_LIMIT = 100; // 高级用户每天100次
const PREMIUM_PRICE = 20; // 高级账户每月20美元

const Settings = () => {
  const { toast } = useToast();
  const { isAuthenticated, user, login } = useAuth();
  const { t, language } = useLanguage();
  const [usageCount, setUsageCount] = useState(0);
  const [usageLimit, setUsageLimit] = useState(DAILY_FREE_LIMIT);
  const [apiKey, setApiKey] = useState('');
  const [savedKey, setSavedKey] = useState(false);
  
  useEffect(() => {
    if (isAuthenticated && user) {
      const today = new Date().toISOString().split('T')[0]; // 格式: YYYY-MM-DD
      const usageKey = `prompt_optimizer_usage_${user.id}_${today}`;
      
      const userUsage = localStorage.getItem(usageKey);
      if (userUsage) {
        setUsageCount(parseInt(userUsage, 10));
      } else {
        setUsageCount(0);
      }
      
      if (user.isPremium) {
        setUsageLimit(DAILY_PREMIUM_LIMIT);
      } else {
        setUsageLimit(DAILY_FREE_LIMIT);
      }
      
      const savedApiKey = localStorage.getItem('together_api_key');
      if (savedApiKey) {
        setApiKey(savedApiKey);
      }
    }
  }, [isAuthenticated, user]);

  const handleUpgrade = () => {
    if (!isAuthenticated) {
      toast({
        title: language === 'en' ? "Please login first" : "请先登录",
        description: language === 'en' ? "You need to login before upgrading to premium" : "您需要先登录才能升级到高级账户",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: language === 'en' ? "Coming Soon" : "即将推出",
      description: language === 'en' ? "Premium upgrade will be available soon" : "高级账户升级功能即将推出",
    });
  };

  const handleGithubConnect = () => {
    if (!isAuthenticated) {
      login('github');
      return;
    }
    
    toast({
      title: language === 'en' ? "GitHub Account" : "GitHub 账号",
      description: language === 'en' ? "Your GitHub account is already connected" : "您的GitHub账号已连接",
    });
  };

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('together_api_key', apiKey.trim());
      setSavedKey(true);
      toast({
        title: language === 'en' ? "API Key Saved" : "API密钥已保存",
        description: language === 'en' ? "Your Together.ai API key has been saved" : "您的Together.ai API密钥已成功保存",
      });
      
      setTimeout(() => {
        setSavedKey(false);
      }, 2000);
    } else {
      toast({
        title: language === 'en' ? "Invalid API Key" : "无效的API密钥",
        description: language === 'en' ? "Please enter a valid API key" : "请输入有效的API密钥",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">{language === 'en' ? "About Us" : "关于我们"}</h1>
        
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">{language === 'en' ? "Our Mission" : "我们的使命"}</h2>
          <p className="text-base text-muted-foreground mb-4">
            {language === 'en' 
              ? "We are dedicated to helping new developers create better AI prompts. Our tool optimizes your requirements into prompts that are better understood by AI systems, improving your development workflow and results."
              : "我们致力于帮助新手开发者创建更好的AI提示词。我们的工具可以将您的需求优化为AI系统更容易理解的提示词，从而改善您的开发工作流程和结果。"}
          </p>
          <p className="text-base text-muted-foreground">
            {language === 'en'
              ? "With our service, you can focus on your ideas and let us handle the prompt engineering, saving you time and improving your AI interactions."
              : "借助我们的服务，您可以专注于您的想法，让我们处理提示词工程，节省您的时间并改善您与AI的互动。"}
          </p>
        </Card>
        
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">{language === 'en' ? "Together.ai API Integration" : "Together.ai API 集成"}</h2>
          <p className="text-base text-muted-foreground mb-4">
            {language === 'en' 
              ? "Enter your Together.ai API key to use their powerful language models for prompt optimization."
              : "输入您的Together.ai API密钥，以使用其强大的语言模型进行提示词优化。"}
          </p>
          
          <div className="flex gap-2 mb-4">
            <Input
              type="password"
              placeholder={language === 'en' ? "Enter Together.ai API Key" : "输入Together.ai API密钥"}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="flex-grow"
            />
            <Button 
              onClick={handleSaveApiKey}
              className="whitespace-nowrap"
            >
              {savedKey ? (
                <Check className="h-4 w-4 mr-1 text-green-500" />
              ) : (
                <Save className="h-4 w-4 mr-1" />
              )}
              {savedKey 
                ? (language === 'en' ? "Saved" : "已保存") 
                : (language === 'en' ? "Save Key" : "保存密钥")}
            </Button>
          </div>
          
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <div className="flex items-center">
              <Key className="h-4 w-4 mr-1" />
              <span>{language === 'en' ? "API keys are stored locally in your browser" : "API密钥仅存储在您的浏览器中"}</span>
            </div>
            <a 
              href="https://www.together.ai/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-primary hover:underline"
            >
              <Link className="h-4 w-4 mr-1" />
              <span>{language === 'en' ? "Get an API key" : "获取API密钥"}</span>
            </a>
          </div>
        </Card>
        
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">{language === 'en' ? "Usage Limits" : "使用限制"}</h2>
          
          <div className="space-y-4">
            {isAuthenticated && (
              <div>
                <p className="text-sm font-medium">{language === 'en' ? "Today's Usage" : "今日已使用次数"}</p>
                <p className="text-2xl font-bold">{usageCount} / {usageLimit}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {user?.isPremium 
                    ? (language === 'en' 
                        ? `As a premium user, you can use the prompt optimization service ${DAILY_PREMIUM_LIMIT} times per day`
                        : `作为高级用户，您每天可以使用${DAILY_PREMIUM_LIMIT}次提示词优化服务`) 
                    : (language === 'en'
                        ? `Free users can use the prompt optimization service ${DAILY_FREE_LIMIT} times per day`
                        : `免费用户每天可以使用${DAILY_FREE_LIMIT}次提示词优化服务`)}
                </p>
              </div>
            )}
            
            <div className="bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 rounded-md p-4">
              <h3 className="font-medium text-purple-800 dark:text-purple-300 mb-2">
                {language === 'en' ? "Resource Limitations" : "资源限制"}
              </h3>
              <p className="text-sm text-purple-700 dark:text-purple-400">
                {language === 'en' 
                  ? `Due to resource limitations, free users can use our service ${DAILY_FREE_LIMIT} times per day. For increased usage (${DAILY_PREMIUM_LIMIT} per day), you can upgrade to a premium account for just $${PREMIUM_PRICE}/month.`
                  : `由于资源限制，免费用户每天可以使用${DAILY_FREE_LIMIT}次提示词优化服务。如果您想使用更多次数（每天${DAILY_PREMIUM_LIMIT}次），可升级到高级账户，每月${PREMIUM_PRICE}美元。`}
              </p>
            </div>
            
            <Separator />
            
            <Button 
              onClick={handleUpgrade}
              className="w-full gradient-bg text-white hover:opacity-90 transition-opacity" 
              disabled={user?.isPremium}
            >
              {user?.isPremium 
                ? (language === 'en' ? "Already Premium" : "已升级到高级账户") 
                : (language === 'en' ? `Upgrade to Premium ($${PREMIUM_PRICE}/month)` : `升级到高级账户（每月${PREMIUM_PRICE}美元）`)}
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">{language === 'en' ? "GitHub Integration" : "GitHub 集成"}</h2>
          <p className="text-base text-muted-foreground mb-4">
            {language === 'en' 
              ? "Connect your GitHub account to sync your prompts and customize your experience."
              : "连接您的GitHub账号，同步您的提示词并自定义您的体验。"}
          </p>
          
          <Button 
            onClick={handleGithubConnect}
            className="w-full flex items-center justify-center gap-2" 
            variant="outline"
          >
            <Github className="h-5 w-5" />
            {isAuthenticated 
              ? (language === 'en' ? "GitHub Connected" : "GitHub 已连接") 
              : (language === 'en' ? "Connect GitHub Account" : "连接 GitHub 账号")}
          </Button>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default Settings;

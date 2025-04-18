
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import { useIsMobile } from '@/hooks/use-mobile';
import { Home, Bookmark, Info, MailCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const DAILY_FREE_LIMIT = 100; // 免费用户每天100次
const DAILY_PREMIUM_LIMIT = Infinity; // 高级用户无限制
const PREMIUM_PRICE = 20; // 高级账户每月20美元

const Settings = () => {
  const { toast } = useToast();
  const { isAuthenticated, user } = useAuth();
  const { t, language } = useLanguage();
  const isMobile = useIsMobile();
  const [usageCount, setUsageCount] = useState(0);
  const [usageLimit, setUsageLimit] = useState(DAILY_FREE_LIMIT);
  
  // 加载使用情况
  useEffect(() => {
    if (isAuthenticated && user) {
      // 获取当前日期作为使用记录的键
      const today = new Date().toISOString().split('T')[0]; // 格式: YYYY-MM-DD
      const usageKey = `prompt_optimizer_usage_${user.id}_${today}`;
      
      const userUsage = localStorage.getItem(usageKey);
      if (userUsage) {
        setUsageCount(parseInt(userUsage, 10));
      } else {
        setUsageCount(0);
      }
      
      // 设置用户限制
      if (user.isPremium) {
        setUsageLimit(DAILY_PREMIUM_LIMIT);
      } else {
        setUsageLimit(DAILY_FREE_LIMIT);
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

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 pb-16 md:pb-8">
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
          <h2 className="text-xl font-semibold mb-4">{language === 'en' ? "Usage Limits" : "使用限制"}</h2>
          
          <div className="space-y-4">
            {isAuthenticated && (
              <div>
                <p className="text-sm font-medium">{language === 'en' ? "Today's Usage" : "今日已使用次数"}</p>
                <p className="text-2xl font-bold">
                  {usageCount} / {usageLimit === Infinity ? (language === 'en' ? "Unlimited" : "无限制") : usageLimit}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {user?.isPremium 
                    ? (language === 'en' 
                        ? `As a premium user, you can use the prompt optimization service without limits`
                        : `作为高级用户，您可以无限制地使用提示词优化服务`) 
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
                  ? `Due to resource limitations, free users can use our service ${DAILY_FREE_LIMIT} times per day. For unlimited usage, you can upgrade to a premium account for just $${PREMIUM_PRICE}/month.`
                  : `由于资源限制，免费用户每天可以使用${DAILY_FREE_LIMIT}次提示词优化服务。如果您想无限制使用，可升级到高级账户，每月${PREMIUM_PRICE}美元。`}
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
        
        {/* New Contact Card */}
        <Card className="p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <MailCheck className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-semibold">
              {language === 'en' ? "Contact Us" : "联系我们"}
            </h2>
          </div>
          <p className="text-base text-muted-foreground mb-2">
            {language === 'en' 
              ? "For bug reports or feedback, please contact us:" 
              : "bug/意见反馈，请联系我们："}
          </p>
          <p className="text-base font-medium">
            ivyhan0129@gmail.com
          </p>
        </Card>
      </main>
      
      {/* 移动端底部导航栏 */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border flex justify-around items-center h-16 shadow-lg z-30">
          <Link to="/" className="flex flex-1 flex-col items-center justify-center h-full text-muted-foreground hover:text-primary">
            <Home className="h-5 w-5 mb-1" />
            <span className="text-xs">{t('home')}</span>
          </Link>
          <Link to="/saved" className="flex flex-1 flex-col items-center justify-center h-full text-muted-foreground hover:text-primary">
            <Bookmark className="h-5 w-5 mb-1" />
            <span className="text-xs">{t('savedPrompts')}</span>
          </Link>
          <Link to="/settings" className="flex flex-1 flex-col items-center justify-center h-full text-primary">
            <Info className="h-5 w-5 mb-1" />
            <span className="text-xs">{language === 'en' ? 'About Us' : '关于我们'}</span>
          </Link>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default Settings;

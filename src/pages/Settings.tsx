
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AlertTriangle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';

const DAILY_FREE_LIMIT = 10; // 免费用户每天10次
const DAILY_PREMIUM_LIMIT = 50; // 付费用户每天50次

const Settings = () => {
  const { toast } = useToast();
  const { isAuthenticated, user } = useAuth();
  const { t } = useLanguage();
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

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">设置</h1>
        
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">每日使用额度</h2>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium">今日已使用次数</p>
              <p className="text-2xl font-bold">{usageCount} / {usageLimit}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {user?.isPremium 
                  ? `作为高级用户，您每天可以使用${DAILY_PREMIUM_LIMIT}次提示词优化服务` 
                  : `免费用户每天可以使用${DAILY_FREE_LIMIT}次提示词优化服务`}
              </p>
            </div>
            
            <Separator />
            
            {usageCount >= usageLimit && (
              <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-md p-4 flex items-start">
                <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mr-3 mt-0.5" />
                <div>
                  <h3 className="font-medium text-yellow-800 dark:text-yellow-300">已达到今日限制</h3>
                  <p className="text-sm text-yellow-700 dark:text-yellow-400 mt-1">
                    您已达到今日免费使用次数限制。请明天再试或升级到高级账户以获取更多使用次数。
                  </p>
                </div>
              </div>
            )}
            
            <Button className="w-full gradient-bg text-white hover:opacity-90 transition-opacity" disabled={user?.isPremium}>
              {user?.isPremium ? "已升级到高级账户" : "升级到高级账户"}
            </Button>
          </div>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default Settings;

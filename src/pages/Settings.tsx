import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import { API_KEY_STORAGE_KEY, getLocalApiKey, saveApiKey, getGlobalApiKey } from '@/utils/siliconflowClient';
import { EyeIcon, EyeOffIcon, ShieldCheck } from 'lucide-react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const DAILY_FREE_LIMIT = 10; // 免费用户每天10次
const DAILY_PREMIUM_LIMIT = 100; // 高级用户每天100次
const PREMIUM_PRICE = 20; // 高级账户每月20美元

const Settings = () => {
  const { toast } = useToast();
  const { isAuthenticated, user } = useAuth();
  const { t, language } = useLanguage();
  const [usageCount, setUsageCount] = useState(0);
  const [usageLimit, setUsageLimit] = useState(DAILY_FREE_LIMIT);
  const [localApiKey, setLocalApiKey] = useState('');
  const [globalApiKey, setGlobalApiKey] = useState('');
  const [showLocalApiKey, setShowLocalApiKey] = useState(false);
  const [showGlobalApiKey, setShowGlobalApiKey] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [adminCheckComplete, setAdminCheckComplete] = useState(false);
  
  // 加载使用情况和API密钥
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

      // 加载本地API密钥
      const savedLocalApiKey = getLocalApiKey();
      if (savedLocalApiKey) {
        setLocalApiKey(savedLocalApiKey);
      }

      // 检查用户是否为管理员
      checkIfAdmin();
    }
  }, [isAuthenticated, user]);

  // 检查用户是否为管理员
  const checkIfAdmin = async () => {
    if (!isAuthenticated || !user) {
      setAdminCheckComplete(true);
      return;
    }
    
    try {
      const adminDoc = await getDoc(doc(db, "admins", user.id));
      const adminStatus = adminDoc.exists();
      setIsAdmin(adminStatus);
      
      // 如果用户是管理员，加载全局API密钥
      if (adminStatus) {
        loadGlobalApiKey();
      }
      
      setAdminCheckComplete(true);
    } catch (error) {
      console.error("检查管理员状态时出错:", error);
      setAdminCheckComplete(true);
    }
  };

  // 加载全局API密钥
  const loadGlobalApiKey = async () => {
    if (!isAdmin) return;
    
    try {
      const key = await getGlobalApiKey();
      setGlobalApiKey(key);
    } catch (error) {
      console.error("加载全局API密钥时出错:", error);
    }
  };

  const handleSaveLocalApiKey = () => {
    saveApiKey(localApiKey.trim());
    toast({
      title: language === 'en' ? "API Key Saved" : "API密钥已保存",
      description: language === 'en' 
        ? "Your SiliconFlow API key has been saved securely in this browser" 
        : "您的硅基流动API密钥已安全保存在此浏览器中",
    });
  };

  const handleSaveGlobalApiKey = async () => {
    if (!isAdmin) {
      toast({
        title: language === 'en' ? "Permission Denied" : "权限不足",
        description: language === 'en' 
          ? "You need admin permissions to set the global API key" 
          : "您需要管理员权限来设置全局API密钥",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    try {
      await setDoc(doc(db, "appSettings", "apiKeys"), {
        siliconflowApiKey: globalApiKey.trim(),
        updatedAt: new Date(),
        updatedBy: user?.id
      });
      
      toast({
        title: language === 'en' ? "Global API Key Saved" : "全局API密钥已保存",
        description: language === 'en' 
          ? "The global SiliconFlow API key has been saved successfully" 
          : "全局硅基流动API密钥已成功保存",
      });
    } catch (error) {
      console.error("保存全局API密钥时出错:", error);
      toast({
        title: language === 'en' ? "Save Failed" : "保存失败",
        description: language === 'en' 
          ? "Failed to save the global API key" 
          : "保存全局API密钥失败",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleShowLocalApiKey = () => {
    setShowLocalApiKey(!showLocalApiKey);
  };

  const toggleShowGlobalApiKey = () => {
    setShowGlobalApiKey(!showGlobalApiKey);
  };

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
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">{language === 'en' ? "Settings" : "设置"}</h1>
        
        {isAuthenticated && adminCheckComplete && (
          <div className="mb-6">
            <div className={`flex items-center p-4 rounded-md ${isAdmin ? 'bg-purple-50 dark:bg-purple-950' : 'bg-gray-50 dark:bg-gray-800'}`}>
              <div className={`p-2 rounded-full mr-3 ${isAdmin ? 'bg-purple-100 dark:bg-purple-900' : 'bg-gray-100 dark:bg-gray-700'}`}>
                <ShieldCheck className={`h-5 w-5 ${isAdmin ? 'text-purple-700 dark:text-purple-300' : 'text-gray-500 dark:text-gray-400'}`} />
              </div>
              <div>
                <p className="font-medium">
                  {language === 'en' ? "Account Status: " : "账户状态："} 
                  <span className={isAdmin ? 'text-purple-700 dark:text-purple-300' : 'text-gray-600 dark:text-gray-300'}>
                    {isAdmin 
                      ? (language === 'en' ? "Administrator" : "管理员") 
                      : (language === 'en' ? "Regular User" : "普通用户")}
                  </span>
                </p>
                <p className="text-sm text-muted-foreground">
                  {isAdmin 
                    ? (language === 'en' ? "You have administrator privileges and can set global API keys." : "您拥有管理员权限，可以设置全局API密钥。") 
                    : (language === 'en' ? "You have standard user permissions." : "您拥有标准用户权限。")}
                </p>
              </div>
            </div>
          </div>
        )}
        
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {language === 'en' ? "API Configuration" : "API配置"}
          </h2>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="localApiKey" className="text-sm font-medium">
                {language === 'en' ? "Your Local SiliconFlow API Key" : "您的本地硅基流动API密钥"}
              </label>
              <div className="flex">
                <div className="relative flex-1">
                  <Input
                    id="localApiKey"
                    type={showLocalApiKey ? "text" : "password"}
                    value={localApiKey}
                    onChange={(e) => setLocalApiKey(e.target.value)}
                    placeholder={language === 'en' ? "Enter your API key" : "输入您的API密钥"}
                    className="pr-10"
                  />
                  <button 
                    type="button"
                    onClick={toggleShowLocalApiKey}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    {showLocalApiKey ? (
                      <EyeOffIcon className="h-4 w-4" />
                    ) : (
                      <EyeIcon className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <Button 
                  onClick={handleSaveLocalApiKey} 
                  className="ml-2"
                >
                  {language === 'en' ? "Save" : "保存"}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                {language === 'en' 
                  ? "Your API key is stored securely in your browser's local storage. It is never sent to our servers."
                  : "您的API密钥安全地存储在浏览器的本地存储中，从不发送到我们的服务器。"}
              </p>
            </div>
            
            {isAdmin && (
              <div className="space-y-2 pt-4 border-t">
                <label htmlFor="globalApiKey" className="text-sm font-medium flex items-center">
                  <span className="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-purple-900 dark:text-purple-300">
                    {language === 'en' ? "Admin" : "管理员"}
                  </span>
                  {language === 'en' ? "Global SiliconFlow API Key" : "全局硅基流动API密钥"}
                </label>
                <div className="flex">
                  <div className="relative flex-1">
                    <Input
                      id="globalApiKey"
                      type={showGlobalApiKey ? "text" : "password"}
                      value={globalApiKey}
                      onChange={(e) => setGlobalApiKey(e.target.value)}
                      placeholder={language === 'en' ? "Enter global API key" : "输入全局API密钥"}
                      className="pr-10"
                    />
                    <button 
                      type="button"
                      onClick={toggleShowGlobalApiKey}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    >
                      {showGlobalApiKey ? (
                        <EyeOffIcon className="h-4 w-4" />
                      ) : (
                        <EyeIcon className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  <Button 
                    onClick={handleSaveGlobalApiKey} 
                    className="ml-2"
                    disabled={loading}
                  >
                    {loading 
                      ? (language === 'en' ? "Saving..." : "保存中...") 
                      : (language === 'en' ? "Save Global" : "保存全局密钥")}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  {language === 'en' 
                    ? "This global API key will be used for all users who don't have their own API key. It is stored securely in Firebase."
                    : "此全局API密钥将用于所有没有设置自己API密钥的用户。它安全地存储在Firebase中。"}
                </p>
                <p className="text-xs font-medium text-amber-600 dark:text-amber-400 mt-1">
                  {language === 'en'
                    ? "Note: The global API key usage will count against your API provider's quota."
                    : "注意：全局API密钥的使用将计入您的API提供商配额。"}
                </p>
              </div>
            )}
          </div>
        </Card>
        
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
      </main>
      
      <Footer />
    </div>
  );
};

export default Settings;

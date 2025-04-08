
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, Key } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/useLanguage';
import { setTemporarySiliconFlowApiKey, hasSiliconFlowApiKey } from '@/api/siliconFlowApi';

const ApiKeyInput: React.FC = () => {
  const [apiKey, setApiKey] = useState<string>('');
  const [isKeySet, setIsKeySet] = useState<boolean>(false);
  const { toast } = useToast();
  const { language } = useLanguage();
  
  useEffect(() => {
    // 检查是否已经设置了API密钥
    const hasKey = hasSiliconFlowApiKey();
    setIsKeySet(hasKey);
  }, []);
  
  const handleSaveApiKey = () => {
    if (!apiKey.trim()) {
      toast({
        title: language === 'zh' ? 'API密钥不能为空' : 'API key cannot be empty',
        variant: "destructive",
      });
      return;
    }
    
    // 设置临时API密钥
    setTemporarySiliconFlowApiKey(apiKey.trim());
    setIsKeySet(true);
    
    toast({
      title: language === 'zh' ? 'API密钥已保存' : 'API key saved',
      description: language === 'zh' ? 'API密钥已临时保存，仅在当前会话有效' : 'API key temporarily saved for this session only',
      variant: "default",
    });
  };
  
  return (
    <Card className="p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4">
        {language === 'zh' ? 'SiliconFlow API密钥设置' : 'SiliconFlow API Key Setup'}
      </h3>
      
      <Alert className="mb-4 bg-blue-50 border-blue-300 dark:bg-blue-900/30 dark:border-blue-800">
        <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        <AlertDescription className="ml-2 text-blue-700 dark:text-blue-300">
          {language === 'zh' 
            ? '需要设置SiliconFlow API密钥才能使用API服务。此密钥仅临时保存在浏览器中，刷新页面后需要重新输入。在生产环境中，应在服务器端安全地设置API密钥。'
            : 'SiliconFlow API key is required to use the API service. This key is temporarily stored in your browser only and will be lost after page refresh. In production, API keys should be securely set on the server side.'}
        </AlertDescription>
      </Alert>
      
      <div className="flex gap-2">
        <div className="flex-grow">
          <Input
            type="password"
            placeholder={language === 'zh' ? "输入您的SiliconFlow API密钥" : "Enter your SiliconFlow API key"}
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="w-full"
          />
        </div>
        <Button onClick={handleSaveApiKey} disabled={!apiKey.trim()}>
          <Key className="h-4 w-4 mr-2" />
          {language === 'zh' ? '保存密钥' : 'Save Key'}
        </Button>
      </div>
      
      {isKeySet && (
        <p className="text-sm text-green-600 dark:text-green-400 mt-2 flex items-center">
          <Info className="h-4 w-4 mr-1" />
          {language === 'zh' ? 'API密钥已设置' : 'API key is set'}
        </p>
      )}
      
      <div className="mt-4 text-xs text-gray-500">
        <a 
          href="https://cloud.siliconflow.cn/account/api-keys" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline flex items-center max-w-fit"
        >
          {language === 'zh' ? '获取SiliconFlow API密钥 →' : 'Get SiliconFlow API key →'}
        </a>
      </div>
    </Card>
  );
};

export default ApiKeyInput;

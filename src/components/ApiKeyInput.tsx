
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, Lock, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/useLanguage';
import { hasSiliconFlowApiKey, saveSiliconFlowApiKey } from '@/api/siliconFlowApi';

const ApiKeyInput: React.FC = () => {
  const [apiKey, setApiKey] = useState('');
  const [isKeySet, setIsKeySet] = useState(false);
  const { toast } = useToast();
  const { language } = useLanguage();

  useEffect(() => {
    setIsKeySet(hasSiliconFlowApiKey());
  }, []);

  const handleSaveApiKey = () => {
    if (!apiKey.trim()) {
      toast({
        title: language === 'zh' ? "API密钥不能为空" : "API key cannot be empty",
        description: language === 'zh' ? "请输入有效的SiliconFlow API密钥" : "Please enter a valid SiliconFlow API key",
        variant: "destructive",
      });
      return;
    }

    saveSiliconFlowApiKey(apiKey);
    setIsKeySet(true);
    toast({
      title: language === 'zh' ? "API密钥已保存" : "API key saved",
      description: language === 'zh' ? "您现在可以使用提示词优化功能" : "You can now use the prompt optimization feature",
    });
  };

  if (isKeySet) {
    return (
      <Alert className="mb-4 bg-green-50 border-green-300 dark:bg-green-900/30 dark:border-green-800">
        <Info className="h-4 w-4 text-green-600 dark:text-green-400" />
        <AlertDescription className="ml-2 text-green-700 dark:text-green-300">
          {language === 'zh' 
            ? 'API密钥已设置，可以使用提示词优化功能。' 
            : 'API key is set. You can use the prompt optimization feature.'}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className="mb-6 shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lock className="h-5 w-5" />
          {language === 'zh' ? '设置SiliconFlow API密钥' : 'Set SiliconFlow API Key'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Alert className="mb-4 bg-amber-50 border-amber-300 dark:bg-amber-900/30 dark:border-amber-800">
          <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          <AlertDescription className="ml-2 text-amber-700 dark:text-amber-300">
            {language === 'zh' 
              ? '需要设置SiliconFlow API密钥才能使用提示词优化功能。API密钥仅保存在您的浏览器中，不会发送到我们的服务器。' 
              : 'SiliconFlow API key is required to use the prompt optimization feature. The API key is only saved in your browser and not sent to our server.'}
          </AlertDescription>
        </Alert>
        
        <div className="space-y-2">
          <Label htmlFor="api-key">
            {language === 'zh' ? 'SiliconFlow API密钥' : 'SiliconFlow API Key'}
          </Label>
          <Input
            id="api-key"
            type="password"
            placeholder={language === 'zh' ? '输入您的API密钥' : 'Enter your API key'}
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="font-mono"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="default" className="w-full" onClick={handleSaveApiKey}>
          {language === 'zh' ? '保存API密钥' : 'Save API Key'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ApiKeyInput;

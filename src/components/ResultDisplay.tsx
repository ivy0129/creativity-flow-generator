
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CopyIcon, ThumbsUpIcon, ThumbsDownIcon, SaveIcon, AlertTriangle, Loader2, Info, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/useLanguage';

interface ResultDisplayProps {
  content: string;
  isVisible: boolean;
  isLoading: boolean;
  apiErrorMessage?: string | null;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({
  content,
  isVisible,
  isLoading,
  apiErrorMessage
}) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const { language } = useLanguage();
  
  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center py-16 animate-fade-in">
        <div className="flex flex-col items-center">
          <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
          <p className="text-muted-foreground">
            {language === 'zh' ? '正在优化提示词...' : 'Optimizing your prompt...'}
          </p>
        </div>
      </div>
    );
  }
  
  if (!isVisible) {
    return null;
  }
  
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    toast({
      title: language === 'zh' ? '已复制到剪贴板' : 'Copied to clipboard',
      description: language === 'zh' ? '优化的提示词已复制到剪贴板' : 'The optimized prompt has been copied to your clipboard',
      variant: "default",
    });
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  
  const handleFeedback = (type: 'positive' | 'negative') => {
    toast({
      title: type === 'positive' 
        ? (language === 'zh' ? '感谢您的反馈！' : 'Thank you for your feedback!') 
        : (language === 'zh' ? '感谢您的反馈' : 'Thank you for your feedback'),
      description: type === 'positive'
        ? (language === 'zh' ? '我们很高兴优化的提示词对您有帮助' : 'We are glad that the optimized prompt was helpful')
        : (language === 'zh' ? '我们将努力改进优化算法' : 'We will work to improve our optimization algorithm'),
      variant: type === 'positive' ? "default" : "default",
    });
  };
  
  // 检查内容是否包含"注意"或"API服务不可用"等关键词
  const isLocallyGenerated = content.includes("[注意:") || content.includes("API服务");
  
  return (
    <Card className="w-full p-6 mt-8 shadow-lg animate-fade-in">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">
            {language === 'zh' ? '生成的内容' : 'Generated Content'}
          </h3>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={() => handleFeedback('positive')}>
              <ThumbsUpIcon className="h-4 w-4 mr-1" />
              {language === 'zh' ? '好的' : 'Good'}
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleFeedback('negative')}>
              <ThumbsDownIcon className="h-4 w-4 mr-1" />
              {language === 'zh' ? '不好' : 'Not good'}
            </Button>
            <Button variant="outline" size="sm" onClick={handleCopy}>
              <CopyIcon className="h-4 w-4 mr-1" />
              {copied 
                ? (language === 'zh' ? '已复制' : 'Copied') 
                : (language === 'zh' ? '复制' : 'Copy')
              }
            </Button>
            <Button variant="outline" size="sm">
              <SaveIcon className="h-4 w-4 mr-1" />
              {language === 'zh' ? '保存' : 'Save'}
            </Button>
          </div>
        </div>
        
        {isLocallyGenerated && (
          <Alert className="mb-4 bg-amber-50 border-amber-300 dark:bg-amber-900/30 dark:border-amber-800">
            <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            <AlertDescription className="ml-2 text-amber-700 dark:text-amber-300">
              {language === 'zh' 
                ? 'API服务暂时不可用，展示的是本地生成的相关内容示例'
                : 'API service is temporarily unavailable. Showing locally generated example content.'}
            </AlertDescription>
          </Alert>
        )}
        
        {apiErrorMessage && (
          <Alert className="mb-4 bg-amber-50 border-amber-300 dark:bg-amber-900/30 dark:border-amber-800">
            <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            <AlertDescription className="break-words ml-2 text-amber-700 dark:text-amber-300">
              <strong>{language === 'zh' ? '错误详情: ' : 'Error details: '}</strong>
              {apiErrorMessage}
            </AlertDescription>
          </Alert>
        )}
        
        {/* 添加API请求失败调试信息 */}
        {apiErrorMessage && apiErrorMessage.includes("API密钥未设置") && (
          <Alert className="mb-4 bg-blue-50 border-blue-300 dark:bg-blue-900/30 dark:border-blue-800">
            <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <AlertDescription className="ml-2 text-blue-700 dark:text-blue-300">
              {language === 'zh' 
                ? '可能原因: 服务器端未正确配置SiliconFlow API密钥。请确保服务器环境变量中设置了有效的API密钥。'
                : 'Possible cause: SiliconFlow API key is not properly configured on the server. Please ensure a valid API key is set in the server environment variables.'}
              <div className="mt-2">
                <a 
                  href="https://cloud.siliconflow.cn/account/api-keys" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-600 hover:underline"
                >
                  {language === 'zh' ? '获取SiliconFlow API密钥' : 'Get SiliconFlow API key'}
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
            </AlertDescription>
          </Alert>
        )}
        
        <div className="bg-muted/50 border p-4 rounded-md whitespace-pre-wrap text-sm overflow-auto max-h-[60vh]">
          {content}
        </div>
      </div>
    </Card>
  );
};

export default ResultDisplay;

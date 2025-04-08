
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CopyIcon, ThumbsUpIcon, ThumbsDownIcon, SaveIcon, AlertTriangle, Loader2 } from 'lucide-react';
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
      variant: "success",
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
      variant: type === 'positive' ? "success" : "default",
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
          <Alert variant="warning" className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              {language === 'zh' 
                ? 'API服务暂时不可用，展示的是本地生成的示例内容'
                : 'API service is temporarily unavailable. Showing locally generated example content.'}
              {apiErrorMessage && ` (${apiErrorMessage})`}
            </AlertDescription>
          </Alert>
        )}
        
        <div className="bg-card border p-4 rounded-md whitespace-pre-wrap text-sm">
          {content}
        </div>
      </div>
    </Card>
  );
};

export default ResultDisplay;

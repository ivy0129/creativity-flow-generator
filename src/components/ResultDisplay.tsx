
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check, ThumbsUp, ThumbsDown, Save, Info } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useFirestorePrompts } from '@/hooks/useFirestorePrompts';
import { usePromptGenerator } from '@/hooks/usePromptGenerator';
import { useLanguage } from '@/hooks/useLanguage';
import { Link } from 'react-router-dom';
import { Skeleton } from "@/components/ui/skeleton";

interface ResultDisplayProps {
  content: string;
  isVisible: boolean;
  isLoading?: boolean;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ content, isVisible, isLoading = false }) => {
  const { toast } = useToast();
  const { savePrompt } = useFirestorePrompts();
  const { usageCount, usageLimit } = usePromptGenerator();
  const { language } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [feedbackGiven, setFeedbackGiven] = useState(false);
  const [saved, setSaved] = useState(false);
  
  // 如果在加载中，显示加载骨架屏
  if (isLoading) {
    return (
      <Card className="w-full mt-8 p-6 shadow-lg prompt-shadow animate-fade-in">
        <div className="flex justify-between items-center mb-4">
          <Skeleton className="h-8 w-40" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
          </div>
        </div>
        <Skeleton className="h-48 w-full" />
      </Card>
    );
  }
  
  // 如果内容不可见或为空，不显示任何内容
  if (!isVisible || !content) return null;
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    toast({
      title: language === 'zh' ? "已复制到剪贴板" : "Copied to clipboard",
      description: language === 'zh' ? "您现在可以将内容粘贴到任何地方" : "You can now paste the content anywhere",
    });
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const giveFeedback = (isPositive: boolean) => {
    toast({
      title: isPositive 
        ? (language === 'zh' ? "感谢您的反馈！" : "Thanks for your feedback!") 
        : (language === 'zh' ? "感谢您的反馈" : "Thanks for your feedback"),
      description: isPositive 
        ? (language === 'zh' ? "我们很高兴您喜欢这个内容" : "We're glad you liked this content") 
        : (language === 'zh' ? "我们会努力改进生成的内容" : "We'll work to improve the generated content"),
    });
    setFeedbackGiven(true);
  };

  const handleSave = () => {
    savePrompt(content);
    setSaved(true);
    toast({
      title: language === 'zh' ? "提示词已保存" : "Prompt saved",
      description: language === 'zh' ? "您可以在'已保存的提示词'页面查看" : "You can view it in the 'Saved Prompts' page",
    });
    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  return (
    <Card className="w-full mt-8 p-6 shadow-lg prompt-shadow animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold gradient-text">
          {language === 'zh' ? "生成的内容" : "Generated Content"}
        </h3>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className={`transition-colors ${feedbackGiven ? 'text-muted-foreground' : ''}`}
            onClick={() => giveFeedback(true)}
            disabled={feedbackGiven}
          >
            <ThumbsUp className="h-4 w-4 mr-1" />
            <span className="sr-only md:not-sr-only md:inline">
              {language === 'zh' ? "好的" : "Good"}
            </span>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className={`transition-colors ${feedbackGiven ? 'text-muted-foreground' : ''}`}
            onClick={() => giveFeedback(false)}
            disabled={feedbackGiven}
          >
            <ThumbsDown className="h-4 w-4 mr-1" />
            <span className="sr-only md:not-sr-only md:inline">
              {language === 'zh' ? "不好" : "Not good"}
            </span>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="transition-colors"
            onClick={copyToClipboard}
          >
            {copied ? (
              <Check className="h-4 w-4 mr-1 text-green-500" />
            ) : (
              <Copy className="h-4 w-4 mr-1" />
            )}
            <span className="sr-only md:not-sr-only md:inline">
              {copied 
                ? (language === 'zh' ? "已复制" : "Copied") 
                : (language === 'zh' ? "复制" : "Copy")
              }
            </span>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="transition-colors"
            onClick={handleSave}
            disabled={saved}
          >
            {saved ? (
              <Check className="h-4 w-4 mr-1 text-green-500" />
            ) : (
              <Save className="h-4 w-4 mr-1" />
            )}
            <span className="sr-only md:not-sr-only md:inline">
              {saved 
                ? (language === 'zh' ? "已保存" : "Saved") 
                : (language === 'zh' ? "保存" : "Save")
              }
            </span>
          </Button>
        </div>
      </div>

      {usageCount > 0 && (
        <div className="mb-4 text-sm text-muted-foreground flex items-center justify-between bg-muted rounded-md p-2">
          <div className="flex items-center">
            <Info className="h-4 w-4 mr-2" />
            <span>
              {language === 'zh' 
                ? `使用次数: ${usageCount} / ${usageLimit}` 
                : `Usage: ${usageCount} / ${usageLimit}`
              }
            </span>
          </div>
          <Link to="/settings" className="text-primary hover:underline">
            {language === 'zh' ? "查看详情" : "View details"}
          </Link>
        </div>
      )}
      
      <div className="bg-muted rounded-md p-4 whitespace-pre-wrap">
        {content}
      </div>
    </Card>
  );
};

export default ResultDisplay;

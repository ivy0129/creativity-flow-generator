
import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check, ThumbsUp, ThumbsDown, Save, Info, Key } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useSavedPrompts } from '@/hooks/useSavedPrompts';
import { usePromptGenerator } from '@/hooks/usePromptGenerator';
import { Link } from 'react-router-dom';

interface ResultDisplayProps {
  content: string;
  isVisible: boolean;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ content, isVisible }) => {
  const { toast } = useToast();
  const { savePrompt } = useSavedPrompts();
  const { usageCount, usageLimit } = usePromptGenerator();
  const [copied, setCopied] = useState(false);
  const [feedbackGiven, setFeedbackGiven] = useState(false);
  const [saved, setSaved] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);
  
  useEffect(() => {
    // 检查是否已设置 API 密钥
    const apiKey = localStorage.getItem('together_api_key');
    setHasApiKey(!!apiKey);
  }, []);
  
  if (!isVisible || !content) return null;
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    toast({
      title: "已复制到剪贴板",
      description: "您现在可以将内容粘贴到任何地方",
    });
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const giveFeedback = (isPositive: boolean) => {
    toast({
      title: isPositive ? "感谢您的反馈！" : "感谢您的反馈",
      description: isPositive 
        ? "我们很高兴您喜欢这个内容" 
        : "我们会努力改进生成的内容",
    });
    setFeedbackGiven(true);
  };

  const handleSave = () => {
    savePrompt(content);
    setSaved(true);
    toast({
      title: "提示词已保存",
      description: "您可以在'已保存的提示词'页面查看",
    });
    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  return (
    <Card className="w-full mt-8 p-6 shadow-lg prompt-shadow animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold gradient-text">生成的内容</h3>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className={`transition-colors ${feedbackGiven ? 'text-muted-foreground' : ''}`}
            onClick={() => giveFeedback(true)}
            disabled={feedbackGiven}
          >
            <ThumbsUp className="h-4 w-4 mr-1" />
            <span className="sr-only md:not-sr-only md:inline">好的</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className={`transition-colors ${feedbackGiven ? 'text-muted-foreground' : ''}`}
            onClick={() => giveFeedback(false)}
            disabled={feedbackGiven}
          >
            <ThumbsDown className="h-4 w-4 mr-1" />
            <span className="sr-only md:not-sr-only md:inline">不好</span>
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
              {copied ? "已复制" : "复制"}
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
              {saved ? "已保存" : "保存"}
            </span>
          </Button>
        </div>
      </div>

      {!hasApiKey && (
        <div className="mb-4 text-sm text-amber-600 dark:text-amber-400 flex items-center justify-between bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/50 rounded-md p-2">
          <div className="flex items-center">
            <Key className="h-4 w-4 mr-2" />
            <span>请在设置页面配置您的 Together.ai API 密钥以获得更好的结果</span>
          </div>
          <Link to="/settings" className="text-primary hover:underline whitespace-nowrap ml-2">
            前往设置
          </Link>
        </div>
      )}
      
      {usageCount > 0 && (
        <div className="mb-4 text-sm text-muted-foreground flex items-center justify-between bg-muted rounded-md p-2">
          <div className="flex items-center">
            <Info className="h-4 w-4 mr-2" />
            <span>使用次数: {usageCount} / {usageLimit}</span>
          </div>
          <Link to="/settings" className="text-primary hover:underline">
            查看详情
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

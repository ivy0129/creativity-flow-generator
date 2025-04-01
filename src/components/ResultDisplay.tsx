
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface ResultDisplayProps {
  content: string;
  isVisible: boolean;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ content, isVisible }) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [feedbackGiven, setFeedbackGiven] = useState(false);
  
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
        </div>
      </div>
      <div className="bg-muted rounded-md p-4 whitespace-pre-wrap">
        {content}
      </div>
    </Card>
  );
};

export default ResultDisplay;

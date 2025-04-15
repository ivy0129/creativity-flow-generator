
import React, { useState } from 'react';
import { Copy, CheckCircle, Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { AIPromptTutorial } from '@/data/ai-prompt-tutorials';

interface PromptCardProps {
  tutorial: AIPromptTutorial;
  language: 'en' | 'zh';
  translatedPrompt: string | null;
  onTranslate: () => void;
}

const PromptCard: React.FC<PromptCardProps> = ({ 
  tutorial, 
  language, 
  translatedPrompt, 
  onTranslate 
}) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  // Determine if the current prompt is in English by checking for Chinese characters
  const currentPrompt = translatedPrompt || tutorial.prompt;
  const isChinese = /[\u4E00-\u9FFF]/.test(currentPrompt);
  
  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(currentPrompt);
    setCopied(true);
    toast({
      title: language === 'en' ? "Copied to clipboard" : "已复制到剪贴板",
      description: language === 'en' ? "Prompt has been copied to your clipboard" : "提示词已复制到您的剪贴板",
    });
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="bg-muted p-4 rounded-md whitespace-pre-wrap text-sm">
          {currentPrompt}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 pt-0 pb-4 px-4">
        <Button 
          variant="outline" 
          size="sm"
          className="text-xs gap-1"
          onClick={onTranslate}
        >
          <Languages className="h-3 w-3" />
          {translatedPrompt 
            ? (language === 'en' ? '显示原文' : 'Show Original') 
            : (isChinese 
              ? (language === 'en' ? '翻译为英文' : 'Translate to English')
              : (language === 'en' ? '翻译为中文' : 'Translate to Chinese')
            )
          }
        </Button>
        <Button 
          variant="secondary" 
          size="sm"
          className="text-xs gap-1"
          onClick={handleCopyPrompt}
        >
          {copied ? (
            <>
              <CheckCircle className="h-3 w-3" />
              {language === 'en' ? 'Copied!' : '已复制！'}
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
              {language === 'en' ? 'Copy to clipboard' : '复制到剪贴板'}
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PromptCard;

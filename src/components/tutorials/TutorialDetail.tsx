
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Book, ExternalLink } from 'lucide-react';
import { AIPromptTutorial } from '@/data/ai-prompt-tutorials';
import { useLanguage } from '@/hooks/useLanguage';
import { useToast } from '@/hooks/use-toast';
import PromptCard from './PromptCard';
import TutorialKeyPoints from './TutorialKeyPoints';

interface TutorialDetailProps {
  tutorial: AIPromptTutorial;
}

const TutorialDetail: React.FC<TutorialDetailProps> = ({ tutorial }) => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [translatedPrompt, setTranslatedPrompt] = useState<string | null>(null);
  
  useEffect(() => {
    setTranslatedPrompt(null); // Reset translated prompt when article changes
  }, [tutorial.id]);

  const translatePrompt = async () => {
    try {
      // If already translated, switch back to original
      if (translatedPrompt) {
        setTranslatedPrompt(null);
        return;
      }

      // Determine if the current prompt is in English or Chinese
      const isChinese = /[\u4E00-\u9FFF]/.test(tutorial.prompt);
      
      // Show toast to indicate translation is in progress
      toast({
        title: language === 'en' ? "Translating..." : "翻译中...",
        description: language === 'en' ? 
          `Translating to ${isChinese ? 'English' : 'Chinese'}` : 
          `正在翻译为${isChinese ? '英文' : '中文'}`,
      });
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Use the appropriate predefined translation if available
      let translated = '';
      
      if (isChinese) {
        // Chinese to English translation
        translated = tutorial.promptEn || tutorial.prompt;
      } else {
        // English to Chinese translation
        translated = tutorial.promptZh || tutorial.prompt;
      }
      
      setTranslatedPrompt(translated);
      
      // Show success toast
      toast({
        title: language === 'en' ? "Translation complete" : "翻译完成",
        description: language === 'en' ? 
          `Prompt translated to ${isChinese ? 'English' : 'Chinese'}` : 
          `提示词已翻译为${isChinese ? '英文' : '中文'}`,
      });
    } catch (error) {
      console.error("Translation error:", error);
      toast({
        title: language === 'en' ? "Translation error" : "翻译错误",
        description: language === 'en' ? "Failed to translate the prompt" : "无法翻译提示词",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link to="/tutorials" className="text-primary hover:underline flex items-center gap-1">
          <Book className="h-4 w-4" />
          {language === 'en' ? 'Back to all tutorials' : '返回所有教程'}
        </Link>
      </div>
      
      <article className="prose prose-slate dark:prose-invert max-w-none">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">{tutorial.title[language]}</h1>
        
        {tutorial.source && (
          <div className="mb-6">
            <a 
              href={tutorial.source} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline flex items-center gap-1"
            >
              {language === 'en' ? 'Original source' : '原文链接'} <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        )}
        
        <div className="flex flex-wrap gap-2 mb-6">
          {tutorial.tags.map(tag => (
            <span key={tag} className="text-xs bg-muted px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        
        {/* 文章对应的提示词 */}
        <div className="mb-8">
          <h2 className="text-xl font-medium mb-2">
            {language === 'en' ? 'Prompt:' : '提示词：'}
          </h2>
          <PromptCard 
            tutorial={tutorial}
            language={language}
            translatedPrompt={translatedPrompt}
            onTranslate={translatePrompt}
          />
        </div>

        {/* 注意事项 */}
        {tutorial.keyPoints && tutorial.keyPoints[language] && (
          <TutorialKeyPoints 
            keyPoints={tutorial.keyPoints[language]} 
            language={language} 
          />
        )}
        
        <h2 className="text-xl font-medium mb-4">
          {language === 'en' ? 'Details:' : '详细说明：'}
        </h2>
        {tutorial.content[language].split('\n\n').map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
        
        {tutorial.source && (
          <div className="mt-8 pt-4 border-t">
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <span>{language === 'en' ? 'Source:' : '来源：'}</span>
              <a 
                href={tutorial.source} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline flex items-center gap-1"
              >
                {tutorial.sourceText || tutorial.source}
                <ExternalLink className="h-3 w-3" />
              </a>
            </p>
          </div>
        )}
      </article>
    </div>
  );
};

export default TutorialDetail;

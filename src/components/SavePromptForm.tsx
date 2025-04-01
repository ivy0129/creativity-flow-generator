
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, LogIn } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/useLanguage';
import { useSavedPrompts } from '@/hooks/useSavedPrompts';

const SavePromptForm: React.FC = () => {
  const { isAuthenticated, login } = useAuth();
  const { toast } = useToast();
  const { t, language } = useLanguage();
  const { savePrompt } = useSavedPrompts();
  
  const [promptContent, setPromptContent] = useState('');
  const [tags, setTags] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast({
        title: language === 'zh' ? "需要登录" : "Login Required",
        description: language === 'zh' ? "请先登录以保存提示词" : "Please login to save prompts",
      });
      return;
    }
    
    if (!promptContent.trim()) {
      toast({
        title: t('error'),
        description: t('promptEmpty'),
        variant: "destructive",
      });
      return;
    }
    
    setIsSaving(true);
    
    try {
      // Convert comma-separated tags to array
      const tagsArray = tags.split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);
      
      // Save the prompt
      const savedPrompt = savePrompt(promptContent);
      
      // Add custom tags if provided
      if (tagsArray.length > 0) {
        savedPrompt.tags = [...new Set([...savedPrompt.tags, ...tagsArray])];
      }
      
      toast({
        title: t('promptSaved'),
        description: t('promptSavedDesc'),
      });
      
      // Clear the form
      setPromptContent('');
      setTags('');
    } catch (error) {
      toast({
        title: t('error'),
        description: t('errorSavingPrompt'),
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleLoginClick = () => {
    if (!isAuthenticated) {
      login('github');
    }
  };

  const placeholderText = language === 'zh'
    ? "在此输入您想要保存的提示词..."
    : "Enter the prompt you want to save...";

  return (
    <Card className="w-full p-6 shadow-lg prompt-shadow animate-fade-in">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="prompt-content" className="text-base font-medium">
            {t('promptContent')}
          </Label>
          <Textarea
            id="prompt-content"
            placeholder={placeholderText}
            value={promptContent}
            onChange={(e) => setPromptContent(e.target.value)}
            className="min-h-[120px] resize-none border-input focus:border-primary focus:ring-1 focus:ring-primary"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tags" className="text-base font-medium">
            {t('tags')} <span className="text-muted-foreground text-sm">({t('tagsOptional')})</span>
          </Label>
          <Input
            id="tags"
            placeholder={language === 'zh' ? "用逗号分隔标签，如：React,API,函数" : "Separate tags with commas, e.g.: React,API,Function"}
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        <Button 
          type="submit" 
          className="w-full gradient-bg text-white hover:opacity-90 transition-opacity gap-2"
          disabled={isSaving}
          onClick={!isAuthenticated ? handleLoginClick : undefined}
        >
          {!isAuthenticated ? (
            <LogIn className="h-4 w-4" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          {isSaving 
            ? (language === 'zh' ? "保存中..." : "Saving...") 
            : !isAuthenticated 
              ? (language === 'zh' ? "登录以保存提示词" : "Login to save prompt") 
              : (language === 'zh' ? "保存提示词" : "Save Prompt")
          }
        </Button>
      </form>
    </Card>
  );
};

export default SavePromptForm;

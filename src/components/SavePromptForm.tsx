
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, LogIn, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/useLanguage';
import { useFirestorePrompts } from '@/hooks/useFirestorePrompts';
import { useNavigate } from 'react-router-dom';
import { Alert, AlertDescription } from "@/components/ui/alert";

const SavePromptForm: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  const { t, language } = useLanguage();
  const { savePrompt, indexError } = useFirestorePrompts();
  const navigate = useNavigate();
  
  const [promptContent, setPromptContent] = useState('');
  const [tags, setTags] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
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
      // 将标签字符串转换为数组
      const tagsArray = tags.split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);
      
      // 保存提示词到 Firestore
      const result = await savePrompt(promptContent, tagsArray);
      
      if (result) {
        console.log('提示词保存成功:', result);
        toast({
          title: t('promptSaved'),
          description: t('promptSavedDesc'),
        });
        
        // 清空表单
        setPromptContent('');
        setTags('');
      }
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
      navigate('/auth');
    }
  };

  const placeholderText = language === 'zh'
    ? "在此输入您想要保存的提示词..."
    : "Enter the prompt you want to save...";

  return (
    <Card className="w-full p-6 shadow-lg prompt-shadow animate-fade-in">
      {indexError && isAuthenticated && (
        <Alert variant="warning" className="mb-4 border-amber-500 bg-amber-50 dark:bg-amber-950">
          <AlertTriangle className="h-4 w-4 text-amber-500" />
          <AlertDescription className="text-amber-700 dark:text-amber-300">
            {language === 'zh' 
              ? '需要创建 Firebase 索引以使用高级排序功能。' 
              : 'Firebase index required for advanced sorting.'}
            <Button 
              variant="link" 
              className="p-0 h-auto text-amber-700 underline"
              onClick={() => window.open('https://console.firebase.google.com/project/myprompt-5a0c4/firestore/indexes', '_blank')}
            >
              {language === 'zh' ? '点击此处创建索引' : 'Click here to create index'}
            </Button>
          </AlertDescription>
        </Alert>
      )}

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

        {isAuthenticated && (
          <div className="text-sm text-muted-foreground">
            {language === 'zh' 
              ? `提示词将保存到账户：${user?.name}` 
              : `Prompt will be saved to account: ${user?.name}`}
          </div>
        )}

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


import { useState, useEffect } from 'react';

export interface SavedPrompt {
  content: string;
  tags: string[];
  createdAt: string;
}

export const useSavedPrompts = () => {
  const [savedPrompts, setSavedPrompts] = useState<SavedPrompt[]>(() => {
    const saved = localStorage.getItem('saved_prompts');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('saved_prompts', JSON.stringify(savedPrompts));
  }, [savedPrompts]);

  const savePrompt = (content: string) => {
    // 自动根据内容生成标签
    const generatedTags = generateTags(content);
    
    const newPrompt: SavedPrompt = {
      content,
      tags: generatedTags,
      createdAt: new Date().toISOString(),
    };
    
    setSavedPrompts(prev => [newPrompt, ...prev]);
    return newPrompt;
  };

  const removeSavedPrompt = (index: number) => {
    setSavedPrompts(prev => prev.filter((_, i) => i !== index));
  };

  const updatePromptTags = (index: number, newTags: string[]) => {
    setSavedPrompts(prev => 
      prev.map((prompt, i) => 
        i === index ? { ...prompt, tags: newTags } : prompt
      )
    );
  };

  // 简单的标签生成逻辑
  const generateTags = (content: string): string[] => {
    const tags: string[] = [];
    
    // 根据内容长度添加标签
    if (content.length < 200) tags.push('简短');
    else if (content.length > 500) tags.push('长文本');
    else tags.push('中等长度');
    
    // 根据内容关键词添加标签
    if (content.includes('React') || content.includes('react')) tags.push('React');
    if (content.includes('API') || content.includes('api')) tags.push('API');
    if (content.includes('组件') || content.includes('component')) tags.push('组件');
    if (content.includes('函数') || content.includes('function')) tags.push('函数');
    if (content.includes('数据库') || content.includes('database')) tags.push('数据库');
    if (content.includes('认证') || content.includes('auth')) tags.push('认证');
    if (content.includes('样式') || content.includes('style') || content.includes('CSS')) tags.push('样式');
    if (content.includes('表单') || content.includes('form')) tags.push('表单');
    
    return tags;
  };

  return {
    savedPrompts,
    savePrompt,
    removeSavedPrompt,
    updatePromptTags
  };
};

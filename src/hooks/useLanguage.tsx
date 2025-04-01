import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Language = 'en' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: keyof typeof translations) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  appName: {
    en: 'MyPrompt',
    zh: 'MyPrompt',
  },
  home: {
    en: 'Home',
    zh: '首页',
  },
  logout: {
    en: 'Logout',
    zh: '退出登录',
  },
  login: {
    en: 'Login',
    zh: '登录',
  },
  githubLogin: {
    en: 'Login with GitHub',
    zh: '使用GitHub登录',
  },
  googleLogin: {
    en: 'Login with Google',
    zh: '使用Google登录',
  },
  promptOptimizer: {
    en: 'My Personal AI Prompt',
    zh: '专属于我的 AI Prompt',
  },
  subheading: {
    en: 'Help new developers write clear, effective AI prompts for more precise responses',
    zh: '帮助开发新手编写清晰、有效的AI指令，获得更精准的回应',
  },
  promptOptimization: {
    en: 'Prompt Optimization',
    zh: '提示词优化',
  },
  promptOptimizationDesc: {
    en: 'Refine your prompts to get the best results from AI models.',
    zh: '优化您的提示词，以从AI模型获得最佳结果。',
  },
  devCommandGen: {
    en: 'Dev Command Gen',
    zh: '开发命令生成',
  },
  devCommandGenDesc: {
    en: 'Generate code and commands for development tasks.',
    zh: '生成用于开发任务的代码和命令。',
  },
  learningGrowth: {
    en: 'Learning & Growth',
    zh: '学习与成长',
  },
  learningGrowthDesc: {
    en: 'AI-driven insights for personal and professional development.',
    zh: 'AI驱动的洞察力，用于个人和职业发展。',
  },
  howToUse: {
    en: 'How to Use',
    zh: '如何使用',
  },
  describeNeeds: {
    en: 'Describe Your Needs',
    zh: '描述您的需求',
  },
  describeNeedsDesc: {
    en: 'Clearly outline the functionality or problem you\'re addressing.',
    zh: '清晰地概述您要解决的功能或问题。',
  },
  chooseParams: {
    en: 'Choose Parameters',
    zh: '选择参数',
  },
  chooseParamsDesc: {
    en: 'Customize the tone, length, and creativity to match your style.',
    zh: '自定义语气、长度和创造力以匹配您的风格。',
  },
  getResults: {
    en: 'Get Results',
    zh: '获取结果',
  },
  getResultsDesc: {
    en: 'Receive optimized prompts or generated content instantly.',
    zh: '立即收到优化的提示词或生成的内容。',
  },
  enterPrompt: {
    en: 'Enter your prompt here...',
    zh: '在此输入您的提示词...',
  },
  optimize: {
    en: 'Optimize',
    zh: '优化',
  },
  tone: {
    en: 'Tone',
    zh: '语气',
  },
  length: {
    en: 'Length',
    zh: '长度',
  },
  creativity: {
    en: 'Creativity',
    zh: '创造力',
  },
  prompt: {
    en: 'Prompt',
    zh: '提示词',
  },
  result: {
    en: 'Result',
    zh: '结果',
  },
  copy: {
    en: 'Copy',
    zh: '复制',
  },
  copied: {
    en: 'Copied!',
    zh: '已复制！',
  },
  copiedToClipboard: {
    en: 'Copied to clipboard.',
    zh: '已复制到剪贴板。',
  },
  savedPrompts: {
    en: 'Saved Prompts',
    zh: '保存的提示词',
  },
  searchPromptsOrTags: {
    en: 'Search prompts or tags...',
    zh: '搜索提示词或标签...',
  },
  searchPrompts: {
    en: 'Search prompts...',
    zh: '搜索提示词...',
  },
  noSavedPrompts: {
    en: 'No saved prompts yet.',
    zh: '还没有保存的提示词。',
  },
  noMatchingPrompts: {
    en: 'No matching prompts found.',
    zh: '未找到匹配的提示词。',
  },
  delete: {
    en: 'Delete',
    zh: '删除',
  },
  editTags: {
    en: 'Edit Tags',
    zh: '编辑标签',
  },
  save: {
    en: 'Save',
    zh: '保存',
  },
  cancel: {
    en: 'Cancel',
    zh: '取消',
  },
  optimizePrompt: {
    en: 'Optimize Prompt',
    zh: '优化提示词',
  },
  savePrompt: {
    en: 'Save Prompt',
    zh: '保存提示词',
  },
  savePrompts: {
    en: 'Save Prompts',
    zh: '保存提示词',
  },
  savePromptsDesc: {
    en: 'Save your prompts for future use and easy access',
    zh: '保存您的提示词以便将来使用和轻松访问',
  },
  promptContent: {
    en: 'Prompt Content',
    zh: '提示词内容',
  },
  tags: {
    en: 'Tags',
    zh: '标签',
  },
  tagsOptional: {
    en: 'optional',
    zh: '可选',
  },
  promptSaved: {
    en: 'Prompt Saved',
    zh: '提示词已保存',
  },
  promptSavedDesc: {
    en: 'Your prompt has been saved successfully',
    zh: '您的提示词已成功保存',
  },
  error: {
    en: 'Error',
    zh: '错误',
  },
  promptEmpty: {
    en: 'Prompt content cannot be empty',
    zh: '提示词内容不能为空',
  },
  errorSavingPrompt: {
    en: 'An error occurred while saving your prompt',
    zh: '保存提示词时发生错误',
  },
  backToSavedPrompts: {
    en: 'Back to Saved Prompts',
    zh: '返回保存的提示词',
  },
  relatedTags: {
    en: 'Related Tags',
    zh: '相关标签',
  },
  exploreAllTags: {
    en: 'Explore All Tags',
    zh: '探索所有标签',
  },
  popularTags: {
    en: 'Popular Tags',
    zh: '热门标签',
  },
  promptsWithTag: {
    en: 'prompts with the tag',
    zh: '个与此标签相关的提示词',
  },
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>((localStorage.getItem('language') as Language) || 'en');

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: keyof typeof translations) => {
    return translations[key][language] || translations[key]['en'];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

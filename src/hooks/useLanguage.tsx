
import React, { createContext, useContext, useState } from 'react';

// 语言类型
type Language = 'en' | 'zh';

// 将所有翻译文本进行集中管理
const translations = {
  en: {
    // 通用
    submit: 'Submit',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    confirm: 'Confirm',
    copy: 'Copy',
    home: 'Home',
    settings: 'Settings',
    login: 'Login',
    logout: 'Logout',
    copied: 'Copied',
    copiedToClipboard: 'Text has been copied to clipboard',
    error: 'Error',
    
    // 提示词相关
    prompt: 'Prompt',
    prompts: 'Prompts',
    promptContent: 'Prompt Content',
    savedPrompts: 'Saved Prompts',
    savePrompt: 'Save Prompt',
    savedPrompt: 'Saved Prompt',
    promptSaved: 'Prompt Saved',
    promptSavedDesc: 'Your prompt has been saved successfully',
    promptEmpty: 'Prompt cannot be empty',
    errorSavingPrompt: 'An error occurred while saving the prompt',
    noSavedPrompts: 'No saved prompts yet',
    noMatchingPrompts: 'No prompts match your search',
    searchPromptsOrTags: 'Search prompts or tags',
    
    // 标签相关
    tags: 'Tags',
    tagsOptional: 'optional',
    
    // 新增标签页相关
    promptsTaggedWith: 'Prompts Tagged with',
    backToSavedPrompts: 'Back to Saved Prompts',
    noPromptsWithTag: 'No prompts with this tag',
    
    // 新增 SavedPrompts 页面文案
    totalPrompts: 'Total Prompts',
    tryDifferentSearch: 'Try a different search term',
    
    // 首页功能介绍卡片
    promptOptimization: 'Prompt Optimization',
    promptOptimizationDesc: 'Generate optimized prompts for better AI responses',
    devCommandGen: 'Dev Command Generator',
    devCommandGenDesc: 'Create precise commands for development tasks',
    savePrompts: 'Save Prompts',
    savePromptsDesc: 'Store and organize your favorite prompts',
    
    // 应用名称和子标题
    appName: 'AI Prompt Engineer',
    promptOptimizer: 'Prompt Optimizer',
    subheading: 'Generate, optimize, and manage AI prompts efficiently',
    
    // 如何使用
    howToUse: 'How to Use',
    describeNeeds: 'Describe Your Needs',
    describeNeedsDesc: 'Explain what you want to accomplish with the AI',
    chooseParams: 'Adjust Parameters',
    chooseParamsDesc: 'Set the tone, length, and complexity for your needs',
    getResults: 'Get Results',
    getResultsDesc: 'Copy, save, or further refine the generated prompt',
    
    // 其它按钮和标签
    optimizePrompt: 'Optimize Prompt',
    githubLogin: 'Login with GitHub',
    googleLogin: 'Login with Google',
  },
  zh: {
    // 通用
    submit: '提交',
    save: '保存',
    cancel: '取消',
    delete: '删除',
    confirm: '确认',
    copy: '复制',
    home: '首页',
    settings: '设置',
    login: '登录',
    logout: '退出登录',
    copied: '已复制',
    copiedToClipboard: '文本已复制到剪贴板',
    error: '错误',
    
    // 提示词相关
    prompt: '提示词',
    prompts: '提示词',
    promptContent: '提示词内容',
    savedPrompts: '已保存的提示词',
    savePrompt: '保存提示词',
    savedPrompt: '已保存提示词',
    promptSaved: '提示词已保存',
    promptSavedDesc: '您的提示词已成功保存',
    promptEmpty: '提示词不能为空',
    errorSavingPrompt: '保存提示词时发生错误',
    noSavedPrompts: '暂无已保存的提示词',
    noMatchingPrompts: '没有匹配的提示词',
    searchPromptsOrTags: '搜索提示词或标签',
    
    // 标签相关
    tags: '标签',
    tagsOptional: '可选',
    
    // 新增标签页相关
    promptsTaggedWith: '标签为',
    backToSavedPrompts: '返回已保存的提示词',
    noPromptsWithTag: '没有使用此标签的提示词',
    
    // 新增 SavedPrompts 页面文案
    totalPrompts: '提示词总数',
    tryDifferentSearch: '尝试不同的搜索词',
    
    // 首页功能介绍卡片
    promptOptimization: '提示词优化',
    promptOptimizationDesc: '生成优化的提示词，获得更好的AI回复',
    devCommandGen: '开发命令生成器',
    devCommandGenDesc: '为开发任务创建精确的命令',
    savePrompts: '保存提示词',
    savePromptsDesc: '存储并组织您喜爱的提示词',
    
    // 应用名称和子标题
    appName: 'AI提示词工程师',
    promptOptimizer: '提示词优化器',
    subheading: '高效生成、优化和管理AI提示词',
    
    // 如何使用
    howToUse: '使用方法',
    describeNeeds: '描述需求',
    describeNeedsDesc: '解释您希望通过AI实现的目标',
    chooseParams: '调整参数',
    chooseParamsDesc: '根据需求设置风格、长度和复杂度',
    getResults: '获取结果',
    getResultsDesc: '复制、保存或进一步优化生成的提示词',
    
    // 其它按钮和标签
    optimizePrompt: '优化提示词',
    githubLogin: '使用GitHub登录',
    googleLogin: '使用Google登录',
  }
};

// 创建上下文
type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// 语言提供者组件
export const LanguageProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  // 尝试从本地存储加载语言设置，默认为中文
  const [language, setLanguage] = useState<Language>(() => {
    const savedLang = localStorage.getItem('preferred_language');
    return (savedLang === 'en' ? 'en' : 'zh') as Language;
  });

  // 当语言变化时保存到本地存储
  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('preferred_language', lang);
  };
  
  // 翻译函数
  const t = (key: string): string => {
    // 修复：检查key是否存在于translations[language]中，如果不存在则返回key本身
    if (!translations[language][key as keyof typeof translations[typeof language]]) {
      console.warn(`Translation key "${key}" not found in language "${language}"`);
      return key;
    }
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// 使用语言的自定义Hook
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

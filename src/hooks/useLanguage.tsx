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
    loginToViewSavedPrompts: 'Please login to view your saved prompts',
    
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
    promptOptimization: 'AI Prompt Optimization',
    promptOptimizationDesc: 'Generate optimized ChatGPT prompts for better AI responses',
    devCommandGen: 'AI Prompt Generator',
    devCommandGenDesc: 'Create precise prompts for development and creative tasks',
    savePrompts: 'Collect & Manage Prompts',
    savePromptsDesc: 'Store and organize your favorite AI prompts',
    
    // 应用名称和子标题 - 更新为新的文案
    appName: 'MyPrompt',
    promptOptimizer: 'AI Prompt Optimization Expert',
    subheading: 'Learn how to write better AI prompts with our prompt engineering tips & tools',
    
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
    
    // 新增翻译相关
    translateToLanguage: 'Translate to {language}',
    translateTo: 'Translate to',
    translateToChinese: 'Translate to Chinese',
    translateToEnglish: 'Translate to English',
    showOriginal: 'Show Original',
    translating: 'Translating...',
    translatingTo: 'Translating to {language}',
    translationComplete: 'Translation complete',
    promptTranslatedTo: 'Prompt translated to {language}',
    translationError: 'Translation error',
    failedToTranslate: 'Failed to translate the prompt',
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
    loginToViewSavedPrompts: '请登录以查看已保存的提示词',
    
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
    promptOptimization: 'AI提示词优化',
    promptOptimizationDesc: '生成优化的ChatGPT提示词，获得更好的AI回复',
    devCommandGen: 'Prompt生成器工具',
    devCommandGenDesc: '为开发任务创建精确的AI指令',
    savePrompts: '收集与管理提示词',
    savePromptsDesc: '存储并组织您喜爱的AI提示词',
    
    // 应用名称和子标题 - 更新为新的文案
    appName: 'MyPrompt',
    promptOptimizer: 'AI提示词优化专家',
    subheading: '学习如何编写更好的AI提示词，掌握提示词工程技巧和工具',
    
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
    
    // 新增翻译相关
    translateToLanguage: '翻译为{language}',
    translateTo: '翻译为',
    translateToChinese: '翻译为中文',
    translateToEnglish: '翻译为英文',
    showOriginal: '显示原文',
    translating: '翻译中...',
    translatingTo: '正在翻译为{language}',
    translationComplete: '翻译完成',
    promptTranslatedTo: '提示词已翻译为{language}',
    translationError: '翻译错误',
    failedToTranslate: '无法翻译提示词',
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
    // 修复：使用类型断言确保TypeScript不会抱怨
    const currentTranslations = translations[language] as Record<string, string>;
    
    // 检查翻译是否存在
    if (key in currentTranslations) {
      return currentTranslations[key];
    } else {
      console.warn(`Translation key "${key}" not found in language "${language}"`);
      
      // 尝试从英文中获取，作为后备
      if (language !== 'en' && key in (translations['en'] as Record<string, string>)) {
        return (translations['en'] as Record<string, string>)[key];
      }
      
      // 如果什么都没有，返回键名本身
      return key;
    }
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

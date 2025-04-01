
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Language = 'en' | 'zh';

type Translations = {
  [key: string]: {
    en: string;
    zh: string;
  };
};

// Common translations used across the app
export const translations: Translations = {
  appName: {
    en: 'AI Prompt Optimizer',
    zh: 'AI提示优化助手',
  },
  home: {
    en: 'Home',
    zh: '首页',
  },
  savedPrompts: {
    en: 'Saved Prompts',
    zh: '已保存的提示词',
  },
  login: {
    en: 'Login',
    zh: '登录',
  },
  logout: {
    en: 'Logout',
    zh: '退出登录',
  },
  githubLogin: {
    en: 'GitHub Login',
    zh: 'GitHub 登录',
  },
  googleLogin: {
    en: 'Google Login',
    zh: 'Google 登录',
  },
  loginSuccess: {
    en: 'Login Successful',
    zh: '登录成功',
  },
  loginSuccessMessage: {
    en: 'You have successfully logged in',
    zh: '您已成功登录系统',
  },
  logoutSuccess: {
    en: 'Logged Out',
    zh: '已退出登录',
  },
  logoutSuccessMessage: {
    en: 'You have been logged out',
    zh: '您已成功退出系统',
  },
  promptOptimizer: {
    en: 'AI Prompt Optimizer',
    zh: 'AI提示优化助手',
  },
  subheading: {
    en: 'Help beginners write clear, effective AI instructions for more accurate responses',
    zh: '帮助开发新手编写清晰、有效的AI指令，获得更精准的回应',
  },
  promptOptimization: {
    en: 'Prompt Optimization',
    zh: '提示词优化',
  },
  promptOptimizationDesc: {
    en: 'Convert complex ideas into clear instructions that AI can understand',
    zh: '将复杂想法转化为AI能理解的清晰指令',
  },
  devCommandGen: {
    en: 'Dev Command Generation',
    zh: '开发命令生成',
  },
  devCommandGenDesc: {
    en: 'Generate commands and code snippets for various development scenarios',
    zh: '生成适用于各种开发场景的命令和代码片段',
  },
  learningGrowth: {
    en: 'Learning & Growth',
    zh: '学习成长',
  },
  learningGrowthDesc: {
    en: 'Learn best practices and tips for AI interaction as you use the tool',
    zh: '在使用过程中学习AI交互的最佳实践和技巧',
  },
  howToUse: {
    en: 'How to Use AI Prompt Optimizer',
    zh: '如何使用AI提示优化助手',
  },
  describeNeeds: {
    en: 'Describe Your Needs',
    zh: '描述您的需求',
  },
  describeNeedsDesc: {
    en: 'Enter the functionality you want to achieve or problem you want to solve',
    zh: '输入您想要实现的功能或解决的问题',
  },
  chooseParams: {
    en: 'Choose Suitable Parameters',
    zh: '选择合适的参数',
  },
  chooseParamsDesc: {
    en: 'Adjust prompt style and complexity based on your purpose',
    zh: '根据用途调整提示词的风格和复杂度',
  },
  getResults: {
    en: 'Get Optimized Results',
    zh: '获取优化结果',
  },
  getResultsDesc: {
    en: 'Copy the generated prompt to use with AI assistants',
    zh: '复制生成的提示词，用于与AI助手交流',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en'); // Default to English

  useEffect(() => {
    // Try to get stored language preference
    const storedLanguage = localStorage.getItem('language') as Language;
    if (storedLanguage && (storedLanguage === 'en' || storedLanguage === 'zh')) {
      setLanguage(storedLanguage);
    }
  }, []);

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    if (translations[key]) {
      return translations[key][language];
    }
    console.warn(`Translation key not found: ${key}`);
    return key;
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

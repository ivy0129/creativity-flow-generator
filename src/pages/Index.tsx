
import React from 'react';
import SEO from "@/components/SEO"; // Changed from named import to default import
import Header from "@/components/Header"; // Changed from named import to default import
import Footer from "@/components/Footer"; // Changed from named import to default import
import PromptForm from "@/components/PromptForm"; // Changed from named import to default import
import ResultDisplay from "@/components/ResultDisplay";
import { usePromptGenerator } from "@/hooks/usePromptGenerator";
import { useLanguage } from '@/hooks/useLanguage';
import ApiKeyInput from "@/components/ApiKeyInput";

const Index = () => {
  const { generatedContent, isLoading, isResultVisible, apiErrorMessage } = usePromptGenerator();
  const { language } = useLanguage();
  
  return (
    <>
      <SEO
        title={language === 'zh' ? "提示词优化器" : "Prompt Optimizer"}
        description={language === 'zh' ? "优化您的AI提示词，获得更好的结果" : "Optimize your AI prompts for better results"}
      />
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 container max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-2">
            {language === 'zh' ? "提示词优化器" : "Prompt Optimizer"}
          </h1>
          <p className="text-muted-foreground mb-8">
            {language === 'zh' 
              ? "输入您的提示词，我们将帮助您优化它以获得更好的AI生成结果" 
              : "Enter your prompt, and we'll help you optimize it for better AI-generated results"}
          </p>
          
          {/* API密钥输入组件 */}
          <ApiKeyInput />
          
          <PromptForm />
          
          {generatedContent && (
            <ResultDisplay 
              content={generatedContent} 
              isVisible={isResultVisible}
              isLoading={isLoading}
              apiErrorMessage={apiErrorMessage}
            />
          )}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;

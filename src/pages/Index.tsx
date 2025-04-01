
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PromptForm from '@/components/PromptForm';
import ResultDisplay from '@/components/ResultDisplay';
import { usePromptGenerator } from '@/hooks/usePromptGenerator';
import { Code, Lightbulb, BookOpen, Rocket } from 'lucide-react';

const Index = () => {
  const { 
    generateContent, 
    generatedContent, 
    isLoading, 
    isResultVisible 
  } = usePromptGenerator();

  return (
    <div className="min-h-screen flex flex-col bg-background hero-gradient">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <section className="max-w-4xl mx-auto mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 gradient-text">
            AI提示优化助手
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            帮助开发新手编写清晰、有效的AI指令，获得更精准的回应
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-background rounded-lg p-6 shadow-md border border-border">
              <Lightbulb className="h-8 w-8 text-purple-500 mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-2">提示词优化</h3>
              <p className="text-muted-foreground">
                将复杂想法转化为AI能理解的清晰指令
              </p>
            </div>
            
            <div className="bg-background rounded-lg p-6 shadow-md border border-border">
              <BookOpen className="h-8 w-8 text-indigo-500 mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-2">开发命令生成</h3>
              <p className="text-muted-foreground">
                生成适用于各种开发场景的命令和代码片段
              </p>
            </div>
            
            <div className="bg-background rounded-lg p-6 shadow-md border border-border">
              <Rocket className="h-8 w-8 text-purple-500 mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-2">学习成长</h3>
              <p className="text-muted-foreground">
                在使用过程中学习AI交互的最佳实践和技巧
              </p>
            </div>
          </div>
          
          <PromptForm onSubmit={generateContent} isLoading={isLoading} />
          
          <ResultDisplay 
            content={generatedContent} 
            isVisible={isResultVisible} 
          />
        </section>
        
        <section className="max-w-4xl mx-auto mt-16 text-center">
          <h2 className="text-3xl font-bold mb-8 gradient-text">
            如何使用AI提示优化助手
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center text-white font-bold mb-4">
                1
              </div>
              <h3 className="text-lg font-semibold mb-2">描述您的需求</h3>
              <p className="text-muted-foreground">
                输入您想要实现的功能或解决的问题
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center text-white font-bold mb-4">
                2
              </div>
              <h3 className="text-lg font-semibold mb-2">选择合适的参数</h3>
              <p className="text-muted-foreground">
                根据用途调整提示词的风格和复杂度
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center text-white font-bold mb-4">
                3
              </div>
              <h3 className="text-lg font-semibold mb-2">获取优化结果</h3>
              <p className="text-muted-foreground">
                复制生成的提示词，用于与AI助手交流
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;

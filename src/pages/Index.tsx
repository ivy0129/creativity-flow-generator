
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PromptForm from '@/components/PromptForm';
import ResultDisplay from '@/components/ResultDisplay';
import { usePromptGenerator } from '@/hooks/usePromptGenerator';
import { useLanguage } from '@/hooks/useLanguage';
import { useIsMobile } from '@/hooks/use-mobile';
import { Lightbulb, BookOpen } from 'lucide-react';

const Index = () => {
  const { 
    generateContent, 
    generatedContent, 
    isLoading, 
    isResultVisible 
  } = usePromptGenerator();
  
  const { t } = useLanguage();
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex flex-col bg-background hero-gradient">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-4">
        <section className="max-w-4xl mx-auto mb-6 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 gradient-text">
            {t('promptOptimizer')}
          </h1>
          <p className={`text-lg md:text-xl text-muted-foreground ${isMobile ? 'mb-4' : 'mb-8'}`}>
            {t('subheading')}
          </p>
          
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${isMobile ? 'mb-6' : 'mb-12'}`}>
            {/* 在移动端只显示前两个卡片 */}
            <div className="bg-background rounded-lg p-4 shadow-md border border-border">
              <Lightbulb className="h-8 w-8 text-purple-500 mb-2 mx-auto" />
              <h3 className="text-lg font-semibold mb-1">{t('promptOptimization')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('promptOptimizationDesc')}
              </p>
            </div>
            
            <div className="bg-background rounded-lg p-4 shadow-md border border-border">
              <BookOpen className="h-8 w-8 text-indigo-500 mb-2 mx-auto" />
              <h3 className="text-lg font-semibold mb-1">{t('devCommandGen')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('devCommandGenDesc')}
              </p>
            </div>
            
            {/* 第三个卡片在移动端不显示，在桌面端显示 */}
            {!isMobile && (
              <div className="bg-background rounded-lg p-6 shadow-md border border-border">
                <div className="h-8 w-8 text-purple-500 mb-4 mx-auto">🚀</div>
                <h3 className="text-lg font-semibold mb-2">{t('learningGrowth')}</h3>
                <p className="text-muted-foreground">
                  {t('learningGrowthDesc')}
                </p>
              </div>
            )}
          </div>
          
          <PromptForm onSubmit={generateContent} isLoading={isLoading} />
          
          <ResultDisplay 
            content={generatedContent} 
            isVisible={isResultVisible} 
          />
        </section>
        
        {/* 如果是移动端，则不显示"如何使用"部分，或者可以选择性地显示更简洁的版本 */}
        {!isMobile && (
          <section className="max-w-4xl mx-auto mt-16 text-center">
            <h2 className="text-3xl font-bold mb-8 gradient-text">
              {t('howToUse')}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center text-white font-bold mb-4">
                  1
                </div>
                <h3 className="text-lg font-semibold mb-2">{t('describeNeeds')}</h3>
                <p className="text-muted-foreground">
                  {t('describeNeedsDesc')}
                </p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center text-white font-bold mb-4">
                  2
                </div>
                <h3 className="text-lg font-semibold mb-2">{t('chooseParams')}</h3>
                <p className="text-muted-foreground">
                  {t('chooseParamsDesc')}
                </p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center text-white font-bold mb-4">
                  3
                </div>
                <h3 className="text-lg font-semibold mb-2">{t('getResults')}</h3>
                <p className="text-muted-foreground">
                  {t('getResultsDesc')}
                </p>
              </div>
            </div>
          </section>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;

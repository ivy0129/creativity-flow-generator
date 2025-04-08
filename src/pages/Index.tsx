
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PromptForm from '@/components/PromptForm';
import ResultDisplay from '@/components/ResultDisplay';
import { usePromptGenerator } from '@/hooks/usePromptGenerator';
import { useLanguage } from '@/hooks/useLanguage';
import { useIsMobile } from '@/hooks/use-mobile';
import { Lightbulb, BookOpen, Save } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SavePromptForm from '@/components/SavePromptForm';
import { useAuth } from '@/hooks/useAuth';
import SEO from '@/components/SEO';
import ApiKeyInput from '@/components/ApiKeyInput';
import { hasSiliconFlowApiKey } from '@/api/siliconFlowApi';

const Index = () => {
  const { 
    generateContent, 
    generatedContent, 
    isLoading, 
    isResultVisible,
    apiErrorMessage
  } = usePromptGenerator();
  
  const { t, language } = useLanguage();
  const isMobile = useIsMobile();
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-background hero-gradient">
      <SEO 
        title={t('promptOptimizer')}
        description={t('subheading')}
      />
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
            <article className="bg-background rounded-lg p-4 shadow-md border border-border">
              <Lightbulb className="h-8 w-8 text-purple-500 mb-2 mx-auto" aria-hidden="true" />
              <h3 className="text-lg font-semibold mb-1">{t('promptOptimization')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('promptOptimizationDesc')}
              </p>
            </article>
            
            <article className="bg-background rounded-lg p-4 shadow-md border border-border">
              <BookOpen className="h-8 w-8 text-indigo-500 mb-2 mx-auto" aria-hidden="true" />
              <h3 className="text-lg font-semibold mb-1">{t('devCommandGen')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('devCommandGenDesc')}
              </p>
            </article>
            
            {!isMobile && (
              <article className="bg-background rounded-lg p-4 shadow-md border border-border">
                <Save className="h-8 w-8 text-green-500 mb-2 mx-auto" aria-hidden="true" />
                <h3 className="text-lg font-semibold mb-1">{t('savePrompts')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('savePromptsDesc')}
                </p>
              </article>
            )}
          </div>
          
          {/* API密钥输入组件 */}
          {!hasSiliconFlowApiKey() && <ApiKeyInput />}
          
          <Tabs defaultValue="optimize" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="optimize">{t('optimizePrompt')}</TabsTrigger>
              <TabsTrigger value="save">{t('savePrompt')}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="optimize">
              <PromptForm onSubmit={generateContent} isLoading={isLoading} />
              
              <ResultDisplay 
                content={generatedContent} 
                isVisible={isResultVisible} 
                isLoading={isLoading}
                apiErrorMessage={apiErrorMessage}
              />
            </TabsContent>
            
            <TabsContent value="save">
              <SavePromptForm />
            </TabsContent>
          </Tabs>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;


import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import { useIsMobile } from '@/hooks/use-mobile';
import SEO from '@/components/SEO';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TutorialsList from '@/components/tutorials/TutorialsList';
import TutorialDetail from '@/components/tutorials/TutorialDetail';
import MobileNavigation from '@/components/tutorials/MobileNavigation';
import { aiPromptTutorials } from '@/data/ai-prompt-tutorials';

const Tutorials: React.FC = () => {
  const { language } = useLanguage();
  const isMobile = useIsMobile();
  const { articleId } = useParams();
  
  const selectedArticle = articleId 
    ? aiPromptTutorials.find(article => article.id === articleId)
    : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [articleId]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO 
        title={selectedArticle 
          ? selectedArticle.title[language]
          : (language === 'en' ? 'AI Prompt Tutorials & Examples' : 'AI提示词教程和案例')
        }
        description={selectedArticle
          ? selectedArticle.description[language]
          : (language === 'en' 
              ? 'Learn how to use AI prompts with our comprehensive tutorials and real-world examples for image generation, text prompts, and more' 
              : '通过我们全面的教程和真实案例学习如何使用AI提示词进行图像生成、文本提示等')
        }
        keywords={selectedArticle ? selectedArticle.tags.join(',') : undefined}
      />
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 pb-16 md:pb-8">
        {selectedArticle 
          ? <TutorialDetail tutorial={selectedArticle} />
          : <TutorialsList tutorials={aiPromptTutorials} language={language} />
        }
      </main>
      
      {isMobile && <MobileNavigation />}
      
      <Footer />
    </div>
  );
};

export default Tutorials;

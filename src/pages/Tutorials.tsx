
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Book, FileText, ExternalLink, Home, Bookmark, Info, Copy, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';
import SEO from '@/components/SEO';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { aiPromptTutorials } from '@/data/ai-prompt-tutorials';

const Tutorials: React.FC = () => {
  const { t, language } = useLanguage();
  const isMobile = useIsMobile();
  const { articleId } = useParams();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  const selectedArticle = articleId 
    ? aiPromptTutorials.find(article => article.id === articleId)
    : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [articleId]);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [articleId]);

  const handleCopyPrompt = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({
      title: language === 'en' ? "Copied to clipboard" : "已复制到剪贴板",
      description: language === 'en' ? "Prompt has been copied to your clipboard" : "提示词已复制到您的剪贴板",
    });
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  if (selectedArticle) {
    const sampleImages = selectedArticle.sampleImages || [selectedArticle.imageUrl].filter(Boolean);
    
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <SEO 
          title={selectedArticle.title[language]}
          description={selectedArticle.description[language]}
          keywords={selectedArticle.tags.join(',')}
        />
        <Header />
        
        <main className="flex-1 container mx-auto px-4 py-8 pb-16 md:pb-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <Link to="/tutorials" className="text-primary hover:underline flex items-center gap-1">
                <Book className="h-4 w-4" />
                {language === 'en' ? 'Back to all tutorials' : '返回所有教程'}
              </Link>
            </div>
            
            <article className="prose prose-slate dark:prose-invert max-w-none">
              <h1 className="text-3xl sm:text-4xl font-bold mb-4">{selectedArticle.title[language]}</h1>
              
              {selectedArticle.source && (
                <div className="mb-6">
                  <a 
                    href={selectedArticle.source} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline flex items-center gap-1"
                  >
                    {language === 'en' ? 'Original source' : '原文链接'} <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              )}
              
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedArticle.tags.map(tag => (
                  <span key={tag} className="text-xs bg-muted px-2 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              
              {/* 提示词示例（图片） */}
              {sampleImages && sampleImages.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-medium mb-4">
                    {language === 'en' ? 'Example Results:' : '示例效果：'}
                  </h2>
                  
                  <div className="mb-4 border border-border rounded-md overflow-hidden">
                    <img 
                      src={sampleImages[activeImageIndex]} 
                      alt={`${selectedArticle.title[language]} - ${language === 'en' ? 'Sample' : '示例'} ${activeImageIndex + 1}`}
                      className="w-full object-cover max-h-[500px]"
                    />
                  </div>
                </div>
              )}
              
              {/* 文章对应的提示词 */}
              <div className="mb-8">
                <h2 className="text-xl font-medium mb-2">
                  {language === 'en' ? 'Prompt:' : '提示词：'}
                </h2>
                <div className="relative">
                  <Card>
                    <CardContent className="p-4">
                      <div className="bg-muted p-4 rounded-md whitespace-pre-wrap text-sm">
                        {selectedArticle.prompt}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end pt-0 pb-4 px-4">
                      <Button 
                        variant="secondary" 
                        size="sm"
                        className="text-xs gap-1"
                        onClick={() => handleCopyPrompt(selectedArticle.prompt)}
                      >
                        {copied ? (
                          <>
                            <CheckCircle className="h-3 w-3" />
                            {language === 'en' ? 'Copied!' : '已复制！'}
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" />
                            {language === 'en' ? 'Copy to clipboard' : '复制到剪贴板'}
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>

              {/* 注意事项 */}
              {selectedArticle.keyPoints && selectedArticle.keyPoints[language] && (
                <div className="mb-8">
                  <h2 className="text-xl font-medium mb-2">
                    {language === 'en' ? 'Key Points:' : '注意事项：'}
                  </h2>
                  <Alert>
                    <AlertTitle>
                      {language === 'en' ? 'For best results:' : '获得最佳效果：'}
                    </AlertTitle>
                    <AlertDescription>
                      <div className="whitespace-pre-wrap mt-2 text-sm">
                        {selectedArticle.keyPoints[language]}
                      </div>
                    </AlertDescription>
                  </Alert>
                </div>
              )}
              
              <h2 className="text-xl font-medium mb-4">
                {language === 'en' ? 'Details:' : '详细说明：'}
              </h2>
              {selectedArticle.content[language].split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
              
              {selectedArticle.source && (
                <div className="mt-8 pt-4 border-t">
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <span>{language === 'en' ? 'Source:' : '来源：'}</span>
                    <a 
                      href={selectedArticle.source} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-1"
                    >
                      {selectedArticle.sourceText || selectedArticle.source}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </p>
                </div>
              )}
            </article>
          </div>
        </main>
        
        {isMobile && (
          <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border flex justify-around items-center h-16 shadow-lg z-30">
            <Link to="/" className="flex flex-1 flex-col items-center justify-center h-full text-muted-foreground hover:text-primary">
              <Home className="h-5 w-5 mb-1" />
              <span className="text-xs">{t('home')}</span>
            </Link>
            <Link to="/saved" className="flex flex-1 flex-col items-center justify-center h-full text-muted-foreground hover:text-primary">
              <Bookmark className="h-5 w-5 mb-1" />
              <span className="text-xs">{t('savedPrompts')}</span>
            </Link>
            <Link to="/tutorials" className="flex flex-1 flex-col items-center justify-center h-full text-primary">
              <Book className="h-5 w-5 mb-1" />
              <span className="text-xs">{language === 'en' ? 'Tutorials' : '教程'}</span>
            </Link>
            <Link to="/settings" className="flex flex-1 flex-col items-center justify-center h-full text-muted-foreground hover:text-primary">
              <Info className="h-5 w-5 mb-1" />
              <span className="text-xs">{language === 'en' ? 'About Us' : '关于我们'}</span>
            </Link>
          </div>
        )}
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO 
        title={language === 'en' ? 'AI Prompt Tutorials & Examples' : 'AI提示词教程和案例'}
        description={language === 'en' ? 'Learn how to use AI prompts with our comprehensive tutorials and real-world examples for image generation, text prompts, and more' : '通过我们全面的教程和真实案例学习如何使用AI提示词进行图像生成、文本提示等'}
      />
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 pb-16 md:pb-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              {language === 'en' ? 'AI Prompt Tutorials & Examples' : 'AI提示词教程和案例'}
            </h1>
            <p className="text-muted-foreground">
              {language === 'en' 
                ? 'Learn how to use AI prompts with our collection of tutorials and real-world examples' 
                : '通过我们收集的教程和真实案例学习如何使用AI提示词'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiPromptTutorials.map((article) => (
              <Link 
                to={`/tutorials/${article.id}`} 
                key={article.id}
                className="block hover:no-underline"
              >
                <div className="border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200 h-full flex flex-col">
                  {/* 示例图片 */}
                  {article.imageUrl && (
                    <div className="aspect-video overflow-hidden bg-muted">
                      <img 
                        src={article.imageUrl} 
                        alt={article.title[language]}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="p-4 flex flex-col flex-grow">
                    {/* 文章标题 */}
                    <h2 className="text-xl font-medium mb-2 line-clamp-2 text-foreground">
                      {article.title[language]}
                    </h2>
                    
                    {/* 文章简介 */}
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-grow">
                      {article.excerpt[language]}
                    </p>
                    
                    {/* 标签 */}
                    <div className="flex flex-wrap gap-1 mt-auto">
                      {article.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-xs bg-muted px-2 py-0.5 rounded-full">
                          {tag}
                        </span>
                      ))}
                      {article.tags.length > 3 && (
                        <span className="text-xs bg-muted px-2 py-0.5 rounded-full">
                          +{article.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border flex justify-around items-center h-16 shadow-lg z-30">
          <Link to="/" className="flex flex-1 flex-col items-center justify-center h-full text-muted-foreground hover:text-primary">
            <Home className="h-5 w-5 mb-1" />
            <span className="text-xs">{t('home')}</span>
          </Link>
          <Link to="/saved" className="flex flex-1 flex-col items-center justify-center h-full text-muted-foreground hover:text-primary">
            <Bookmark className="h-5 w-5 mb-1" />
            <span className="text-xs">{t('savedPrompts')}</span>
          </Link>
          <Link to="/tutorials" className="flex flex-1 flex-col items-center justify-center h-full text-primary">
            <Book className="h-5 w-5 mb-1" />
            <span className="text-xs">{language === 'en' ? 'Tutorials' : '教程'}</span>
          </Link>
          <Link to="/settings" className="flex flex-1 flex-col items-center justify-center h-full text-muted-foreground hover:text-primary">
            <Info className="h-5 w-5 mb-1" />
            <span className="text-xs">{language === 'en' ? 'About Us' : '关于我们'}</span>
          </Link>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default Tutorials;

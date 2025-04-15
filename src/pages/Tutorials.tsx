import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Book, FileText, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { useIsMobile } from '@/hooks/use-mobile';
import SEO from '@/components/SEO';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { articles } from '@/data/tutorial-articles';

const ITEMS_PER_PAGE = 6;

const Tutorials: React.FC = () => {
  const { t, language } = useLanguage();
  const isMobile = useIsMobile();
  const [currentPage, setCurrentPage] = useState(1);
  const { articleId } = useParams();
  
  const pageCount = Math.ceil(articles.length / ITEMS_PER_PAGE);
  const currentArticles = articles.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  
  const selectedArticle = articleId 
    ? articles.find(article => article.id === articleId)
    : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage, articleId]);

  if (selectedArticle) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <SEO 
          title={selectedArticle.title[language]}
          description={selectedArticle.description[language]}
          keywords={`${selectedArticle.tags.join(',')},${t('tutorials')},${t('examples')}`}
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
              <h1 className="text-3xl sm:text-4xl font-bold mb-6">{selectedArticle.title[language]}</h1>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedArticle.tags.map(tag => (
                  <span key={tag} className="text-xs bg-muted px-2 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle>{language === 'en' ? 'Prompt Example' : '提示词示例'}</CardTitle>
                    <CardDescription>
                      {language === 'en' ? 'Copy this prompt to use with your AI assistant' : '复制此提示词以用于您的AI助手'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted p-4 rounded-md whitespace-pre-wrap text-sm">
                      {selectedArticle.prompt}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-xs"
                      onClick={() => {
                        navigator.clipboard.writeText(selectedArticle.prompt);
                        // You can use toast here
                      }}
                    >
                      {language === 'en' ? 'Copy to clipboard' : '复制到剪贴板'}
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              
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
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO 
        title={language === 'en' ? 'Tutorials & Examples' : '教程和案例'}
        description={language === 'en' ? 'Learn how to use AI prompts with our tutorials and examples' : '通过我们的教程和案例学习如何使用AI提示词'}
      />
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 pb-16 md:pb-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              {language === 'en' ? 'Tutorials & Examples' : '教程和案例'}
            </h1>
            <p className="text-muted-foreground">
              {language === 'en' 
                ? 'Learn how to use AI prompts with our collection of tutorials and real-world examples' 
                : '通过我们收集的教程和真实案例学习如何使用AI提示词'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentArticles.map((article) => (
              <Link 
                to={`/tutorials/${article.id}`} 
                key={article.id}
              >
                <Card className="h-full hover:shadow-md transition-shadow duration-200">
                  <CardHeader>
                    <CardTitle className="line-clamp-2">
                      {article.title[language]}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {article.description[language]}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1 mb-2">
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
                    <p className="text-sm line-clamp-3 text-muted-foreground">
                      {article.excerpt[language]}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <div className="text-sm text-primary flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      {language === 'en' ? 'Read more' : '阅读更多'}
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
          
          {pageCount > 1 && (
            <Pagination className="mt-10">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) setCurrentPage(currentPage - 1);
                    }}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
                
                {[...Array(pageCount)].map((_, i) => {
                  const page = i + 1;
                  // Show first page, last page, and pages around current page
                  if (
                    page === 1 || 
                    page === pageCount || 
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <PaginationItem key={page}>
                        <PaginationLink 
                          href="#" 
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(page);
                          }}
                          isActive={page === currentPage}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  }
                  
                  // Show ellipsis for skipped pages
                  if (
                    (page === 2 && currentPage > 3) || 
                    (page === pageCount - 1 && currentPage < pageCount - 2)
                  ) {
                    return (
                      <PaginationItem key={page}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    );
                  }
                  
                  return null;
                })}
                
                <PaginationItem>
                  <PaginationNext 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < pageCount) setCurrentPage(currentPage + 1);
                    }}
                    className={currentPage === pageCount ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
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

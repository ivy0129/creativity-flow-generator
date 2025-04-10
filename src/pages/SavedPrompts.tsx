
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Search, Trash2, LogIn, Download, Upload, Home, Bookmark, Info, Share2 } from 'lucide-react';
import { useFirestorePrompts } from '@/hooks/useFirestorePrompts';
import TagInput from '@/components/TagInput';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/useLanguage';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from '@/hooks/use-mobile';

const SavedPrompts = () => {
  const { prompts, loading, deletePrompt, updatePromptTags, exportPrompts, importPrompts } = useFirestorePrompts();
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  const { t, language } = useLanguage();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  // 处理文件导入
  const handleFileImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      await importPrompts(file);
    }
  };

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: t('copied'),
      description: t('copiedToClipboard'),
    });
  };
  
  // 添加分享功能
  const handleShare = (content: string) => {
    const shareText = `${content}\n\n${language === 'zh' ? '通过 MyPromptDoctor 优化: ' : 'Optimized by MyPromptDoctor: '}https://mypromptdoctor.com`;
    
    navigator.clipboard.writeText(shareText);
    toast({
      title: language === 'zh' ? '已复制到剪贴板' : 'Copied to clipboard',
      description: language === 'zh' ? '提示词和链接已复制到剪贴板' : 'The prompt and link have been copied to your clipboard',
    });
  };

  const filteredPrompts = prompts.filter(prompt => 
    prompt.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prompt.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen flex flex-col bg-background hero-gradient">
      <SEO 
        title={t('savedPrompts')}
        description={t('savedPromptsDesc')}
        url="https://mypromptdoctor.com/saved"
      />
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 pb-16 md:pb-8">
        <section className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6 gradient-text">
            {t('savedPrompts')}
          </h1>
          
          {!isAuthenticated ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground mb-4">
                {t('loginToSavePrompts')}
              </p>
              <Button onClick={() => navigate('/auth')}>
                <LogIn className="mr-2 h-4 w-4" />
                {t('login')}
              </Button>
            </Card>
          ) : (
            <div className="mb-8">
              <div className="flex justify-between items-center mb-6">
                <div className="relative flex-1 mr-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input 
                    placeholder={t('searchPromptsOrTags')}
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={exportPrompts}
                    className="flex items-center"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    {language === 'zh' ? '导出' : 'Export'}
                  </Button>
                  <label htmlFor="import-file">
                    <Button
                      variant="outline"
                      className="flex items-center cursor-pointer"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      {language === 'zh' ? '导入' : 'Import'}
                    </Button>
                    <input
                      id="import-file"
                      type="file"
                      accept=".json"
                      className="hidden"
                      onChange={handleFileImport}
                    />
                  </label>
                </div>
              </div>

              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((_, i) => (
                    <Card key={i} className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <Skeleton className="h-6 w-32 mb-2" />
                        <div className="flex space-x-2">
                          <Skeleton className="h-8 w-8" />
                          <Skeleton className="h-8 w-8" />
                        </div>
                      </div>
                      <Skeleton className="h-24 w-full" />
                    </Card>
                  ))}
                </div>
              ) : filteredPrompts.length === 0 ? (
                <Card className="p-8 text-center">
                  <p className="text-muted-foreground mb-2">
                    {searchTerm ? t('noMatchingPrompts') : t('noSavedPrompts')}
                  </p>
                  {searchTerm && (
                    <p className="text-sm text-muted-foreground">
                      {t('tryDifferentSearch')}
                    </p>
                  )}
                </Card>
              ) : (
                <div className="space-y-4">
                  {filteredPrompts.map((prompt) => (
                    <Card key={prompt.id} className="p-4 shadow-md hover:shadow-lg transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <TagInput 
                          tags={prompt.tags} 
                          onChange={(newTags) => prompt.id && updatePromptTags(prompt.id, newTags)} 
                        />
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(prompt.content)}
                          >
                            <Copy className="h-4 w-4" />
                            <span className="sr-only md:not-sr-only md:inline ml-1">{t('copy')}</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleShare(prompt.content)}
                          >
                            <Share2 className="h-4 w-4" />
                            <span className="sr-only md:not-sr-only md:inline ml-1">{language === 'zh' ? '分享' : 'Share'}</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => prompt.id && deletePrompt(prompt.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only md:not-sr-only md:inline ml-1">{t('delete')}</span>
                          </Button>
                        </div>
                      </div>
                      <div className="bg-muted rounded-md p-4 whitespace-pre-wrap">
                        {prompt.content}
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
        </section>
      </main>
      
      {/* 移动端底部导航栏 */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border flex justify-around items-center h-16 shadow-lg z-30">
          <Link to="/" className="flex flex-1 flex-col items-center justify-center h-full text-muted-foreground hover:text-primary">
            <Home className="h-5 w-5 mb-1" />
            <span className="text-xs">{t('home')}</span>
          </Link>
          <Link to="/saved" className="flex flex-1 flex-col items-center justify-center h-full text-primary">
            <Bookmark className="h-5 w-5 mb-1" />
            <span className="text-xs">{t('savedPrompts')}</span>
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

export default SavedPrompts;


import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Search, Trash2, LogIn, Download, Upload } from 'lucide-react';
import { useFirestorePrompts } from '@/hooks/useFirestorePrompts';
import TagInput from '@/components/TagInput';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/useLanguage';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import SEO from '@/components/SEO';
import { Skeleton } from "@/components/ui/skeleton";

const SavedPrompts = () => {
  const { prompts, loading, deletePrompt, updatePromptTags, exportPrompts, importPrompts } = useFirestorePrompts();
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  const { t, language } = useLanguage();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

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
      
      <main className="flex-1 container mx-auto px-4 py-8">
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
      
      <Footer />
    </div>
  );
};

export default SavedPrompts;

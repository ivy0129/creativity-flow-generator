
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Search, Trash2, LogIn } from 'lucide-react';
import { useSavedPrompts } from '@/hooks/useSavedPrompts';
import TagInput from '@/components/TagInput';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/useLanguage';
import { useAuth } from '@/hooks/useAuth';

const SavedPrompts = () => {
  const { savedPrompts, removeSavedPrompt, updatePromptTags } = useSavedPrompts();
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  const { t } = useLanguage();
  const { isAuthenticated, login } = useAuth();

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: t('copied'),
      description: t('copiedToClipboard'),
    });
  };

  const filteredPrompts = savedPrompts.filter(prompt => 
    prompt.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prompt.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen flex flex-col bg-background hero-gradient">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <section className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6 gradient-text text-center">
            {t('savedPrompts')}
          </h1>
          
          {!isAuthenticated ? (
            <Card className="p-8 text-center mb-8">
              <p className="text-muted-foreground mb-4">
                {t('loginToViewSavedPrompts')}
              </p>
              <Button onClick={() => login('github')} className="gradient-bg text-white gap-2">
                <LogIn className="h-4 w-4" />
                {t('login')}
              </Button>
            </Card>
          ) : (
            <div className="mb-8">
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder={t('searchPromptsOrTags')}
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {filteredPrompts.length === 0 ? (
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
                  {filteredPrompts.map((prompt, index) => (
                    <Card key={index} className="p-4 shadow-md hover:shadow-lg transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <TagInput 
                          tags={prompt.tags} 
                          onChange={(newTags) => updatePromptTags(index, newTags)} 
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
                            onClick={() => removeSavedPrompt(index)}
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

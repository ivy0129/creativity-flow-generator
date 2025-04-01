
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, ArrowLeft, Trash2, Tag as TagIcon } from 'lucide-react';
import { useSavedPrompts } from '@/hooks/useSavedPrompts';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/useLanguage';
import TagInput from '@/components/TagInput';

const TagPage = () => {
  const { tagName } = useParams<{ tagName: string }>();
  const { savedPrompts, removeSavedPrompt, updatePromptTags } = useSavedPrompts();
  const { toast } = useToast();
  const { t, language } = useLanguage();
  
  // Filter prompts by the tag from URL
  const filteredPrompts = savedPrompts.filter(prompt => 
    prompt.tags.some(t => t.toLowerCase() === tagName?.toLowerCase())
  );

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: t('copied'),
      description: t('copiedToClipboard'),
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background hero-gradient">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto mb-6">
          <Link 
            to="/saved" 
            className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('backToSavedPrompts')}
          </Link>
          
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-primary/10 p-3 rounded-full">
              <TagIcon className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold gradient-text">
              {tagName}
            </h1>
          </div>
          
          <p className="text-muted-foreground mb-8">
            {t('promptsTaggedWith')} <span className="font-semibold">"{tagName}"</span>
          </p>

          {filteredPrompts.length === 0 ? (
            <div className="text-center py-12 bg-muted/50 rounded-lg">
              <TagIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">
                {t('noPromptsWithTag')}
              </p>
            </div>
          ) : (
            <div className="space-y-4 mb-8">
              <p className="text-sm text-muted-foreground">
                {filteredPrompts.length} {filteredPrompts.length === 1 ? t('prompt') : t('prompts')}
              </p>
              {filteredPrompts.map((prompt, index) => {
                const originalIndex = savedPrompts.findIndex(p => 
                  p.content === prompt.content && 
                  p.createdAt === prompt.createdAt
                );
                
                return (
                  <Card key={index} className="p-4 shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <TagInput 
                        tags={prompt.tags} 
                        onChange={(newTags) => updatePromptTags(originalIndex, newTags)} 
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
                          onClick={() => removeSavedPrompt(originalIndex)}
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
                );
              })}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TagPage;

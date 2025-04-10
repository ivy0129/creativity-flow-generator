
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, ArrowLeft, Trash2, Tag as TagIcon } from 'lucide-react';
import { useFirestorePrompts } from '@/hooks/useFirestorePrompts';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/useLanguage';
import TagInput from '@/components/TagInput';
import SEO from '@/components/SEO';

const TaggedPrompts = () => {
  const { tag } = useParams<{ tag: string }>();
  const { prompts, deletePrompt, updatePromptTags } = useFirestorePrompts();
  const { toast } = useToast();
  const { t, language } = useLanguage();
  
  // Filter prompts by the tag from URL
  const filteredPrompts = prompts.filter(prompt => 
    prompt.tags.some(t => t.toLowerCase() === tag?.toLowerCase())
  );

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: t('copied'),
      description: t('copiedToClipboard'),
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO 
        title={`${t('promptsTaggedWith')} "${tag}"`}
        description={`${t('promptsTaggedWith')} "${tag}"`}
      />
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Link 
            to="/saved"
            className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('backToSavedPrompts')}
          </Link>
          
          <h1 className="text-3xl font-bold mb-6 flex items-center">
            <TagIcon className="h-8 w-8 mr-2 text-primary" />
            {t('promptsTaggedWith')} "{tag}"
          </h1>

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
      </main>
      
      <Footer />
    </div>
  );
};

export default TaggedPrompts;

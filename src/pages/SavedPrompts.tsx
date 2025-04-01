
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Search, Trash2, Tags } from 'lucide-react';
import { useSavedPrompts } from '@/hooks/useSavedPrompts';
import TagInput from '@/components/TagInput';
import TagsExplorer from '@/components/TagsExplorer';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/useLanguage';

const SavedPrompts = () => {
  const { savedPrompts, removeSavedPrompt, updatePromptTags } = useSavedPrompts();
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  const { t } = useLanguage();

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
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-8 gradient-text text-center">
            {t('savedPrompts')}
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Sidebar with tags */}
            <div className="md:col-span-1">
              <div className="space-y-6 sticky top-8">
                <Card className="p-4 shadow-sm bg-white overflow-hidden">
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input 
                      placeholder={t('searchPromptsOrTags')}
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    {t('totalPrompts')}: <span className="font-medium text-foreground">{savedPrompts.length}</span>
                  </div>
                </Card>

                {savedPrompts.length > 0 && (
                  <TagsExplorer />
                )}
              </div>
            </div>
            
            {/* Main content */}
            <div className="md:col-span-3">
              {filteredPrompts.length === 0 ? (
                <Card className="p-8 text-center">
                  <div className="flex flex-col items-center justify-center py-12 space-y-4">
                    <Tags className="h-12 w-12 text-muted-foreground/50" />
                    <h3 className="text-xl font-medium">
                      {searchTerm ? t('noMatchingPrompts') : t('noSavedPrompts')}
                    </h3>
                    <p className="text-muted-foreground max-w-md">
                      {searchTerm 
                        ? t('tryDifferentSearch')
                        : t('savePromptsDesc')}
                    </p>
                  </div>
                </Card>
              ) : (
                <div className="space-y-6">
                  {filteredPrompts.map((prompt, index) => (
                    <Card key={index} className="overflow-hidden border-0 shadow-md">
                      <div className="border-b p-4 bg-muted/20">
                        <TagInput 
                          tags={prompt.tags} 
                          onChange={(newTags) => updatePromptTags(index, newTags)} 
                        />
                      </div>
                      <div className="p-4 whitespace-pre-wrap text-sm">
                        {prompt.content}
                      </div>
                      <div className="p-4 border-t flex justify-between items-center bg-muted/10">
                        <div className="text-xs text-muted-foreground">
                          {new Date(prompt.createdAt).toLocaleDateString()}
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(prompt.content)}
                            className="text-xs"
                          >
                            <Copy className="h-3 w-3 mr-1" />
                            {t('copy')}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeSavedPrompt(index)}
                            className="text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            {t('delete')}
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SavedPrompts;

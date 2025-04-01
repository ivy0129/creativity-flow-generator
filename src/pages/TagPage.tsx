
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Copy, ArrowLeft, Tag as TagIcon, Search } from 'lucide-react';
import { useSavedPrompts } from '@/hooks/useSavedPrompts';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/useLanguage';

const TagPage = () => {
  const { tagName } = useParams<{ tagName: string }>();
  const { savedPrompts } = useSavedPrompts();
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  const { t, language } = useLanguage();
  
  // Get all unique tags from saved prompts
  const allTags = Array.from(
    new Set(
      savedPrompts.flatMap(prompt => prompt.tags)
    )
  ).sort();

  // Filter prompts by the current tag
  const promptsWithTag = savedPrompts.filter(
    prompt => prompt.tags.includes(tagName || '')
  );
  
  // Further filter by search term if provided
  const filteredPrompts = promptsWithTag.filter(
    prompt => prompt.content.toLowerCase().includes(searchTerm.toLowerCase())
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
        <section className="max-w-5xl mx-auto mb-12">
          <div className="mb-8">
            <Link to="/saved" className="inline-flex items-center text-primary hover:underline mb-4">
              <ArrowLeft className="h-4 w-4 mr-1" />
              {t('backToSavedPrompts')}
            </Link>
            
            <div className="flex items-center gap-2 mb-4">
              <TagIcon className="h-6 w-6 text-primary" />
              <h1 className="text-3xl sm:text-4xl font-bold gradient-text">
                {tagName}
              </h1>
            </div>
            
            <p className="text-muted-foreground mb-6">
              {language === 'zh' 
                ? `${filteredPrompts.length} 个与 "${tagName}" 相关的提示词` 
                : `${filteredPrompts.length} prompts with the "${tagName}" tag`}
            </p>
          </div>
          
          {/* Search bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder={t('searchPrompts')}
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Related tags */}
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-3">
              {t('relatedTags')}
            </h2>
            <div className="flex flex-wrap gap-2">
              {allTags.filter(tag => tag !== tagName).map(tag => (
                <Link to={`/tags/${tag}`} key={tag}>
                  <Badge variant="secondary" className="text-sm py-1 px-2 cursor-pointer hover:bg-secondary/80">
                    {tag}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Prompt list */}
          {filteredPrompts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {searchTerm 
                  ? language === 'zh' ? `没有与"${searchTerm}"匹配的提示词` : `No prompts matching "${searchTerm}"` 
                  : language === 'zh' ? `没有带有"${tagName}"标签的提示词` : `No prompts with the "${tagName}" tag`}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredPrompts.map((prompt, index) => (
                <Card key={index} className="p-4 shadow-md">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {prompt.tags.map(tag => (
                      <Link to={`/tags/${tag}`} key={tag}>
                        <Badge 
                          variant={tag === tagName ? "default" : "secondary"} 
                          className="cursor-pointer"
                        >
                          {tag}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                  
                  <div className="bg-muted rounded-md p-4 whitespace-pre-wrap">
                    {prompt.content}
                  </div>
                  
                  <div className="mt-3 flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(prompt.content)}
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      {t('copy')}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default TagPage;


import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, ArrowLeft, Trash2, Tag as TagIcon, Tags } from 'lucide-react';
import { useSavedPrompts } from '@/hooks/useSavedPrompts';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/useLanguage';
import TagInput from '@/components/TagInput';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

const TagPage = () => {
  const { tagName } = useParams<{ tagName: string }>();
  const { savedPrompts, removeSavedPrompt, updatePromptTags } = useSavedPrompts();
  const { toast } = useToast();
  const { t, language } = useLanguage();
  
  // Filter prompts by the tag from URL
  const filteredPrompts = savedPrompts.filter(prompt => 
    prompt.tags.some(t => t.toLowerCase() === tagName?.toLowerCase())
  );

  // Count occurrences of each tag across all prompts to show related tags
  const tagCounts: Record<string, number> = {};
  savedPrompts.forEach(prompt => {
    prompt.tags.forEach(tag => {
      if (tag.toLowerCase() !== tagName?.toLowerCase()) {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      }
    });
  });
  
  // Get top 5 related tags
  const relatedTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([tag, count]) => ({ tag, count }));

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
        <div className="max-w-4xl mx-auto">
          <Link 
            to="/saved" 
            className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('backToSavedPrompts')}
          </Link>
          
          <h1 className="text-4xl font-bold text-center gradient-text mb-12">
            {language === 'zh' ? '已保存的提示词' : 'Saved Prompts'}
          </h1>
          
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Tags className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">
                {language === 'zh' ? '热门标签' : 'Popular Tags'}
              </h2>
            </div>
            
            <div className="flex flex-wrap gap-3 mb-6">
              <Link to={`/tags/${tagName}`} key={tagName}>
                <Badge 
                  className="py-2 px-4 text-sm bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {tagName} <span className="ml-1 text-xs bg-white/20 rounded-full px-2">{filteredPrompts.length}</span>
                </Badge>
              </Link>
              
              {relatedTags.map(({ tag, count }) => (
                <Link to={`/tags/${tag}`} key={tag}>
                  <Badge 
                    variant="secondary" 
                    className="py-2 px-4 text-sm hover:bg-secondary/80"
                  >
                    {tag} <span className="ml-1 text-xs opacity-70">({count})</span>
                  </Badge>
                </Link>
              ))}
            </div>
            
            <div className="relative mb-6">
              <Input 
                placeholder={language === 'zh' ? "搜索提示词或标签..." : "Search prompts or tags..."}
                className="pl-10 bg-white"
              />
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" 
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {filteredPrompts.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <TagIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">
                {t('noPromptsWithTag')}
              </p>
            </div>
          ) : (
            <div className="space-y-6 mb-8">
              <p className="text-sm text-muted-foreground">
                {filteredPrompts.length} {filteredPrompts.length === 1 ? t('prompt') : t('prompts')}
              </p>
              
              {filteredPrompts.map((prompt, index) => {
                const originalIndex = savedPrompts.findIndex(p => 
                  p.content === prompt.content && 
                  p.createdAt === prompt.createdAt
                );
                
                return (
                  <Card key={index} className="p-6 shadow-sm bg-white hover:shadow-md transition-shadow">
                    <div className="flex flex-col gap-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-2">
                          <TagIcon className="h-5 w-5 text-primary mt-1" />
                          <TagInput 
                            tags={prompt.tags} 
                            onChange={(newTags) => updatePromptTags(originalIndex, newTags)} 
                          />
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(prompt.content)}
                            className="bg-white"
                          >
                            <Copy className="h-4 w-4" />
                            <span className="sr-only md:not-sr-only md:inline ml-1">{t('copy')}</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeSavedPrompt(originalIndex)}
                            className="bg-white"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only md:not-sr-only md:inline ml-1">{t('delete')}</span>
                          </Button>
                        </div>
                      </div>
                      
                      <div className="bg-muted/30 rounded-md p-4 whitespace-pre-wrap border border-muted">
                        {prompt.content}
                      </div>
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

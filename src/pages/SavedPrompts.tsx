
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Search, Trash2 } from 'lucide-react';
import { useSavedPrompts } from '@/hooks/useSavedPrompts';
import TagInput from '@/components/TagInput';
import { useToast } from '@/hooks/use-toast';

const SavedPrompts = () => {
  const { savedPrompts, removeSavedPrompt, updatePromptTags } = useSavedPrompts();
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: "已复制到剪贴板",
      description: "您现在可以将提示词粘贴到任何地方",
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
        <section className="max-w-4xl mx-auto mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6 gradient-text text-center">
            已保存的提示词
          </h1>
          
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="搜索提示词或标签..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {filteredPrompts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {searchTerm ? "没有找到匹配的提示词" : "您还没有保存任何提示词"}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredPrompts.map((prompt, index) => (
                <Card key={index} className="p-4 shadow-md">
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
                        <span className="sr-only md:not-sr-only md:inline ml-1">复制</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeSavedPrompt(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only md:not-sr-only md:inline ml-1">删除</span>
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
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default SavedPrompts;


import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Key, Save, Trash2, AlertTriangle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';

const formSchema = z.object({
  apiKey: z.string().min(1, "API密钥不能为空"),
});

const Settings = () => {
  const { toast } = useToast();
  const { isAuthenticated, user } = useAuth();
  const { t } = useLanguage();
  const [usageCount, setUsageCount] = useState(0);
  const [usageLimit, setUsageLimit] = useState(3);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      apiKey: "",
    },
  });

  // 加载保存的API密钥
  useEffect(() => {
    const savedApiKey = localStorage.getItem('openai_api_key') || "";
    form.setValue('apiKey', savedApiKey);
    
    // 加载使用情况
    if (isAuthenticated && user) {
      const userUsage = localStorage.getItem(`prompt_optimizer_usage_${user.id}`);
      if (userUsage) {
        setUsageCount(parseInt(userUsage, 10));
      }
      
      // 设置用户限制
      if (user.isPremium) {
        setUsageLimit(10);
      }
    }
  }, [form, isAuthenticated, user]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    localStorage.setItem('openai_api_key', values.apiKey);
    toast({
      title: "已保存",
      description: "您的API密钥已成功保存",
    });
  };

  const clearApiKey = () => {
    localStorage.removeItem('openai_api_key');
    form.setValue('apiKey', "");
    toast({
      title: "已删除",
      description: "您的API密钥已从本地存储中删除",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">设置</h1>
        
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Key className="mr-2 h-5 w-5" />
            API 设置
          </h2>
          <p className="text-muted-foreground mb-6">
            提供您的API密钥以启用提示词优化功能。您的密钥存储在本地设备上，从不传输到我们的服务器。
          </p>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="apiKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>OpenAI API 密钥</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="sk-..."
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      您可以在 <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">OpenAI 控制台</a> 创建API密钥
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex space-x-2">
                <Button type="submit" className="gap-2">
                  <Save className="h-4 w-4" />
                  保存
                </Button>
                <Button type="button" variant="destructive" onClick={clearApiKey} className="gap-2">
                  <Trash2 className="h-4 w-4" />
                  删除
                </Button>
              </div>
            </form>
          </Form>
        </Card>
        
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">使用情况</h2>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium">已使用次数</p>
              <p className="text-2xl font-bold">{usageCount} / {usageLimit}</p>
            </div>
            
            <Separator />
            
            {usageCount >= usageLimit && (
              <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-md p-4 flex items-start">
                <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mr-3 mt-0.5" />
                <div>
                  <h3 className="font-medium text-yellow-800 dark:text-yellow-300">已达到限制</h3>
                  <p className="text-sm text-yellow-700 dark:text-yellow-400 mt-1">
                    您已达到免费使用次数限制。请升级到高级账户以获取更多使用次数。
                  </p>
                </div>
              </div>
            )}
            
            <Button className="w-full gradient-bg text-white hover:opacity-90 transition-opacity" disabled={user?.isPremium}>
              {user?.isPremium ? "已升级到高级账户" : "升级到高级账户"}
            </Button>
          </div>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default Settings;

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Wand2, LogIn } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface PromptFormProps {
  onSubmit: (promptData: PromptData) => void;
  isLoading: boolean;
}

export interface PromptData {
  prompt: string;
  tone: string;
  length: number;
  creativity: number;
}

const PromptForm: React.FC<PromptFormProps> = ({ onSubmit, isLoading }) => {
  const { isAuthenticated, login } = useAuth();
  const { toast } = useToast();
  const [promptData, setPromptData] = useState<PromptData>({
    prompt: '',
    tone: '步骤化',
    length: 200,
    creativity: 70,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast({
        title: "需要登录",
        description: "请先登录以使用提示词优化功能",
      });
      return;
    }
    
    onSubmit(promptData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPromptData({ ...promptData, prompt: e.target.value });
  };

  const handleToneChange = (value: string) => {
    setPromptData({ ...promptData, tone: value });
  };

  const handleLengthChange = (value: number[]) => {
    setPromptData({ ...promptData, length: value[0] });
  };

  const handleCreativityChange = (value: number[]) => {
    setPromptData({ ...promptData, creativity: value[0] });
  };

  const handleOptimizeClick = () => {
    if (!isAuthenticated) {
      login('github');
    }
  };

  return (
    <Card className="w-full p-6 shadow-lg prompt-shadow animate-fade-in">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="prompt" className="text-base font-medium">
            描述您需要的功能或问题
          </Label>
          <Textarea
            id="prompt"
            placeholder="例如：我想创建一个用户登录页面，需要包含用户名和密码字段，以及登录和注册按钮..."
            value={promptData.prompt}
            onChange={handleInputChange}
            className="min-h-[120px] resize-none border-input focus:border-primary focus:ring-1 focus:ring-primary"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="tone" className="text-base font-medium">
              提示词风格
            </Label>
            <Select value={promptData.tone} onValueChange={handleToneChange}>
              <SelectTrigger id="tone" className="w-full">
                <SelectValue placeholder="选择风格" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="技术性">技术性</SelectItem>
                <SelectItem value="教学性">教学性</SelectItem>
                <SelectItem value="简洁明了">简洁明了</SelectItem>
                <SelectItem value="详细解释">详细解释</SelectItem>
                <SelectItem value="步骤化">步骤化</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="length" className="text-base font-medium">
                提示词长度
              </Label>
              <span className="text-sm text-muted-foreground">{promptData.length} 字</span>
            </div>
            <Slider
              id="length"
              value={[promptData.length]}
              onValueChange={handleLengthChange}
              min={50}
              max={500}
              step={50}
              className="py-1"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="creativity" className="text-base font-medium">
              复杂度
            </Label>
            <span className="text-sm text-muted-foreground">{promptData.creativity}%</span>
          </div>
          <Slider
            id="creativity"
            value={[promptData.creativity]}
            onValueChange={handleCreativityChange}
            min={0}
            max={100}
            step={10}
            className="py-1"
          />
        </div>

        <Button 
          type="submit" 
          className="w-full gradient-bg text-white hover:opacity-90 transition-opacity gap-2"
          disabled={isLoading}
          onClick={!isAuthenticated ? handleOptimizeClick : undefined}
        >
          {!isAuthenticated ? (
            <LogIn className="h-4 w-4" />
          ) : (
            <Wand2 className="h-4 w-4" />
          )}
          {isLoading 
            ? "优化中..." 
            : !isAuthenticated 
              ? "登录以优化提示词" 
              : "优化提示词"
          }
        </Button>
      </form>
    </Card>
  );
};

export default PromptForm;

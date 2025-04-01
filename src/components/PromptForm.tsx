
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
import { useLanguage } from '@/hooks/useLanguage';

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
  const { language, t } = useLanguage();
  
  const [promptData, setPromptData] = useState<PromptData>({
    prompt: '',
    tone: language === 'zh' ? '技术性' : 'Technical',
    length: 200,
    creativity: 70,
  });

  // Update tone when language changes
  React.useEffect(() => {
    // Map between English and Chinese tones
    const toneMap: Record<string, string> = {
      '技术性': 'Technical',
      '教学性': 'Educational',
      '简洁明了': 'Concise',
      '详细解释': 'Detailed',
      '步骤化': 'Step-by-step',
      'Technical': '技术性',
      'Educational': '教学性',
      'Concise': '简洁明了',
      'Detailed': '详细解释',
      'Step-by-step': '步骤化'
    };
    
    // When language changes, update the tone value if it's in the map
    if (toneMap[promptData.tone]) {
      setPromptData(prev => ({
        ...prev,
        tone: language === 'zh' ? 
          (toneMap[prev.tone] && toneMap[prev.tone].includes('性') ? toneMap[prev.tone] : '技术性') :
          (toneMap[prev.tone] && !toneMap[prev.tone].includes('性') ? toneMap[prev.tone] : 'Technical')
      }));
    }
  }, [language]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast({
        title: language === 'zh' ? "需要登录" : "Login Required",
        description: language === 'zh' ? "请先登录以使用提示词优化功能" : "Please login to use the prompt optimizer",
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

  // Get tone options based on current language
  const getToneOptions = () => {
    if (language === 'zh') {
      return [
        { value: '技术性', label: '技术性' },
        { value: '教学性', label: '教学性' },
        { value: '简洁明了', label: '简洁明了' },
        { value: '详细解释', label: '详细解释' },
        { value: '步骤化', label: '步骤化' }
      ];
    } else {
      return [
        { value: 'Technical', label: 'Technical' },
        { value: 'Educational', label: 'Educational' },
        { value: 'Concise', label: 'Concise' },
        { value: 'Detailed', label: 'Detailed' },
        { value: 'Step-by-step', label: 'Step-by-step' }
      ];
    }
  };

  const placeholderText = language === 'zh'
    ? "例如：我想创建一个用户登录页面，需要包含用户名和密码字段，以及登录和注册按钮..."
    : "Example: I want to create a user login page with username and password fields, plus login and register buttons...";

  return (
    <Card className="w-full p-6 shadow-lg prompt-shadow animate-fade-in">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="prompt" className="text-base font-medium">
            {language === 'zh' ? "描述您需要的功能或问题" : "Describe your needed functionality or problem"}
          </Label>
          <Textarea
            id="prompt"
            placeholder={placeholderText}
            value={promptData.prompt}
            onChange={handleInputChange}
            className="min-h-[120px] resize-none border-input focus:border-primary focus:ring-1 focus:ring-primary"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="tone" className="text-base font-medium">
              {language === 'zh' ? "提示词风格" : "Prompt Style"}
            </Label>
            <Select value={promptData.tone} onValueChange={handleToneChange}>
              <SelectTrigger id="tone" className="w-full">
                <SelectValue placeholder={language === 'zh' ? "选择风格" : "Select style"} />
              </SelectTrigger>
              <SelectContent>
                {getToneOptions().map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="length" className="text-base font-medium">
                {language === 'zh' ? "提示词长度" : "Prompt Length"}
              </Label>
              <span className="text-sm text-muted-foreground">
                {promptData.length} {language === 'zh' ? "字" : "chars"}
              </span>
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
              {language === 'zh' ? "复杂度" : "Complexity"}
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
            ? (language === 'zh' ? "优化中..." : "Optimizing...") 
            : !isAuthenticated 
              ? (language === 'zh' ? "登录以优化提示词" : "Login to optimize prompt") 
              : (language === 'zh' ? "优化提示词" : "Optimize Prompt")
          }
        </Button>
      </form>
    </Card>
  );
};

export default PromptForm;

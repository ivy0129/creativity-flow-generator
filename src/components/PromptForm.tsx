
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Wand2 } from 'lucide-react';

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
  const [promptData, setPromptData] = useState<PromptData>({
    prompt: '',
    tone: '专业',
    length: 200,
    creativity: 70,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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

  return (
    <Card className="w-full p-6 shadow-lg prompt-shadow animate-fade-in">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="prompt" className="text-base font-medium">
            输入您的主题或提示
          </Label>
          <Textarea
            id="prompt"
            placeholder="例如：写一篇关于人工智能如何改变教育领域的文章..."
            value={promptData.prompt}
            onChange={handleInputChange}
            className="min-h-[120px] resize-none border-input focus:border-primary focus:ring-1 focus:ring-primary"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="tone" className="text-base font-medium">
              语调
            </Label>
            <Select value={promptData.tone} onValueChange={handleToneChange}>
              <SelectTrigger id="tone" className="w-full">
                <SelectValue placeholder="选择语调" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="专业">专业</SelectItem>
                <SelectItem value="友好">友好</SelectItem>
                <SelectItem value="幽默">幽默</SelectItem>
                <SelectItem value="严肃">严肃</SelectItem>
                <SelectItem value="鼓舞人心">鼓舞人心</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="length" className="text-base font-medium">
                长度
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
              创意程度
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
        >
          <Wand2 className="h-4 w-4" />
          {isLoading ? "生成中..." : "生成创意内容"}
        </Button>
      </form>
    </Card>
  );
};

export default PromptForm;

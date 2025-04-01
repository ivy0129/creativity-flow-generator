
import React, { useState, KeyboardEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Tag } from 'lucide-react';

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
}

const TagInput: React.FC<TagInputProps> = ({ tags, onChange }) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue) {
      e.preventDefault();
      if (!tags.includes(inputValue.trim())) {
        onChange([...tags, inputValue.trim()]);
      }
      setInputValue('');
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      onChange(tags.slice(0, -1));
    }
  };

  const removeTag = (indexToRemove: number) => {
    onChange(tags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="flex flex-wrap items-center gap-2 mb-2">
      <Tag className="h-4 w-4 text-muted-foreground" />
      {tags.map((tag, index) => (
        <div 
          key={index} 
          className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-sm flex items-center gap-1"
        >
          {tag}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-4 w-4 p-0"
            onClick={() => removeTag(index)}
          >
            <X className="h-3 w-3" />
            <span className="sr-only">删除标签</span>
          </Button>
        </div>
      ))}
      <Input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 min-w-[120px] h-8"
        placeholder="添加标签..."
      />
    </div>
  );
};

export default TagInput;

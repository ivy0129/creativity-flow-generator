
import React, { useState, KeyboardEvent } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Tag } from 'lucide-react';

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  readonly?: boolean;
}

const TagInput: React.FC<TagInputProps> = ({ tags, onChange, readonly = false }) => {
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
    <div className="flex flex-wrap items-center gap-2">
      {tags.map((tag, index) => (
        <div 
          key={index} 
          className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs flex items-center gap-1"
        >
          {readonly ? (
            <Link to={`/tags/${tag}`} className="hover:underline">
              {tag}
            </Link>
          ) : (
            <span>{tag}</span>
          )}
          
          {!readonly && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-4 w-4 p-0 hover:bg-primary/20 rounded-full"
              onClick={() => removeTag(index)}
            >
              <X className="h-3 w-3" />
              <span className="sr-only">删除标签</span>
            </Button>
          )}
        </div>
      ))}
      {!readonly && (
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 min-w-[180px] h-8 placeholder:text-muted-foreground/60 border-dashed"
          placeholder="添加标签..."
        />
      )}
    </div>
  );
};

export default TagInput;

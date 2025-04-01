
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tags } from 'lucide-react';
import { useSavedPrompts } from '@/hooks/useSavedPrompts';
import { useLanguage } from '@/hooks/useLanguage';

const TagsExplorer: React.FC = () => {
  const { savedPrompts } = useSavedPrompts();
  const { t, language } = useLanguage();
  
  // Count occurrences of each tag
  const tagCounts: Record<string, number> = {};
  savedPrompts.forEach(prompt => {
    prompt.tags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });
  
  // Convert to array, sort by count (descending), and limit to top 10
  const sortedTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)  // Only take the top 10 tags
    .map(([tag, count]) => ({ tag, count }));
  
  if (sortedTags.length === 0) {
    return null;
  }

  return (
    <Card className="p-4 shadow-sm bg-white">
      <div className="flex items-center gap-2 mb-4">
        <Tags className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">
          {language === 'zh' ? '热门标签' : 'Popular Tags'}
        </h2>
      </div>
      
      <div className="flex flex-wrap gap-3">
        {sortedTags.map(({ tag, count }) => (
          <Link to={`/tags/${tag}`} key={tag}>
            <Badge 
              variant="secondary" 
              className="py-2 px-4 text-sm cursor-pointer hover:bg-secondary/80"
            >
              {tag} <span className="ml-1 text-xs opacity-70">({count})</span>
            </Badge>
          </Link>
        ))}
      </div>
    </Card>
  );
};

export default TagsExplorer;

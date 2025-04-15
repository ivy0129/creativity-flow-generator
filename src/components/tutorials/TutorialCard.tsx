
import React from 'react';
import { Link } from 'react-router-dom';
import { AIPromptTutorial } from '@/data/ai-prompt-tutorials';

interface TutorialCardProps {
  tutorial: AIPromptTutorial;
  language: 'en' | 'zh';
}

const TutorialCard: React.FC<TutorialCardProps> = ({ tutorial, language }) => {
  return (
    <Link 
      to={`/tutorials/${tutorial.id}`} 
      className="block hover:no-underline"
    >
      <div className="border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200 h-full flex flex-col">
        {/* 图片容器，固定高度和宽度比例 */}
        {tutorial.imageUrl && (
          <div className="aspect-square overflow-hidden bg-muted">
            <img 
              src={tutorial.imageUrl} 
              alt={tutorial.title[language]}
              className="w-full h-full object-cover"
              width={1024}
              height={1024}
            />
          </div>
        )}
        
        <div className="p-4 flex flex-col flex-grow">
          {/* 文章标题 */}
          <h2 className="text-xl font-medium mb-2 line-clamp-2 text-foreground">
            {tutorial.title[language]}
          </h2>
          
          {/* 文章简介 */}
          <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-grow">
            {tutorial.excerpt[language]}
          </p>
          
          {/* 标签 */}
          <div className="flex flex-wrap gap-1 mt-auto">
            {tutorial.tags.slice(0, 3).map(tag => (
              <span key={tag} className="text-xs bg-muted px-2 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
            {tutorial.tags.length > 3 && (
              <span className="text-xs bg-muted px-2 py-0.5 rounded-full">
                +{tutorial.tags.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TutorialCard;


import React from 'react';
import { AIPromptTutorial } from '@/data/ai-prompt-tutorials';
import TutorialCard from './TutorialCard';

interface TutorialsListProps {
  tutorials: AIPromptTutorial[];
  language: 'en' | 'zh';
}

const TutorialsList: React.FC<TutorialsListProps> = ({ tutorials, language }) => {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">
          {language === 'en' ? 'AI Prompt Tutorials & Examples' : 'AI提示词教程和案例'}
        </h1>
        <p className="text-muted-foreground">
          {language === 'en' 
            ? 'Learn how to use AI prompts with our collection of tutorials and real-world examples' 
            : '通过我们收集的教程和真实案例学习如何使用AI提示词'}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tutorials.map((tutorial) => (
          <TutorialCard 
            key={tutorial.id} 
            tutorial={tutorial} 
            language={language} 
          />
        ))}
      </div>
    </div>
  );
};

export default TutorialsList;

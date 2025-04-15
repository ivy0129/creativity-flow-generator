
import React from 'react';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Lightbulb } from "lucide-react";

interface TutorialKeyPointsProps {
  keyPoints: string;
  language: 'en' | 'zh';
}

const TutorialKeyPoints: React.FC<TutorialKeyPointsProps> = ({ keyPoints, language }) => {
  // Split key points by newline and filter out empty lines
  const points = keyPoints.split('\n').filter(point => point.trim().length > 0);

  return (
    <div className="mb-8">
      <h2 className="text-xl font-medium mb-2">
        {language === 'en' ? 'Key Points:' : '注意事项：'}
      </h2>
      <Alert className="bg-muted/50">
        <AlertTitle className="flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-amber-500" />
          {language === 'en' ? 'For best results:' : '获得最佳效果：'}
        </AlertTitle>
        <AlertDescription>
          <ul className="mt-2 space-y-1.5 text-sm">
            {points.map((point, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-1.5 text-amber-500 font-medium">{index + 1}.</span>
                <span>{point.replace(/^\d+\.\s*/, '')}</span>
              </li>
            ))}
          </ul>
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default TutorialKeyPoints;

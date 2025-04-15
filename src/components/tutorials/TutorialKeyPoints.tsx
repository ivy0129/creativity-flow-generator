
import React from 'react';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

interface TutorialKeyPointsProps {
  keyPoints: string;
  language: 'en' | 'zh';
}

const TutorialKeyPoints: React.FC<TutorialKeyPointsProps> = ({ keyPoints, language }) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-medium mb-2">
        {language === 'en' ? 'Key Points:' : '注意事项：'}
      </h2>
      <Alert>
        <AlertTitle>
          {language === 'en' ? 'For best results:' : '获得最佳效果：'}
        </AlertTitle>
        <AlertDescription>
          <div className="whitespace-pre-wrap mt-2 text-sm">
            {keyPoints}
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default TutorialKeyPoints;

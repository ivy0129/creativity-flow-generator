
import { useState } from 'react';
import { PromptData } from '@/components/PromptForm';
import { useToast } from '@/hooks/use-toast';

// Some example creative responses for demo purposes
const creativeResponses = [
  `人工智能正在彻底改变教育领域，为师生提供前所未有的可能性。智能辅导系统能够根据每个学生的独特需求和学习风格提供个性化教学，使得教育不再是一刀切的方式。

AI驱动的评估工具可以即时分析学生表现，让教师能够更有效地调整教学策略。虚拟实验室和模拟环境让学生能够安全地探索复杂概念，不受物理限制。

然而，我们必须注意保持人类教师的核心角色，因为教育不仅仅是知识传递，还关乎情感连接和道德指导。面向未来，人工智能和人类教育工作者的合作将创造一个更加包容、高效和创新的学习环境。`,
  
  `创意写作是一门将想象力转化为文字的艺术，能够打开读者心灵的窗户，带他们进入全新的世界。成功的创意写作融合了鲜活的角色、引人入胜的情节和意境深远的主题。

当你开始创意写作之旅时，请记住"展示而非讲述"的原则，通过感官细节和具体描写让故事栩栩如生。寻找独特的视角和声音，这是使你的作品脱颖而出的关键。

不要害怕修改和重写，因为最精彩的作品往往诞生于多次打磨过程中。最后，保持好奇心和观察力，生活中的每一个瞬间都可能成为你下一个精彩故事的灵感来源。`,
  
  `可持续发展已经从一个理想变成了现代社会的必然选择。面对气候变化和资源枯竭的挑战，企业必须重新思考其商业模式和运营方式。

实施可持续发展战略不仅是环保责任，更是明智的商业决策。研究表明，注重可持续发展的公司往往享有更高的品牌价值、更强的消费者忠诚度和更佳的长期财务表现。

通过采用循环经济原则、减少碳足迹并支持可再生能源，企业可以降低成本、规避风险并开拓新市场。在未来的商业格局中，可持续发展将不再是锦上添花，而是生存和繁荣的基础。`,
  
  `数字化转型不仅仅是技术升级，它是组织思维方式和运营模式的根本变革。成功的数字化转型需要清晰的战略、全面的文化变革和持续的领导支持。

首先，了解您的客户需求和行业趋势，确定最具价值的数字化机会。其次，投资于人才发展和变革管理，因为技术本身只是转型的一部分，真正的挑战在于人和流程的适应。

最后，采用敏捷方法，通过小步快跑、快速学习的方式推进转型，而不是追求一步到位的完美方案。在这个数字化时代，组织的适应力和学习速度将决定其未来的竞争力。`
];

export const usePromptGenerator = () => {
  const [generatedContent, setGeneratedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResultVisible, setIsResultVisible] = useState(false);
  const { toast } = useToast();

  const generateContent = async (promptData: PromptData) => {
    setIsLoading(true);
    
    try {
      // In a real implementation, this would be an API call to a backend service
      // For this demo, we'll simulate an API call with a timeout and random response
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Get a random response based on creativity level
      const randomIndex = Math.floor(Math.random() * creativeResponses.length);
      let response = creativeResponses[randomIndex];
      
      // Adjust response based on length
      if (promptData.length < 200) {
        response = response.split('.').slice(0, 3).join('.') + '.';
      } else if (promptData.length > 300) {
        // For longer content, we would duplicate some sentences
        // In a real implementation, this would be handled by the AI model
        response = response + '\n\n' + response.split('.').slice(0, 2).join('.') + '.';
      }
      
      setGeneratedContent(response);
      setIsResultVisible(true);
    } catch (error) {
      console.error('Error generating content:', error);
      toast({
        title: "生成失败",
        description: "内容生成过程中出现错误，请稍后再试",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    generatedContent,
    isLoading,
    isResultVisible,
    generateContent,
  };
};

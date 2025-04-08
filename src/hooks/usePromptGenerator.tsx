import { useState, useEffect } from 'react';
import { PromptData } from '@/components/PromptForm';
import { useToast } from '@/hooks/use-toast';
import { optimizePrompt } from '@/utils/openaiClient';
import { useAuth } from '@/hooks/useAuth';

// 示例响应，作为备用或演示用途
const optimizedPrompts = [
  `我需要创建一个用户登录表单，具有以下要求：

1. 表单字段：
   - 用户名/邮箱输入框
   - 密码输入框（带显示/隐藏功能）
   - "记住我"复选框
   - 登录按钮
   - "忘记密码"链接

2. 验证要求：
   - 用户名/邮箱不能为空，且邮箱必须有效
   - 密码长度至少8个字符
   - 提交前验证所有字段

3. UI/UX要求：
   - 使用Material UI组件库
   - 响应式设计，适配移动端和桌面端
   - 表单提交时显示loading状态
   - 表单验证错误时显示适当的错误消息

请提供完整的React组件代码，使用TypeScript，并包含必要的样式和验证逻辑。`,
  
  `我想创建一个能够获取和显示GitHub用户仓库列表的功能。请帮我实现这个功能，具体要求如下：

1. 技术栈：
   - React/Next.js前端
   - 使用fetch或axios调用GitHub API
   - TypeScript类型定义

2. 功能需求：
   - 输入框用于搜索GitHub用户名
   - 点击搜索后显示该用户的公开仓库列表
   - 显示每个仓库的名称、描述、星数和最后更新时间
   - 支持按星数排序
   - 分页功能（如果用户有很多仓库）

3. 错误处理：
   - 处理用户不存在的情况
   - 处理API请求限制
   - 加载状态的显示

请提供完整的实现代码，包括组件、API调用函数和必要的类型定义。同时，简要说明如何处理GitHub API的认证问题以避免频率限制。`,
  
  `请帮我开发一个简单的待办事项管理应用的后端API，使用Node.js和Express框架。需要实现以下功能：

1. 数据模型：
   - 任务(Task)：id, 标题, 描述, 完成状态, 创建时间, 截止时间, 优先级

2. API端点：
   - GET /tasks - 获取所有任务列表
   - GET /tasks/:id - 获取单个任务详情
   - POST /tasks - 创建新任务
   - PUT /tasks/:id - 更新任务
   - DELETE /tasks/:id - 删除任务
   - GET /tasks/completed - 获取已完成任务
   - GET /tasks/pending - 获取未完成任务

3. 技术要求：
   - RESTful API设计
   - 适当的错误处理和状态码
   - 使用MongoDB作为数据库
   - 实现基本的输入验证

请提供完整的代码实现，包括路由配置、控制器逻辑、数据模型定义和必要的中间件。代码应当结构清晰，包含适当的注释。`,
  
  `我需要使用Vue.js开发一个天气查询应用。请帮我实现以下功能：

1. 界面要求：
   - 一个搜索框，用于输入城市名称
   - 显示当前天气信息：温度、湿度、风速、天气状况
   - 显示未来5天的天气预报
   - 响应式设计，适配不同设备

2. 功能细节：
   - 使用OpenWeatherMap API获取天气数据
   - 支持根据用户位置自动获取本地天气
   - 支持摄氏度/华氏度切换
   - 根据天气状况显示对应的图标
   - 记住用户最后查询的城市

3. 技术栈：
   - Vue 3组合式API
   - Vuex/Pinia状态管理
   - SCSS样式
   - Axios进行API调用

请提供主要组件的代码实现和项目结构建议。同时，简要说明如何处理API密钥的安全问题和跨域请求。`
];

const USER_LIMIT_KEY = 'prompt_optimizer_usage';
const DAILY_FREE_LIMIT = 10; // 免费用户每天10次
const DAILY_PREMIUM_LIMIT = 50; // 付费用户每天50次

export const usePromptGenerator = () => {
  const [generatedContent, setGeneratedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResultVisible, setIsResultVisible] = useState(false);
  const [usageCount, setUsageCount] = useState(0);
  const [usageLimit, setUsageLimit] = useState(DAILY_FREE_LIMIT);
  const { toast } = useToast();
  const { isAuthenticated, user } = useAuth();

  // 加载用户使用次数
  useEffect(() => {
    if (isAuthenticated && user) {
      // 获取当前日期作为使用记录的键
      const today = new Date().toISOString().split('T')[0]; // 格式: YYYY-MM-DD
      const usageKey = `${USER_LIMIT_KEY}_${user.id}_${today}`;
      
      // 从localStorage加载用户今日使用次数
      const userUsage = localStorage.getItem(usageKey);
      if (userUsage) {
        setUsageCount(parseInt(userUsage, 10));
      } else {
        setUsageCount(0);
        localStorage.setItem(usageKey, '0');
      }
      
      // 根据用户类型设置不同的使用限制
      if (user.isPremium) {
        setUsageLimit(DAILY_PREMIUM_LIMIT); // 付费用户限制
      } else {
        setUsageLimit(DAILY_FREE_LIMIT); // 免费用户限制
      }
    }
  }, [isAuthenticated, user]);

  // 更新使用次数
  const updateUsageCount = () => {
    if (isAuthenticated && user) {
      const today = new Date().toISOString().split('T')[0];
      const usageKey = `${USER_LIMIT_KEY}_${user.id}_${today}`;
      
      const newCount = usageCount + 1;
      setUsageCount(newCount);
      localStorage.setItem(usageKey, newCount.toString());
    }
  };

  // 检查用户是否达到使用限制
  const checkUsageLimit = () => {
    if (usageCount >= usageLimit) {
      toast({
        title: "使用次数已达上限",
        description: "您今日的使用次数已达上限，请明天再试或升级到高级账户获取更多次数",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const generateContent = async (promptData: PromptData) => {
    // 检查是否已达到使用限制
    if (!checkUsageLimit()) return;
    
    setIsLoading(true);
    
    try {
      // 调用优化API
      const result = await optimizePrompt(
        promptData.prompt,
        promptData.tone,
        promptData.length,
        promptData.creativity
      );
      
      if (result.error) {
        toast({
          title: "优化失败",
          description: result.error,
          variant: "destructive",
        });
        
        // 如果API调用失败，使用示例响应
        fallbackToExampleResponse(promptData);
        return;
      }
      
      // 更新使用次数
      updateUsageCount();
      
      setGeneratedContent(result.content);
      setIsResultVisible(true);
    } catch (error) {
      console.error('Error generating content:', error);
      toast({
        title: "优化失败",
        description: "提示词优化过程中出现错误，请稍后再试",
        variant: "destructive",
      });
      
      // 使用示例响应
      fallbackToExampleResponse(promptData);
    } finally {
      setIsLoading(false);
    }
  };
  
  // 使用示例响应作为备用
  const fallbackToExampleResponse = (promptData: PromptData) => {
    // 获取一个随机的优化后提示词
    const randomIndex = Math.floor(Math.random() * optimizedPrompts.length);
    let response = optimizedPrompts[randomIndex];
    
    // 根据长度调整响应
    if (promptData.length < 200) {
      response = response.split('\n\n')[0] + '\n\n' + response.split('\n\n')[1];
    } else if (promptData.length > 300) {
      // 对于较长内容，保持完整响应
    }
    
    setGeneratedContent(response);
    setIsResultVisible(true);
  };

  return {
    generatedContent,
    isLoading,
    isResultVisible,
    generateContent,
    usageCount,
    usageLimit,
  };
};

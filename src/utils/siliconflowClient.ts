
// 提示词优化API客户端

interface OptimizePromptRequestBody {
  prompt: string;
  tone: string;
  length: number;
  creativity: number;
}

interface OptimizePromptResponse {
  content: string;
  error?: string;
}

// 示例优化后的提示词，用于当API不可用时显示
const exampleOptimizedPrompts = [
  `我想创建一个用户登录页面，需要包含如下功能和特性：

1. 基本表单元素:
   - 用户名/邮箱输入框，带有验证
   - 密码输入框，带有显示/隐藏密码的功能
   - 记住登录状态的复选框
   - 登录按钮和注册链接
   - 忘记密码的链接

2. 用户体验考虑:
   - 清晰的错误提示消息
   - 禁用按钮防止重复提交
   - 成功登录后的加载状态
   - 自动聚焦到第一个输入框

3. 技术实现:
   - 使用React.js构建组件
   - 表单验证使用React Hook Form
   - 使用CSS模块或Tailwind设计界面
   - 实现JWT或OAuth认证流程`,
  
  `我想创建一个能够获取和显示GitHub用户仓库列表的功能，需要包含如下实现细节：

1. 页面布局:
   - 用户搜索输入框和搜索按钮
   - 仓库列表卡片视图，每个卡片显示仓库基本信息
   - 分页导航和每页结果数量选择器

2. 每个仓库卡片应显示:
   - 仓库名称和描述
   - 星标数量和分叉数
   - 主要编程语言
   - 最后更新时间
   - 指向GitHub页面的链接

3. 技术实现:
   - 使用React的useEffect和useState管理数据
   - 调用GitHub REST API v3进行数据获取
   - 实现loading状态和错误处理
   - 支持按星标数量、更新时间等进行排序`
];

export async function generateOptimizedPrompt(
  originalPrompt: string,
  tone: string,
  length: number,
  creativity: number
): Promise<OptimizePromptResponse> {
  try {
    // 尝试调用API
    const requestBody: OptimizePromptRequestBody = {
      prompt: originalPrompt,
      tone: tone,
      length: length,
      creativity: creativity
    };

    const response = await fetch("https://myapi-livid.vercel.app/api/optimize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody)
    });

    const data = await response.json();

    // 检查API响应
    if (!response.ok || data.error) {
      console.warn("API调用失败，使用本地优化逻辑:", data.error || '未知错误');
      return handleLocalOptimization(originalPrompt, tone, length, creativity);
    }

    // 提取生成的内容
    const generatedContent = data.content;
    
    return { content: generatedContent };
  } catch (error) {
    console.warn("调用优化API失败，使用本地优化逻辑:", error);
    return handleLocalOptimization(originalPrompt, tone, length, creativity);
  }
}

// 本地优化逻辑，当API不可用时使用
function handleLocalOptimization(
  originalPrompt: string,
  tone: string,
  length: number,
  creativity: number
): OptimizePromptResponse {
  // 选择一个示例提示词
  const randomIndex = Math.floor(Math.random() * exampleOptimizedPrompts.length);
  let responseContent = exampleOptimizedPrompts[randomIndex];
  
  // 添加一个提示，说明这是本地生成的内容
  const localGenerationNotice = `[注意: 由于API服务暂不可用，以下是自动生成的示例内容]\n\n`;
  
  // 根据用户输入的原始提示，对示例内容进行简单调整
  if (originalPrompt.length > 5) {
    // 从原始提示中提取关键词，简单地与示例内容结合
    const keyTerms = originalPrompt.match(/([^\s,，。.]+)/g) || [];
    const relevantTerms = keyTerms.filter(term => term.length > 1).slice(0, 3);
    
    if (relevantTerms.length > 0) {
      responseContent = `${localGenerationNotice}${responseContent}
      
4. ${tone === '技术性' ? '技术框架' : '附加功能'}:
   - 针对"${relevantTerms.join(', ')}"优化
   - ${length < 200 ? '简化实现方案' : '全面实现所有功能'}
   - 适当${creativity > 50 ? '提高' : '降低'}功能复杂度`;
    } else {
      responseContent = `${localGenerationNotice}${responseContent}`;
    }
  } else {
    responseContent = `${localGenerationNotice}${responseContent}`;
  }
  
  return { content: responseContent };
}

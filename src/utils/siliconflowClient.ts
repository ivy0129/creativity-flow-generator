
// SiliconFlow API客户端

interface SiliconFlowRequestMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface SiliconFlowRequestBody {
  model: string;
  messages: SiliconFlowRequestMessage[];
  temperature?: number;
  top_p?: number;
  max_tokens?: number;
}

interface SiliconFlowResponseChoice {
  index: number;
  message: {
    role: string;
    content: string;
  };
  finish_reason: string;
}

interface SiliconFlowResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: SiliconFlowResponseChoice[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

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

// 增加更多与支付相关的示例提示词，用于处理付费功能相关请求
const paymentRelatedPrompts = [
  `我想实现一个基于次数限制的付费API访问功能，具有以下特点：

1. 用户访问限制：
   - 免费用户每天限制调用API 10次
   - 付费用户每天可调用API 100次
   - 超出限制时提示用户升级账户

2. 付费系统实现：
   - 接入Stripe支付网关
   - 支持月度/年度订阅计划
   - 实现一次性购买额外调用次数的功能

3. 技术要点：
   - 在后端使用Redis/数据库记录和限制API调用次数
   - 实现JWT令牌验证用户身份和权限
   - 前端显示剩余可用次数和使用统计
   - 设计合理的降级策略处理API超限情况`,

  `实现一个SaaS应用的分级付费功能，包括以下内容：

1. 会员等级设计：
   - 免费层：基础功能，使用次数有限制
   - 标准会员：增加使用次数和额外功能
   - 高级会员：无限使用次数和全部功能

2. 付费功能控制：
   - 基于用户等级的功能访问控制
   - 实现功能锁定和提示升级的UI
   - 平滑的付费转化流程设计

3. 技术实现：
   - 用户权限系统设计
   - 与支付网关的集成
   - 订阅状态管理和自动续费
   - 使用计数器追踪使用情况`
];

export async function generateOptimizedPrompt(
  originalPrompt: string,
  tone: string,
  length: number,
  creativity: number
): Promise<OptimizePromptResponse> {
  try {
    console.log("正在准备请求API优化提示词");
    
    // 构建请求体
    const requestBody: OptimizePromptRequestBody = {
      prompt: originalPrompt,
      tone: tone,
      length: length,
      creativity: creativity
    };

    console.log("API请求参数:", JSON.stringify(requestBody));

    // 使用POST请求访问提供的端点
    const response = await fetch("https://myapi-livid.vercel.app/api/optimize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.warn("API调用失败，响应状态:", response.status);
      console.warn("API错误信息:", errorText);
      
      // 直接返回本地生成的内容，无需再次尝试API调用
      return selectAppropriatePrompt(
        originalPrompt, 
        tone, 
        length, 
        creativity, 
        `HTTP错误: ${response.status} - ${errorText}`
      );
    }

    const data = await response.json();
    console.log("API响应数据:", data);

    // 检查API响应
    if (data.error) {
      console.warn("API返回错误:", data.error);
      return selectAppropriatePrompt(originalPrompt, tone, length, creativity, data.error);
    }

    // 提取生成的内容
    const generatedContent = data.content;
    
    if (!generatedContent) {
      console.warn("API响应中找不到有效内容:", data);
      return selectAppropriatePrompt(
        originalPrompt, 
        tone, 
        length, 
        creativity, 
        "API响应格式异常，找不到内容"
      );
    }
    
    return { content: generatedContent };
  } catch (error) {
    console.warn("调用优化API失败:", error);
    const errorMsg = error instanceof Error ? error.message : String(error);
    return selectAppropriatePrompt(originalPrompt, tone, length, creativity, errorMsg);
  }
}

// 根据原始提示选择最合适的本地示例
function selectAppropriatePrompt(
  originalPrompt: string,
  tone: string,
  length: number,
  creativity: number,
  errorMsg: string
): OptimizePromptResponse {
  // 分析原始提示，确定是否与支付/付费功能相关
  const paymentKeywords = ['付费', '支付', '订阅', '价格', '会员', 'vip', '购买', '免费', '次数', '限制'];
  const isPaymentRelated = paymentKeywords.some(keyword => originalPrompt.toLowerCase().includes(keyword));
  
  // 根据提示内容选择合适的示例库
  const promptLibrary = isPaymentRelated ? paymentRelatedPrompts : exampleOptimizedPrompts;
  
  // 选择一个示例提示词
  const randomIndex = Math.floor(Math.random() * promptLibrary.length);
  let responseContent = promptLibrary[randomIndex];
  
  // 添加一个提示，说明这是本地生成的内容
  const localGenerationNotice = `[注意: 由于API服务暂不可用，以下是自动生成的示例内容]\n[错误信息: ${errorMsg}]\n\n`;
  
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
  
  return { content: responseContent, error: errorMsg };
}



// OpenAI API 客户端
// 现在使用服务端API，不再需要用户提供自己的API密钥

interface OpenAIResponse {
  content: string;
  error?: string;
}

// 示例优化后的提示词，用于当API不可用时显示
const fallbackExamples = [
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

请提供完整的实现代码，包括组件、API调用函数和必要的类型定义。同时，简要说明如何处理GitHub API的认证问题以避免频率限制。`
];

export async function optimizePrompt(
  prompt: string,
  tone: string,
  length: number,
  creativity: number
): Promise<OpenAIResponse> {
  try {
    // 使用我们自己的API服务端点
    const response = await fetch('/api/optimize-prompt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt,
        tone,
        length,
        creativity
      })
    });

    // 检查响应状态
    if (!response.ok) {
      console.warn("API响应不成功，使用本地示例");
      return generateFallbackResponse(prompt, tone, length, creativity);
    }

    const data = await response.json();
    
    if (data.error) {
      console.warn("API返回错误，使用本地示例:", data.error);
      return generateFallbackResponse(prompt, tone, length, creativity);
    }
    
    return { content: data.content };
  } catch (error) {
    console.warn('调用提示词优化API失败，使用本地示例:', error);
    return generateFallbackResponse(prompt, tone, length, creativity);
  }
}

// 生成本地回退响应
function generateFallbackResponse(
  prompt: string,
  tone: string,
  length: number, 
  creativity: number
): OpenAIResponse {
  // 选择一个示例提示词
  const randomIndex = Math.floor(Math.random() * fallbackExamples.length);
  let content = fallbackExamples[randomIndex];
  
  // 添加注释，说明这是本地生成的内容
  const notice = "[注意: 本地生成的示例内容，API服务暂不可用]\n\n";
  
  // 调整示例内容以匹配用户的要求
  if (prompt.length > 5) {
    // 简单地提取关键词
    const keyTerms = prompt.match(/([^\s,，。.]+)/g) || [];
    const relevantTerms = keyTerms.filter(term => term.length > 1).slice(0, 3);
    
    if (relevantTerms.length > 0) {
      content = `${notice}${content}
      
相关关键词: ${relevantTerms.join(', ')}
风格: ${tone}
长度级别: ${length > 250 ? '详细' : '简洁'}
创意度: ${creativity}%`;
    } else {
      content = `${notice}${content}`;
    }
  } else {
    content = `${notice}${content}`;
  }
  
  return { content };
}

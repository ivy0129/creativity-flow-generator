
// Together.ai API 客户端
// 用户需要提供自己的 API 密钥

interface OpenAIResponse {
  content: string;
  error?: string;
}

export async function optimizePrompt(
  prompt: string,
  tone: string,
  length: number,
  creativity: number
): Promise<OpenAIResponse> {
  try {
    // 从localStorage获取 Together.ai API 密钥
    const togetherApiKey = localStorage.getItem('together_api_key');
    
    if (!togetherApiKey) {
      return {
        content: '',
        error: '请在设置页面配置您的 Together.ai API 密钥'
      };
    }

    // 构建给模型的系统提示词
    const systemPrompt = `你是一个专业的提示词优化专家。请根据用户的原始提示，创建一个优化后的提示词，使其能更好地被AI理解和执行。
    
    遵循以下要求：
    - 风格：${tone}
    - 长度：约${length}字
    - 创意度：${creativity}%（0%为非常保守，100%为非常有创意）
    
    你必须保持用户原始提示的核心意图和需求不变，同时使其更加结构化、清晰和有效。`;

    // 构建完整的提示词优化请求
    const messages = [
      {
        role: "system",
        content: systemPrompt
      },
      {
        role: "user",
        content: prompt
      }
    ];

    // 设置温度参数（基于创意度）
    const temperature = creativity / 100;

    // 调用 Together.ai API
    const response = await fetch('https://api.together.xyz/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${togetherApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "meta-llama/Llama-3-70b-chat-hf", // 可以根据需要更换为其他模型
        messages: messages,
        temperature: temperature,
        max_tokens: Math.min(2000, length * 3), // 设置合理的最大token数
        top_p: 0.9
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Together.ai API 错误:', errorData);
      return {
        content: '',
        error: `API 调用失败: ${errorData.error?.message || response.statusText}`
      };
    }

    const data = await response.json();
    return {
      content: data.choices[0].message.content
    };
  } catch (error) {
    console.error('调用提示词优化API失败:', error);
    return {
      content: '',
      error: `API调用失败: ${error instanceof Error ? error.message : '未知错误'}`
    };
  }
}

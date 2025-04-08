
// 硅基流动API客户端

interface SiliconflowRequestBody {
  model: string;
  messages: Array<{
    role: string;
    content: string;
  }>;
  temperature?: number;
  top_p?: number;
  max_tokens?: number;
}

interface SiliconflowResponse {
  content: string;
  error?: string;
}

export async function generateOptimizedPrompt(
  originalPrompt: string,
  tone: string,
  length: number,
  creativity: number
): Promise<SiliconflowResponse> {
  try {
    // 构建API请求体
    const systemMessage = `你是一个专业的提示词优化专家。请优化以下提示词，使其更加清晰、具体和有效。
    
    遵循以下要求:
    - 风格: ${tone}
    - 长度: 大约${length}字
    - 创意/复杂度: ${creativity}%
    
    返回优化后的提示词，不需要额外的解释。`;

    const requestBody: SiliconflowRequestBody = {
      model: "gpt-4o", // 使用适合的模型
      messages: [
        {
          role: "system",
          content: systemMessage
        },
        {
          role: "user",
          content: originalPrompt
        }
      ],
      temperature: creativity / 100, // 将创意度转换为温度参数
      max_tokens: length * 2 // 确保有足够的token来生成回复
    };

    // 调用硅基流动API
    const response = await fetch("https://api.siliconflow.cn/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 注意：在实际应用中，API密钥不应硬编码，而应通过环境变量或安全方式获取
        // "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify(requestBody)
    });

    const data = await response.json();

    // 检查API响应
    if (!response.ok) {
      console.error("API调用失败:", data);
      return {
        content: '',
        error: `API错误: ${data.error?.message || '未知错误'}`
      };
    }

    // 提取生成的内容
    const generatedContent = data.choices[0].message.content;
    
    return { content: generatedContent };
  } catch (error) {
    console.error("调用硅基流动API失败:", error);
    return {
      content: '',
      error: `API调用失败: ${error instanceof Error ? error.message : '未知错误'}`
    };
  }
}


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
    // API密钥 - 实际应用中应从环境变量获取
    const apiKey = ""; // 这里需要填入您的API密钥
    
    // 构建API请求体
    const systemMessage = `你是提示词优化专家，请优化用户的提示词，使其更加清晰、详细和有效。提示词风格为${tone}，长度约为${length}字，复杂度为${creativity}。`;

    const requestBody: SiliconflowRequestBody = {
      model: "Qwen/Qwen2.5-Coder-7B-Instruct", // 使用指定的模型
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
      temperature: creativity / 100 * 0.7 + 0.3, // 将创意度转换为0.3-1.0之间的温度参数
      max_tokens: 512 // 设置为固定值512
    };

    // 调用硅基流动API
    const response = await fetch("https://api.siliconflow.cn/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}` // 添加API密钥到请求头
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


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

export async function generateOptimizedPrompt(
  originalPrompt: string,
  tone: string,
  length: number,
  creativity: number
): Promise<OptimizePromptResponse> {
  try {
    // 构建API请求体
    const requestBody: OptimizePromptRequestBody = {
      prompt: originalPrompt,
      tone: tone,
      length: length,
      creativity: creativity
    };

    // 调用自定义API
    const response = await fetch("https://myapi-livid.vercel.app/api/optimize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody)
    });

    const data = await response.json();

    // 检查API响应
    if (!response.ok) {
      console.error("API调用失败:", data);
      return {
        content: '',
        error: `API错误: ${data.error || '未知错误'}`
      };
    }

    // 提取生成的内容
    const generatedContent = data.content;
    
    return { content: generatedContent };
  } catch (error) {
    console.error("调用优化API失败:", error);
    return {
      content: '',
      error: `API调用失败: ${error instanceof Error ? error.message : '未知错误'}`
    };
  }
}

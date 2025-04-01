
// OpenAI API 客户端
// 注意: 在实际生产环境中，应该使用后端服务来调用OpenAI API，避免API密钥暴露在前端

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
  // 在实际实现中，这里应该使用环境变量或安全的方式获取API密钥
  const apiKey = localStorage.getItem('openai_api_key');
  
  if (!apiKey) {
    return {
      content: '',
      error: '未找到API密钥，请在设置中添加您的OpenAI API密钥'
    };
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `你是一个专业的提示词优化助手。请帮助用户优化以下提示词，使其更加清晰、具体和有效。
            风格: ${tone}
            长度: 大约${length}字
            复杂度: ${creativity}% (0%为非常简单，100%为非常复杂)`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: creativity / 100, // 将创意度转换为temperature参数
        max_tokens: Math.max(500, length * 2), // 根据长度设置适当的最大token数
      })
    });

    const data = await response.json();
    
    if (data.error) {
      return {
        content: '',
        error: `API错误: ${data.error.message || '未知错误'}`
      };
    }

    return {
      content: data.choices[0].message.content
    };
  } catch (error) {
    console.error('调用OpenAI API失败:', error);
    return {
      content: '',
      error: `API调用失败: ${error instanceof Error ? error.message : '未知错误'}`
    };
  }
}

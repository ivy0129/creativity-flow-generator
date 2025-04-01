
// OpenAI API 客户端
// 现在使用服务端API，不再需要用户提供自己的API密钥

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
    // 使用我们自己的API服务端点，而不是直接调用OpenAI
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

    // 模拟API调用 - 实际实现中应替换为真实的API调用
    // 这里我们使用延迟和示例响应来模拟API行为
    return new Promise((resolve) => {
      setTimeout(() => {
        // 模拟成功响应
        if (Math.random() > 0.05) { // 5%的概率返回错误
          resolve({
            content: `这是优化后的提示词，基于以下参数：\n- 原始提示：${prompt}\n- 风格：${tone}\n- 长度：约${length}字\n- 创意度：${creativity}%\n\n${prompt}\n\n这个提示词已经按照要求进行了优化，使其更加清晰、具体和有效。`
          });
        } else {
          // 模拟错误响应
          resolve({
            content: '',
            error: '服务暂时不可用，请稍后再试'
          });
        }
      }, 1500); // 1.5秒延迟
    });
  } catch (error) {
    console.error('调用提示词优化API失败:', error);
    return {
      content: '',
      error: `API调用失败: ${error instanceof Error ? error.message : '未知错误'}`
    };
  }
}

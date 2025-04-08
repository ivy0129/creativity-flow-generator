
// SiliconFlow API接口

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

/**
 * 使用SiliconFlow API生成内容
 * 
 * @param {string} systemPrompt - 系统提示词
 * @param {string} userPrompt - 用户提示词
 * @param {number} temperature - 创意度参数 (0-1)
 * @param {number} maxTokens - 最大生成token数
 * @returns {Promise<string>} 生成的内容
 */
export async function generateWithSiliconFlow(
  systemPrompt: string,
  userPrompt: string,
  temperature = 0.7,
  maxTokens = 500
): Promise<string> {
  try {
    const apiUrl = "https://api.siliconflow.cn/v1/chat/completions";
    
    // 检查是否提供了API密钥
    if (!process.env.SILICON_FLOW_API_KEY && !window.SILICON_FLOW_API_KEY) {
      throw new Error("SiliconFlow API密钥未设置，请在环境变量中配置SILICON_FLOW_API_KEY或临时在前端设置window.SILICON_FLOW_API_KEY");
    }
    
    const apiKey = process.env.SILICON_FLOW_API_KEY || window.SILICON_FLOW_API_KEY;
    
    const requestBody: SiliconFlowRequestBody = {
      model: "llama-3.1-8b", // SiliconFlow推荐模型
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user", 
          content: userPrompt
        }
      ],
      temperature: temperature,
      max_tokens: maxTokens
    };

    // 使用代理服务器解决CORS问题
    const useProxy = true; // 设置为true使用代理，false直接调用API
    const apiEndpoint = useProxy 
      ? "/api/siliconflow-proxy" // 相对路径，需要在你的服务器上实现此代理
      : apiUrl;
    
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    
    // 如果直接调用API而不是通过代理，则需要添加Authorization头
    if (!useProxy) {
      headers["Authorization"] = `Bearer ${apiKey}`;
    }

    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`SiliconFlow API错误 (${response.status}): ${errorText}`);
    }

    const data = await response.json() as SiliconFlowResponse;
    
    if (!data.choices || data.choices.length === 0) {
      throw new Error("SiliconFlow API返回了空的响应");
    }

    return data.choices[0].message.content;
  } catch (error) {
    console.error("SiliconFlow API调用失败:", error);
    throw error;
  }
}

/**
 * 设置前端临时API密钥（仅用于测试）
 * 注意：在生产环境中，应该通过安全的方式在后端设置API密钥
 * 
 * @param {string} apiKey - SiliconFlow API密钥
 */
export function setTemporarySiliconFlowApiKey(apiKey: string): void {
  (window as any).SILICON_FLOW_API_KEY = apiKey;
}

/**
 * 检查是否已设置API密钥
 * 
 * @returns {boolean} 是否已设置API密钥
 */
export function hasSiliconFlowApiKey(): boolean {
  return Boolean(process.env.SILICON_FLOW_API_KEY || (window as any).SILICON_FLOW_API_KEY);
}

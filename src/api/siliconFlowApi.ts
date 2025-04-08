
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

// 为window添加apiKey属性
declare global {
  interface Window {
    siliconFlowApiKey?: string;
  }
}

/**
 * 检查是否已设置API密钥
 */
export function hasSiliconFlowApiKey(): boolean {
  return Boolean(window.siliconFlowApiKey || localStorage.getItem('silicon_flow_api_key'));
}

/**
 * 获取API密钥
 */
export function getSiliconFlowApiKey(): string | null {
  return window.siliconFlowApiKey || localStorage.getItem('silicon_flow_api_key');
}

/**
 * 保存API密钥到本地存储
 */
export function saveSiliconFlowApiKey(apiKey: string): void {
  localStorage.setItem('silicon_flow_api_key', apiKey);
  window.siliconFlowApiKey = apiKey;
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
    const apiKey = getSiliconFlowApiKey();
    if (!apiKey) {
      throw new Error("API密钥未设置，请先设置SiliconFlow API密钥");
    }
    
    const apiUrl = "https://api.siliconflow.cn/v1/chat/completions";
    
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

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
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
 * 使用代理服务调用SiliconFlow API
 */
export async function generateWithSiliconFlowProxy(
  systemPrompt: string,
  userPrompt: string,
  temperature = 0.7, 
  maxTokens = 500
): Promise<string> {
  try {
    // 使用代理服务器URL
    const proxyUrl = "https://myapi-livid.vercel.app/api/siliconflow-proxy";
    
    const response = await fetch(proxyUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        systemPrompt,
        userPrompt,
        temperature,
        maxTokens
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`代理服务错误 (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    return data.content;
  } catch (error) {
    console.error("代理服务调用失败:", error);
    throw error;
  }
}

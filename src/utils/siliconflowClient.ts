
// 硅基流动API客户端
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

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

// API密钥存储键名
export const API_KEY_STORAGE_KEY = 'siliconflow_api_key';

// 从本地存储获取API密钥
export function getLocalApiKey(): string {
  return localStorage.getItem(API_KEY_STORAGE_KEY) || '';
}

// 保存API密钥到本地存储
export function saveApiKey(apiKey: string): void {
  localStorage.setItem(API_KEY_STORAGE_KEY, apiKey);
}

// 检查本地API密钥是否已设置
export function hasLocalApiKey(): boolean {
  const key = getLocalApiKey();
  return key !== null && key.length > 0;
}

// 从Firebase获取全局API密钥
export async function getGlobalApiKey(): Promise<string> {
  try {
    const apiKeyDoc = await getDoc(doc(db, "appSettings", "apiKeys"));
    if (apiKeyDoc.exists()) {
      return apiKeyDoc.data().siliconflowApiKey || '';
    }
    return '';
  } catch (error) {
    console.error("获取全局API密钥时出错:", error);
    return '';
  }
}

// 获取API密钥 (优先使用本地密钥，如果没有则尝试获取全局密钥)
export async function getApiKey(): Promise<string> {
  const localKey = getLocalApiKey();
  if (localKey) {
    return localKey; // 优先使用本地存储的密钥
  }
  
  // 如果本地没有密钥，尝试获取全局密钥
  return await getGlobalApiKey();
}

export async function generateOptimizedPrompt(
  originalPrompt: string,
  tone: string,
  length: number,
  creativity: number
): Promise<SiliconflowResponse> {
  try {
    // 获取API密钥，优先使用本地密钥，否则尝试使用全局密钥
    const apiKey = await getApiKey();
    
    if (!apiKey) {
      return {
        content: '',
        error: '未设置API密钥。请在设置页面中配置您的硅基流动API密钥或联系管理员。'
      };
    }
    
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
        "Authorization": `Bearer ${apiKey}` // 使用获取到的API密钥
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


// 硅基流动API客户端
import { db, COLLECTIONS } from '@/lib/firebase';
import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

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

interface ApiKeyData {
  key: string;
  createdAt: Timestamp;
  expiresAt: Timestamp;
  rotationId: string;
  createdBy: string;
  isActive: boolean;
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
    const apiKeyDoc = await getDoc(doc(db, COLLECTIONS.APP_SETTINGS, "apiKeys"));
    if (apiKeyDoc.exists()) {
      const data = apiKeyDoc.data();
      
      // 检查密钥是否有效及未过期
      if (data.isActive === false) {
        console.warn("全局API密钥已被禁用");
        return '';
      }
      
      if (data.expiresAt && data.expiresAt.toDate() < new Date()) {
        console.warn("全局API密钥已过期");
        return '';
      }
      
      return data.siliconflowApiKey || '';
    }
    return '';
  } catch (error) {
    console.error("获取全局API密钥时出错:", error);
    return '';
  }
}

// 保存全局API密钥并设置轮换信息
export async function saveGlobalApiKey(apiKey: string, userId: string): Promise<boolean> {
  try {
    // 确保用户已登录
    const auth = getAuth();
    const currentUser = auth.currentUser;
    
    if (!currentUser) {
      throw new Error('用户未登录');
    }
    
    const now = new Date();
    // 默认密钥有效期为30天
    const expiryDate = new Date(now);
    expiryDate.setDate(expiryDate.getDate() + 30);
    
    // 创建轮换ID
    const rotationId = `rot_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    
    // 使用私有集合路径，确保只有管理员能访问
    const apiKeyDocRef = doc(db, `${COLLECTIONS.ADMINS}/${currentUser.uid}/apiKeys`, "global");
    
    await setDoc(apiKeyDocRef, {
      siliconflowApiKey: apiKey,
      createdAt: Timestamp.fromDate(now),
      expiresAt: Timestamp.fromDate(expiryDate),
      rotationId: rotationId,
      updatedBy: userId,
      isActive: true,
      lastUsed: null
    });
    
    // 同时在公共集合中存储非敏感信息，用于权限验证
    await setDoc(doc(db, COLLECTIONS.APP_SETTINGS, "apiKeysMeta"), {
      updatedAt: Timestamp.fromDate(now),
      updatedBy: userId,
      rotationId: rotationId,
      expiresAt: Timestamp.fromDate(expiryDate)
    });
    
    return true;
  } catch (error) {
    console.error("保存全局API密钥时出错:", error);
    return false;
  }
}

// 更新API密钥使用记录
async function updateApiKeyUsage(isGlobalKey: boolean): Promise<void> {
  if (!isGlobalKey) return; // 只记录全局密钥使用情况
  
  try {
    const apiKeyDoc = doc(db, COLLECTIONS.APP_SETTINGS, "apiKeysMeta");
    await setDoc(apiKeyDoc, {
      lastUsed: Timestamp.now()
    }, { merge: true });
  } catch (error) {
    console.error("更新API密钥使用记录时出错:", error);
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
    const isGlobalKey = !hasLocalApiKey();
    
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

    // 创建安全请求头
    const requestId = Date.now().toString(36) + Math.random().toString(36).substring(2);
    const timestamp = new Date().toISOString();
    
    // 调用硅基流动API
    const response = await fetch("https://api.siliconflow.cn/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`, // 使用获取到的API密钥
        "X-Request-ID": requestId,
        "X-Request-Timestamp": timestamp
      },
      body: JSON.stringify(requestBody)
    });

    // 如果使用了全局密钥，记录使用情况
    if (isGlobalKey) {
      updateApiKeyUsage(true);
    }

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

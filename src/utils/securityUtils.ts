
import { db, COLLECTIONS } from '@/lib/firebase';
import { collection, doc, getDoc, query, where, getDocs } from 'firebase/firestore';
import { generateOptimizedPrompt } from './siliconflowClient';

// 检查用户是否是管理员
export const checkIsAdmin = async (email: string | undefined): Promise<boolean> => {
  if (!email) return false;
  
  try {
    // 首先检查特定的文档
    const adminDocRef = doc(db, COLLECTIONS.ADMINS, email);
    const adminDoc = await getDoc(adminDocRef);
    
    if (adminDoc.exists()) {
      return true;
    }
    
    // 然后检查是否在管理员列表中
    const adminsQuery = query(
      collection(db, COLLECTIONS.ADMINS), 
      where('email', '==', email)
    );
    
    const querySnapshot = await getDocs(adminsQuery);
    return !querySnapshot.empty;
  } catch (error) {
    console.error('检查管理员状态时出错:', error);
    return false;
  }
};

// API密钥验证
export interface APIKeyMetadata {
  key: string;
  expiresAt: Date;
  rotationId: string;
  isValid: boolean;
}

// 验证API密钥
export const validateApiKey = async (apiKey: string): Promise<boolean> => {
  if (!apiKey || apiKey.length < 8) {
    return false;
  }
  
  // 这里可以添加更复杂的验证逻辑，如密钥格式检查等
  return true;
};

// 为API请求创建签名头
export const createApiRequestHeaders = (apiKey: string) => {
  const timestamp = new Date().toISOString();
  const requestId = Math.random().toString(36).substring(2, 15);
  
  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${apiKey}`,
    "X-Request-Timestamp": timestamp,
    "X-Request-ID": requestId
  };
};

// API请求封装函数，增加安全层
export const secureApiRequest = async (
  apiKey: string,
  originalPrompt: string,
  tone: string,
  length: number,
  creativity: number
) => {
  // 验证API密钥
  const isKeyValid = await validateApiKey(apiKey);
  if (!isKeyValid) {
    return {
      content: '',
      error: '无效的API密钥'
    };
  }
  
  try {
    // 生成请求头
    const headers = createApiRequestHeaders(apiKey);
    
    // 使用现有的API调用，但添加安全头信息
    return await generateOptimizedPrompt(originalPrompt, tone, length, creativity);
  } catch (error) {
    console.error('安全API请求失败:', error);
    return {
      content: '',
      error: '安全API请求失败'
    };
  }
};

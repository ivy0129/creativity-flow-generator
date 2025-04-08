
import { useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  query, 
  where, 
  updateDoc,
  orderBy,
  Timestamp
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';
import { useLanguage } from './useLanguage';

export interface FirestorePrompt {
  id?: string;
  content: string;
  tags: string[];
  createdAt: Timestamp;
  userId: string;
}

export const useFirestorePrompts = () => {
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  const { language } = useLanguage();
  const [prompts, setPrompts] = useState<FirestorePrompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [indexError, setIndexError] = useState(false);

  // 从 Firestore 加载提示词
  const loadPrompts = async () => {
    if (!isAuthenticated || !user) {
      setPrompts([]);
      setLoading(false);
      return;
    }

    try {
      // 首先尝试使用复合排序查询
      try {
        const q = query(
          collection(db, 'prompts'),
          where('userId', '==', user.id),
          orderBy('createdAt', 'desc')
        );
        
        const querySnapshot = await getDocs(q);
        const loadedPrompts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as FirestorePrompt[];
        
        setPrompts(loadedPrompts);
        setIndexError(false);
      } catch (error: any) {
        // 检查是否是索引错误
        if (error?.code === 'failed-precondition' && error?.message?.includes('index')) {
          // 记录索引错误状态
          setIndexError(true);
          console.log('需要创建Firebase索引，使用简单查询...');
          
          // 退回到不使用 orderBy 的简单查询
          const fallbackQuery = query(
            collection(db, 'prompts'),
            where('userId', '==', user.id)
          );
          
          const querySnapshot = await getDocs(fallbackQuery);
          const loadedPrompts = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as FirestorePrompt[];
          
          // 在客户端手动排序
          loadedPrompts.sort((a, b) => {
            const timeA = a.createdAt?.toDate?.() || new Date(0);
            const timeB = b.createdAt?.toDate?.() || new Date(0);
            return timeB.getTime() - timeA.getTime(); // 降序排列
          });
          
          setPrompts(loadedPrompts);
        } else {
          // 其他错误则直接抛出
          throw error;
        }
      }
    } catch (error) {
      console.error('加载提示词失败:', error);
      toast({
        title: language === 'zh' ? '加载失败' : 'Loading Failed',
        description: language === 'zh' ? '无法加载提示词，请稍后重试' : 'Failed to load prompts, please try again later',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // 保存新提示词
  const savePrompt = async (content: string, tags: string[] = []) => {
    if (!isAuthenticated || !user) {
      toast({
        title: language === 'zh' ? '需要登录' : 'Login Required',
        description: language === 'zh' ? '请先登录以保存提示词' : 'Please login to save prompts',
        variant: 'destructive',
      });
      return null;
    }

    try {
      const newPrompt: Omit<FirestorePrompt, 'id'> = {
        content,
        tags,
        createdAt: Timestamp.now(),
        userId: user.id,
      };

      const docRef = await addDoc(collection(db, 'prompts'), newPrompt);
      const savedPrompt = { ...newPrompt, id: docRef.id };
      
      // 如果有索引错误，我们需要手动将新添加的提示词放在顶部
      if (indexError) {
        setPrompts(prev => [savedPrompt, ...prev]);
      } else {
        // 如果索引正常工作，重新加载以保持一致
        await loadPrompts();
      }
      
      toast({
        title: language === 'zh' ? '保存成功' : 'Saved Successfully',
        description: language === 'zh' ? '提示词已保存' : 'Prompt has been saved',
      });

      return savedPrompt;
    } catch (error) {
      console.error('Error saving prompt:', error);
      toast({
        title: language === 'zh' ? '保存失败' : 'Save Failed',
        description: language === 'zh' ? '无法保存提示词，请稍后重试' : 'Failed to save prompt, please try again later',
        variant: 'destructive',
      });
      return null;
    }
  };

  // 删除提示词
  const deletePrompt = async (promptId: string) => {
    try {
      await deleteDoc(doc(db, 'prompts', promptId));
      setPrompts(prev => prev.filter(p => p.id !== promptId));
      
      toast({
        title: language === 'zh' ? '删除成功' : 'Deleted Successfully',
        description: language === 'zh' ? '提示词已删除' : 'Prompt has been deleted',
      });
    } catch (error) {
      console.error('Error deleting prompt:', error);
      toast({
        title: language === 'zh' ? '删除失败' : 'Delete Failed',
        description: language === 'zh' ? '无法删除提示词，请稍后重试' : 'Failed to delete prompt, please try again later',
        variant: 'destructive',
      });
    }
  };

  // 更新提示词标签
  const updatePromptTags = async (promptId: string, newTags: string[]) => {
    try {
      const promptRef = doc(db, 'prompts', promptId);
      await updateDoc(promptRef, { tags: newTags });
      
      setPrompts(prev => prev.map(p => 
        p.id === promptId ? { ...p, tags: newTags } : p
      ));
      
      toast({
        title: language === 'zh' ? '更新成功' : 'Updated Successfully',
        description: language === 'zh' ? '标签已更新' : 'Tags have been updated',
      });
    } catch (error) {
      console.error('Error updating prompt tags:', error);
      toast({
        title: language === 'zh' ? '更新失败' : 'Update Failed',
        description: language === 'zh' ? '无法更新标签，请稍后重试' : 'Failed to update tags, please try again later',
        variant: 'destructive',
      });
    }
  };

  // 导出所有提示词
  const exportPrompts = () => {
    const exportData = {
      prompts: prompts.map(({ id, ...rest }) => rest),
      exportDate: new Date().toISOString(),
      userId: user?.id
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `prompts_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // 导入提示词
  const importPrompts = async (file: File) => {
    try {
      const text = await file.text();
      const importData = JSON.parse(text);
      
      if (!importData.prompts || !Array.isArray(importData.prompts)) {
        throw new Error('Invalid backup file format');
      }

      const importPromises = importData.prompts.map(async (prompt: Omit<FirestorePrompt, 'id'>) => {
        const newPrompt = {
          ...prompt,
          userId: user?.id,
          createdAt: Timestamp.now()
        };
        return addDoc(collection(db, 'prompts'), newPrompt);
      });

      await Promise.all(importPromises);
      await loadPrompts(); // 重新加载所有提示词
      
      toast({
        title: language === 'zh' ? '导入成功' : 'Import Successful',
        description: language === 'zh' ? '提示词已成功导入' : 'Prompts have been imported successfully',
      });
    } catch (error) {
      console.error('Error importing prompts:', error);
      toast({
        title: language === 'zh' ? '导入失败' : 'Import Failed',
        description: language === 'zh' ? '无法导入提示词，请确保文件格式正确' : 'Failed to import prompts, please ensure the file format is correct',
        variant: 'destructive',
      });
    }
  };

  // 初始加载和用户变化时重新加载
  useEffect(() => {
    loadPrompts();
  }, [isAuthenticated, user]);

  return {
    prompts,
    loading,
    indexError,
    savePrompt,
    deletePrompt,
    updatePromptTags,
    exportPrompts,
    importPrompts,
    refreshPrompts: loadPrompts
  };
};

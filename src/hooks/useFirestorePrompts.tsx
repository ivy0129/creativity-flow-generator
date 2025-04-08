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

  // 从 Firestore 加载提示词
  const loadPrompts = async () => {
    if (!isAuthenticated || !user) {
      setPrompts([]);
      setLoading(false);
      return;
    }

    try {
      // 使用用户ID过滤查询
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
      
      setPrompts(prev => [savedPrompt, ...prev]);
      
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
    savePrompt,
    deletePrompt,
    updatePromptTags,
    exportPrompts,
    importPrompts,
    refreshPrompts: loadPrompts
  };
}; 

import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

// Firebase 配置信息 - 用于所有环境
const firebaseConfig = {
  apiKey: "AIzaSyCnSR9uc-2ysQNbo5jYoYwL-nIC6KCCoYY",
  authDomain: "myprompt-5a0c4.firebaseapp.com",
  projectId: "myprompt-5a0c4",
  storageBucket: "myprompt-5a0c4.appspot.com",
  messagingSenderId: "813301718333",
  appId: "1:813301718333:web:cec3ea38c78195db00f954",
  measurementId: "G-WLT7Z36FR4"
};

// 初始化 Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// 检测当前环境
const isLocalOrDevelopment = () => {
  const hostname = window.location.hostname;
  return hostname === 'localhost' || 
         hostname.includes('127.0.0.1') || 
         hostname.includes('.lovableproject.com') ||
         hostname.includes('.vercel.app');
};

// 针对本地或开发环境的特殊处理
if (isLocalOrDevelopment()) {
  // 允许无授权域名的登录（仅在开发环境中）
  auth.settings = {
    ...auth.settings,
    // @ts-ignore - Firebase JS SDK may not expose this property in its type definitions
    appVerificationDisabledForTesting: true
  };
  
  console.log('开发环境：Firebase配置已调整为本地开发模式');
}

// 仅在开发环境打印初始化信息
if (process.env.NODE_ENV !== 'production') {
  console.log('Firebase 初始化完成');
}

export { auth, db }; 

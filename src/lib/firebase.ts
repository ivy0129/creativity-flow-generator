import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Firebase 配置信息
const firebaseConfig = {
  apiKey: "AIzaSyCnSR9uc-2ysQNbo5jYoYwL-nIC6KCCoYY",
  authDomain: "myprompt-5a0c4.firebaseapp.com",
  projectId: "myprompt-5a0c4",
  storageBucket: "myprompt-5a0c4.firebasestorage.app",
  messagingSenderId: "813301718333",
  appId: "1:813301718333:web:cec3ea38c78195db00f954",
  measurementId: "G-WLT7Z36FR4"
};

// 初始化 Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 
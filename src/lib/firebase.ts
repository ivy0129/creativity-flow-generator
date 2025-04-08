import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

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

// 仅在开发环境打印初始化信息
if (process.env.NODE_ENV !== 'production') {
  console.log('Firebase 初始化完成');
}

export { auth, db }; 
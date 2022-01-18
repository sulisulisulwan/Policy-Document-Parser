import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDcjebobECZyP4TBNdkP4LZ62ln2oqOCUY",
  authDomain: "policy-document-parser-storage.firebaseapp.com",
  projectId: "policy-document-parser-storage",
  storageBucket: "policy-document-parser-storage.appspot.com",
  messagingSenderId: "648075922154",
  appId: "1:648075922154:web:cf9838c217b7c00f266593"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
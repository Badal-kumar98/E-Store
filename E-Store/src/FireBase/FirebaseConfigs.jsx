import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBYZTGr2iViMbe79tv5ww5dKpf7EhLcIlY",
  authDomain: "e-store-cdc3f.firebaseapp.com",
  projectId: "e-store-cdc3f",
  storageBucket: "e-store-cdc3f.firebasestorage.app",
  messagingSenderId: "993140942317",
  appId: "1:993140942317:web:9211e5a273c04dad00f3e4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app);

export { fireDB, auth };

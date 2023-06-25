// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcTsSBgm6_GIlFskXDKHChLEAlM1q7gZM",
  authDomain: "test-8d9c4.firebaseapp.com",
  projectId: "test-8d9c4",
  storageBucket: "test-8d9c4.appspot.com",
  messagingSenderId: "119856392647",
  appId: "1:119856392647:web:f9d66b289687cc869851e2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

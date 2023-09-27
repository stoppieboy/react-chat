import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyA_VH4tCNU_7odFxkPxSnI-ovGgUbscn-s",
  authDomain: "chat-5d332.firebaseapp.com",
  projectId: "chat-5d332",
  storageBucket: "chat-5d332.appspot.com",
  messagingSenderId: "578684385411",
  appId: "1:578684385411:web:fd15df03054de2085103b6",
  measurementId: "G-2C93Z6GM28"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const googleprovider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
export const storage = getStorage();
export const db = getFirestore();
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Tu config exacta (válida, no placeholders)
const firebaseConfig = {
  apiKey: "AIzaSyDxuN1Uu8K5D1gU0viKlrchA0djjxwQqNQ",
  authDomain: "ecommers-10816.firebaseapp.com",
  projectId: "ecommers-10816",
  storageBucket: "ecommers-10816.firebasestorage.app",
  messagingSenderId: "272187424843",
  appId: "1:272187424843:web:194cd356609321bbebcdce",
  measurementId: "G-45P2DJZETZ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
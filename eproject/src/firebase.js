// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxuN1Uu8K5D1gU0viKlrchA0djjxwQqNQ",
  authDomain: "ecommers-10816.firebaseapp.com",
  projectId: "ecommers-10816",
  storageBucket: "ecommers-10816.firebasestorage.app",
  messagingSenderId: "272187424843",
  appId: "1:272187424843:web:194cd356609321bbebcdce",
  measurementId: "G-45P2DJZETZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
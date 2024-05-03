// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpuS7U2znthTRhF9fMKzt9e_ydbtA2WPU",
  authDomain: "ecommerce-56449.firebaseapp.com",
  projectId: "ecommerce-56449",
  storageBucket: "ecommerce-56449.appspot.com",
  messagingSenderId: "590241180973",
  appId: "1:590241180973:web:5baefa3fcd371589e8f7a4",
  measurementId: "G-QQDGG8NB6P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();


const analytics = getAnalytics(app);
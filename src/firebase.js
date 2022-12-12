// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBBLLAvmh0dunEgJj3GiSpq6yJWGOIDWSw",
  authDomain: "yoga-form-bde99.firebaseapp.com",
  projectId: "yoga-form-bde99",
  storageBucket: "yoga-form-bde99.appspot.com",
  messagingSenderId: "908170426946",
  appId: "1:908170426946:web:4acf1ad96ab763535acbdb",
  measurementId: "G-FNQV9BGE3Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth=getAuth();

export {app,auth};
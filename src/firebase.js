// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {
  getFirestore
} from "firebase/firestore";

import {
  getStorage
} from "firebase/storage"




const firebaseConfig = {
  apiKey: "AIzaSyBBLLAvmh0dunEgJj3GiSpq6yJWGOIDWSw",
  authDomain: "yoga-form-bde99.firebaseapp.com",
  projectId: "yoga-form-bde99",
  storageBucket: "yoga-form-bde99.appspot.com",
  messagingSenderId: "908170426946",
  appId: "1:908170426946:web:4acf1ad96ab763535acbdb",
  measurementId: "G-FNQV9BGE3Q"
};



const app = initializeApp(firebaseConfig);
const auth=getAuth();
const db = getFirestore(app);
const storage = getStorage(app);

export {
  app,
  auth,
  db,
  storage
};
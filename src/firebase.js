// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';

import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyBBLLAvmh0dunEgJj3GiSpq6yJWGOIDWSw",
  authDomain: "yoga-form-bde99.firebaseapp.com",
  databaseURL: "https://yoga-form-bde99-default-rtdb.firebaseio.com",
  projectId: "yoga-form-bde99",
  storageBucket: "yoga-form-bde99.appspot.com",
  messagingSenderId: "908170426946",
  appId: "1:908170426946:web:4acf1ad96ab763535acbdb",
  measurementId: "G-FNQV9BGE3Q"
};



const app = initializeApp(firebaseConfig);
const auth=getAuth();
const db = getDatabase(app);

export {
  app,
  auth,
  db
};
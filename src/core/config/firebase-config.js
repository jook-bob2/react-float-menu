/* eslint-disable import/no-anonymous-default-export */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBymKq2GjS9D16eHIGnRfl83NOCcu2u0Rc",
  authDomain: "react-firebase-8171f.firebaseapp.com",
  projectId: "react-firebase-8171f",
  storageBucket: "react-firebase-8171f.appspot.com",
  messagingSenderId: "222526200869",
  appId: "1:222526200869:web:95cbaad2692060b19d33cc",
  measurementId: "G-22XXBHRXN5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(app);
const firebaseDB = getFirestore(app);

export default {
  firebaseAuth,
  firebaseDB,
  firebaseSignUp: createUserWithEmailAndPassword,
  firebaseSignIn: signInWithEmailAndPassword,
  firebaseSignOut: signOut,
};

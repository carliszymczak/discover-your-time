// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBhs4V46kUS88zPCKHeNBQoUeLXLBibg2M",
  authDomain: "discover-your-time.firebaseapp.com",
  projectId: "discover-your-time",
  storageBucket: "discover-your-time.appspot.com",
  messagingSenderId: "1027840645894",
  appId: "1:1027840645894:web:36c7724673f44a0efd9c87",
  measurementId: "G-DNHJFWSQHZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
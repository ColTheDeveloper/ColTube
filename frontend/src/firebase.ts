// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5myTpKyAhcluXshCc4peZBogdOmElNS4",
  authDomain: "coltube-692d5.firebaseapp.com",
  projectId: "coltube-692d5",
  storageBucket: "coltube-692d5.appspot.com",
  messagingSenderId: "772315566556",
  appId: "1:772315566556:web:58d8045d13d1e706aa7f19"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth()
export const provider= new GoogleAuthProvider()

export default app
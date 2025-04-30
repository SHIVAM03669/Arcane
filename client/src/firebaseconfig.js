// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXQUW0NGiGK1zPxfOXqPmacEbIZXozVys",
  authDomain: "arcanerealestate.firebaseapp.com",
  projectId: "arcanerealestate",
  storageBucket: "arcanerealestate.firebasestorage.app",
  messagingSenderId: "512344794275",
  appId: "1:512344794275:web:14d1cd277e4f0b179c8b16",
  measurementId: "G-J12VPB82VR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
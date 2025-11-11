// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATYyMZ_OBZe-KrfWgpYE9ejM7Wm1rV1Yo",
  authDomain: "freemarket-5612f.firebaseapp.com",
  projectId: "freemarket-5612f",
  storageBucket: "freemarket-5612f.appspot.com",
  messagingSenderId: "979577498563",
  appId: "1:979577498563:web:db05e45984e9252bf8eb76"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Export it
export { app };

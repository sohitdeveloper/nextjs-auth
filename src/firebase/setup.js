import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDKzRDy1QC17TA6m4eVd6faeynZ_O_Brk8",
  authDomain: "login-with-phone-e059a.firebaseapp.com",
  projectId: "login-with-phone-e059a",
  storageBucket: "login-with-phone-e059a.appspot.com",
  messagingSenderId: "228039526167",
  appId: "1:228039526167:web:caf6076d39cc946f551952",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

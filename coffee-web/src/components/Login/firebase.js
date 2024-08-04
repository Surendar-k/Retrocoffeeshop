
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyDhXFOkiyV5TytzyuLbHOuJc3YehO9gZe8",
  authDomain: "caffeeespot.firebaseapp.com",
  projectId: "caffeeespot",
  storageBucket: "caffeeespot.appspot.com",
  messagingSenderId: "768055799569",
  appId: "1:768055799569:web:667957365c64d3966a26b0",
  measurementId: "G-W6F80Y2Y4S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
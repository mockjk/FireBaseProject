// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGLp-LEkTmxz51eh3JmN9ZwUo80hlvKSs",
  authDomain: "bento-aula.firebaseapp.com",
  databaseURL: "https://bento-aula-default-rtdb.firebaseio.com",
  projectId: "bento-aula",
  storageBucket: "bento-aula.appspot.com",
  messagingSenderId: "247082686668",
  appId: "1:247082686668:web:fb221293c33b45eb128a69"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
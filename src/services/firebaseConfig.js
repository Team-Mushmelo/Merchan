// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCVgCh7jg2HJDvZuUjam-YzaPTmZhiyK6Y",
    authDomain: "merchan-app-react.firebaseapp.com",
    projectId: "merchan-app-react",
    storageBucket: "merchan-app-react.appspot.com",
    messagingSenderId: "491864034158",
    appId: "1:491864034158:web:c124a623863116ca69cf7f",
    measurementId: "G-2DN1N6F8ME"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const firestore = getFirestore(app);
export const auth = getAuth(app);
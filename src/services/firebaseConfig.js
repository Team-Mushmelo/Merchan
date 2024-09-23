// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

// Your web app's Firebase configuration
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

export const firestore = getFirestore(app);
export const auth = getAuth(app);

export {
    doc,
    getDoc,
    updateDoc,
    arrayUnion,
    arrayRemove,
};

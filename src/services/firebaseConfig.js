// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

import { getFirestore } from "firebase/firestore";
import { API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID, MEASUREMENT_ID } from 'react-native-dotenv';

const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID,
    measurementId: MEASUREMENT_ID
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);
export const auth = initializeAuth(app, { persistence: getReactNativePersistence(ReactNativeAsyncStorage) });
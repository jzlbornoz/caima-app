// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const initFirebaseFunction = async () => {
  return initializeApp({
    apiKey: import.meta.env.PUBLIC_APP_FIREBASE_API_KEY,
    authDomain: import.meta.env.PUBLIC_APP_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.PUBLIC_APP_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.PUBLIC_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.PUBLIC_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.PUBLIC_APP_FIREBASE_APP_ID,
  });
};

export default initFirebaseFunction;

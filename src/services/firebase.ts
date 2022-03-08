import { initializeApp, getApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_AP_API_KEY,
  authDomain: import.meta.env.VITE_AP_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_AP_DATABASE_URL,
  projectId: import.meta.env.VITE_AP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_AP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_AP_MESSAGINS_SENDER_ID,
  appId: import.meta.env.VITE_AP_APP_ID,
};

  initializeApp(firebaseConfig);

const auth = getAuth();
const database = getDatabase();

export { auth, database, initializeApp }
import { initializeApp } from "firebase/app";

import 'firebase/auth'
import 'firebase/database'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_AP_API_KEY,
  authDomain: import.meta.env.VITE_AP_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_AP_DATABASE_URL,
  projectId: import.meta.env.VITE_AP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_AP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_AP_MESSAGINS_SENDER_ID,
  appId: import.meta.env.VITE_AP_APP_ID,
};

const app = initializeApp(firebaseConfig);

export { initializeApp }




import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "vote-saathi.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "vote-saathi",
  storageBucket: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.appspot.com`,
  messagingSenderId: "555550011014",
  appId: "1:555550011014:web:ad748f147385435aaa38ef"
};

const app = initializeApp(firebaseConfig);
let analytics = null;

// Initialize analytics only on client-side and if supported
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export const trackInteraction = (eventName, params = {}) => {
  if (analytics) {
    logEvent(analytics, eventName, params);
  }
  console.log(`[Analytics] ${eventName}`, params);
};

export default app;

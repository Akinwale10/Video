// ==========================================
// Firebase Configuration
// Replace these values with your actual Firebase credentials
// ==========================================

// NOTE: DO NOT commit this file with real credentials to a public repository
// Use environment variables or a secure config management system in production

const firebaseConfig = {
    apiKey: "YOUR_API_KEY_HERE",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID"
};

// Initialize Firebase (uncomment when Firebase SDK is added)
/*
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
*/

// Export configuration for direct script tag usage
if (typeof window !== 'undefined') {
    window.firebaseConfig = firebaseConfig;
}

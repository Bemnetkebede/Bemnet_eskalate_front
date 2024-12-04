// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyASnFACyc9Gc5cK1ycdOMc7n2QhnN8XUU8",
    authDomain: "clone-1fa5c.firebaseapp.com",
    projectId: "clone-1fa5c",
    storageBucket: "clone-1fa5c.firebasestorage.app",
    messagingSenderId: "993483221005",
    appId: "1:993483221005:web:4537c29688da85137a4d44",
    measurementId: "G-2QVXTLDVY9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app)
export const db = getfirestore(app)

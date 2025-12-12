// firebase config placeholder
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";
const firebaseConfig = {
    apiKey: "AIzaSyDPZzbAAKQ8whzK3B60Js3092e6sFMOPII",
    authDomain: "quan-ly-xe-vi-pham.firebaseapp.com",
    projectId: "quan-ly-xe-vi-pham",
    storageBucket: "quan-ly-xe-vi-pham.firebasestorage.app",
    messagingSenderId: "29325274914",
    appId: "1:29325274914:web:887b78c0c56df9ca037f7b",
    measurementId: "G-CT8BM82NT8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db }
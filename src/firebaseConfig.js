// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0Rxlv6P7Gl8dSRRuDN60gcKMl4ZoiD30",
  authDomain: "test-a2e83.firebaseapp.com",
  databaseURL: "https://test-a2e83-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "test-a2e83",
  storageBucket: "test-a2e83.appspot.com",
  messagingSenderId: "290701629455",
  appId: "1:290701629455:web:8d2a3a6fc2977b9c7deb7a",
  measurementId: "G-J8SEC4EQSM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export {app, storage};
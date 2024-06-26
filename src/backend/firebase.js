// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

/**
 * Firebase configuration object
 * @constant
 * @type {Object}
 */
const firebaseConfig = {
  apiKey: "AIzaSyBOeAyHGGvr1AtNdHTux-YJ0pP9tQeY_F8",
  authDomain: "parkwhere-6ed64.firebaseapp.com",
  databaseURL:
    "https://parkwhere-6ed64-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "parkwhere-6ed64",
  storageBucket: "parkwhere-6ed64.appspot.com",
  messagingSenderId: "324308904779",
  appId: "1:324308904779:web:bace811ff1f9e27b64d6ce",
  measurementId: "G-7H8MW5M0M2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the Firebase Realtime Database service
const db = getDatabase();

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { db, auth };

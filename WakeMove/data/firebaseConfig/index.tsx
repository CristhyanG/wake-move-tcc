import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDBY2Etu9eyabqkkw88PvShpwGVuNtNGXk",
    authDomain: "wakemove-7ef15.firebaseapp.com",
    projectId: "wakemove-7ef15",
    storageBucket: "wakemove-7ef15.firebasestorage.app",
    messagingSenderId: "1066857242896",
    appId: "1:1066857242896:web:a8b2937210a1c0596cc595"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export {app, auth, db}


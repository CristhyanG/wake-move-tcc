import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDBY2Etu9eyabqkkw88PvShpwGVuNtNGXk",
  authDomain: "wakemove-7ef15.firebaseapp.com",
  projectId: "wakemove-7ef15",
  storageBucket: "wakemove-7ef15.appspot.com",
  messagingSenderId: "1066857242896",
  appId: "1:1066857242896:web:a8b2937210a1c0596cc595",
};

// Inicializar o app Firebase
export const app = initializeApp(firebaseConfig);

// Inicializar Auth
export const auth = getAuth(app);

// Inicializar Firestore
export const db = getFirestore(app);

// Exemplo de criação de uma coleção Firestore
export const usersCollection = collection(db, "users");

console.log("Firebase inicializado com Auth e Firestore configurados.");

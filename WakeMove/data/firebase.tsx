import{ getDocs, getFirestore, collection, addDoc } from 'firebase/firestore';
import { initializeApp } from "firebase/app";

interface AddNewFavorite {
  Ponto_A: string;
  Fate: string;
  data: any;
}
const firebaseConfig = {
  apiKey: "AIzaSyDBY2Etu9eyabqkkw88PvShpwGVuNtNGXk",
  authDomain: "wakemove-7ef15.firebaseapp.com",
  projectId: "wakemove-7ef15",
  storageBucket: "wakemove-7ef15.appspot.com",
  messagingSenderId: "1066857242896",
  appId: "1:1066857242896:web:a8b2937210a1c0596cc595"
  };
  
  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app);

  const userCollectionRef = collection(db, "Usuários");

  export async function addUser(data: AddNewFavorite) {
        try {
          const docRef = await addDoc(userCollectionRef, data);
          return docRef.id;
        } catch (error) {
          console.error("Erro ao adicionar usuário: ", error);
        }
    };

    export async function getAllUsers() {
        try {
        const data = await getDocs(userCollectionRef);
        return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        } catch (error) {
        console.error("Erro ao obter os documentos: ", error);
        }
    };

    export const addNewFavorite = collection(db,"Favorite")
    
    export async function addFavorite(data: AddNewFavorite) {
      try {
        console.log("Tentando adicionar a rota:", data); 
        const docRef = await addDoc (addNewFavorite, data);
        console.log("Documento adicionado com ID: ", docRef.id); 
        return docRef.id;
      } catch (error) {
        console.error("Erro ao adicionar nova rota", error);
      }
    }
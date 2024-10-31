import { getDocs, getFirestore, collection, addDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { initializeApp } from "firebase/app";

interface AddNewFavorite {
  Ponto_A: string;
  Fate: string;
  data: any;
  callback: any
}

interface RmFavoriteProps {
  value: string
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

// Adicionando favorito

export const addNewFavorite = collection(db, "Favorite")

export async function addFavorite(data: AddNewFavorite) {
  try {
    console.log("Tentando adicionar a rota:", data);
    const docRef = await addDoc(addNewFavorite, data);
    console.log("Documento adicionado com ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Erro ao adicionar nova rota", error);
  }
};


// Retornando dados do Favorito

export const viewNewFavorite = collection(db, "Favorite")

export async function viewFavorite(callback) {
  try {
    const unsubscribe = onSnapshot(viewNewFavorite, (snapshot) => {
      const favorites = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(favorites);
    })
  } catch (error) {
    console.error("Erro ao retornar dados", error)
  }
}

// Removendo Favorito

export const rmFavoriteCollection = collection(db, 'Favorite');

export async function RmButton(value) {
  try {
    const del = doc(rmFavoriteCollection, value); 
    await deleteDoc(del); 
    console.log('Campo removido com ID: ', value);
    return value;
  } catch (error) {
    console.error('Erro ao remover rota', error);
  }
}


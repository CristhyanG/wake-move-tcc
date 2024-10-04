import{ getDocs, getFirestore, collection, addDoc } from 'firebase/firestore';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBH9c1JNyktUuTwn9D58byBU1zJwFXfpqQ",
    authDomain: "ex--routerdb.firebaseapp.com",
    projectId: "ex--routerdb"
  
  };
  
  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app);

  const userCollectionRef = collection(db, "Usuários");

  export async function addUser(data) {
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
        
    
  
  
   
    
  
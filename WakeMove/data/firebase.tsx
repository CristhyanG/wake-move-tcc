
import { getDocs, getFirestore, collection, addDoc, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

interface AddNewFavorite {
  Ponto_A: string;
  Fate: string;
  data: any;
  callback: (id: string) => void
}

interface RmFavoriteProps {
  value: string
}


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
    const docRef = doc(rmFavoriteCollection, value); // Cria uma referência ao documento dentro da coleção
    await deleteDoc(docRef); 
    console.log('Campo removido com ID: ', value);
    return value;
  } catch (error) {
    console.error('Erro ao remover rota', error);
  }
}

// Edição de dados

export const editFavorite = collection(db, 'Favorite')
export async function EditButton(id: string, data: Partial<AddNewFavorite>) {
  try{
    const docRef = doc(editFavorite, id);
    await updateDoc(docRef, data);
    console.log("Rota editada com sucesso")
    return data
  }
  catch(error){
    console.error("Erro ao editar rota", error)
  }
}

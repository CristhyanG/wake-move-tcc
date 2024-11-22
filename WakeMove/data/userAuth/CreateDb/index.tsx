// // src/data/firebase/addFavorite.ts
// import { db } from '@/data/Config';
// import { collection, addDoc } from 'firebase/firestore';

// interface AddNewFavorite {
//   Ponto_A: string;
//   Fate: string;
//   data: any;
//   callback: (id: string) => void;
// }

// export const addNewFavorite = collection(db, "Favorite");

// export async function addFavorite(data: AddNewFavorite) {
//   try {
//     console.log("Tentando adicionar a rota:", data);
//     const docRef = await addDoc(addNewFavorite, data);
//     console.log("Documento adicionado com ID: ", docRef.id);
//     return docRef.id;
//   } catch (error) {
//     console.error("Erro ao adicionar nova rota", error);
//   }
// }

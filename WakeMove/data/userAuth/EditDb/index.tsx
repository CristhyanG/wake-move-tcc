// src/data/firebase/editFavorite.ts
import { db } from '@/data/Config';
import { collection, doc, updateDoc } from 'firebase/firestore';

interface AddNewFavorite {
  Ponto_A: string;
  Fate: string;
  data: any;
  callback: (id: string) => void;
}

export const editFavorite = collection(db, 'Favorite');

export async function EditButton(id: string, data: Partial<AddNewFavorite>) {
  try {
    const docRef = doc(editFavorite, id);
    await updateDoc(docRef, data);
    console.log("Rota editada com sucesso");
    return data;
  } catch (error) {
    console.error("Erro ao editar rota", error);
  }
}

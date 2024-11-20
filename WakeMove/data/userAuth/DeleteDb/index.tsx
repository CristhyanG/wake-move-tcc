// src/data/firebase/rmFavorite.ts
import { db } from '@/data/Config';
import { collection, doc, deleteDoc } from 'firebase/firestore';

export const rmFavoriteCollection = collection(db, 'Favorite');

export async function RmButton(value: string) {
  try {
    const docRef = doc(rmFavoriteCollection, value);
    await deleteDoc(docRef);
    console.log('Campo removido com ID: ', value);
    return value;
  } catch (error) {
    console.error('Erro ao remover rota', error);
  }
}

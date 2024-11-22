import { db } from '@/data/Config';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { Favorite } from "@/data/userAuth/ViewDb";  // Corrigindo o caminho da interface Favorite

const favoriteCollection = collection(db, "Favorite");

// Função para obter os favoritos de um usuário
export const viewFavorite = (userId: string, callback: (favorites: Favorite[]) => void) => {
  const uidQuery = query(favoriteCollection, where("userId", "==", userId));

  const unsubscribe = onSnapshot(uidQuery, (snapshot) => {
    const favorites: Favorite[] = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        Origin: data.Origin,
        Destination: data.Destination,
      } as Favorite;
    });

    callback(favorites);
  });

  return unsubscribe;  // Retorna o unsubscribe para limpeza
};

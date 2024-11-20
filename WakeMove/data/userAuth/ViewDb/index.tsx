// src/data/firebase/viewFavorite.ts
import { db } from '@/data/Config';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

// Definindo a interface Favorite diretamente no arquivo
export interface Favorite {
  id: string;
  Origin: string;
  Destination: string;
  userId: string;
}

export const viewNewFavorite = collection(db, "Favorite");

// Função para obter os favoritos de um usuário
export async function viewFavorite(userId: string, callback: (favorites: Favorite[]) => void) {
  try {
    // Cria a consulta para buscar favoritos do usuário
    const uidQuery = query(viewNewFavorite, where('userId', '==', userId));

    // Retorna o unsubscribe para a função de limpeza (para parar a escuta)
    const unsubscribe = onSnapshot(uidQuery, (snapshot) => {
      // Mapeia os documentos recebidos e extrai os dados para o formato de Favorite
      const favorites: Favorite[] = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,  // O id é obtido do Firestore
          ...data,  // Espalha o restante dos dados no objeto
        } as Favorite;  // Cast para garantir que os dados são do tipo Favorite
      });

      // Chama o callback passando os favoritos
      callback(favorites);
    });

    return unsubscribe;  // Retorna o unsubscribe para que o ouvinte possa ser removido quando necessário
  } catch (error) {
    console.error("Erro ao retornar dados", error);
  }
}

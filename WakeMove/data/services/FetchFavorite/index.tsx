import { viewFavorite } from "@/data/userAuth/ViewDb";

// Definindo a interface para os favoritos
export interface Favorite {
  id: string;
  Origin: string;
  Destination: string;
}

// Tipagem do callback para receber um array de favoritos e retornar void
export const fetchFavorites = async (userId: string, callback: (favorites: Favorite[]) => void): Promise<void> => {
  if (!userId) {
    console.error("Erro: userId não válido");
    return Promise.resolve();  // Retorna uma promise resolvida se userId não for válido
  }

  try {
    // Supondo que viewFavorite seja uma função assíncrona
    const favorites = await viewFavorite(userId);  // Aguarda a Promise retornar os favoritos
    callback(favorites);  // Chama o callback com a lista de favoritos
  } catch (error) {
    console.error("Erro ao buscar favoritos:", error);  // Tratamento de erro
  }
};

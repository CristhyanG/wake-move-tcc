import { Favorite } from "@/data/userAuth/ViewDb";
import { viewFavorite } from "@/data/userAuth/ViewDb";

// Tipagem do callback para receber um array de favoritos e retornar void
export const fetchFavorites = (userId: string, callback: (favorites: Favorite[]) => void): void => {
  if (!userId) {
    console.error("Erro: userId não válido");
    return;  // Não faz nada se o userId não for válido
  }

  try {
    // Chama o viewFavorite que irá escutar as mudanças no Firestore
    viewFavorite(userId, callback);  // Passa o callback para manipular os favoritos
  } catch (error) {
    console.error("Erro ao buscar favoritos:", error);  // Tratamento de erro
  }
};

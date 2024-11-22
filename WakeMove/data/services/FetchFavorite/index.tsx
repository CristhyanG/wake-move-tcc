import { viewFavorites } from "@/data/userAuth/ViewDb";
import { Favorite } from "@/data/userAuth/ViewDb";
// Função que agora usa o userUniqueId
export const fetchFavorites = (email: string, callback: (favorites: Favorite[]) => void): void => {
  try {
    // Chama a função que filtra os favoritos pelo userUniqueId
    viewFavorites(email, callback);  // Passa o callback para manipular os favoritos
  } catch (error) {
    console.error("Erro ao buscar favoritos:", error);  // Tratamento de erro
  }
};

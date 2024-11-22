import { doc, onSnapshot, query, where } from "firebase/firestore";
import { favoriteCollection } from "@/data/Config";  // Certifique-se de que o caminho está correto

// Definindo a interface Favorite diretamente no arquivo
export interface Favorite {
  id: string;
  Origin: string;
  Destination: string;
}

// Modificando a função de busca para filtrar por userUniqueId
export const viewFavorites = (email: string, callback: (favorites: Favorite[]) => void): void => {
  if (!email) {
    console.error("Erro: email não válido");
    return;
  }

  // Consulta para buscar favoritos filtrados pelo email
  const favoritesQuery = query(favoriteCollection, where("email", "==", email));

  onSnapshot(favoritesQuery, (snapshot) => {
    const favorites: Favorite[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data() as Omit<Favorite, 'id'>;
      favorites.push({ id: doc.id, ...data });
    });
    callback(favorites); // Passa os favoritos filtrados para o callback
  }, (error) => {
    console.error("Erro ao buscar favoritos:", error);
  });
};



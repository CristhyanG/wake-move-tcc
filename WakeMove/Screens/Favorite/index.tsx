import React, { useState, useEffect } from "react";
import AddFavorite from "@/Components/Organismo/ManageFavorites"; 
import { CustomTitle } from "@/Components/Atomo/Title";
import { Container } from "@/Components/Atomo/container";
import { fetchFavorites } from "@/data/services/FetchFavorite"; 
import { Favorite } from "@/data/userAuth/ViewDb";
import { useAuth } from "@/data/userAuth/userCad"; // Importando o hook de autenticação

export const FavoriteScreen = () => {
  const { user } = useAuth(); // Pegando o usuário logado do hook
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  // Função para buscar os favoritos quando a tela for carregada
  useEffect(() => {
    if (user) {
      // Aqui você deve pegar o userId do usuário logado
      fetchFavorites(user.uid, (favoritesData) => {
        setFavorites(favoritesData); // Atualiza o estado com os favoritos
      });
    }
  }, [user]); // Dependência em `user` para atualizar quando o usuário mudar

  return (
    <Container>
      <CustomTitle> Favoritos </CustomTitle>
      <AddFavorite favorites={favorites} />
    </Container>
  );
};

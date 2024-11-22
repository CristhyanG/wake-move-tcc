import React from 'react';
import FavoritesList from '@/data/services/viewFavorite';
import { CustomTitle } from '@/Components/Atomo/Title';
import { Container } from '@/Components/Atomo/container';
import { Text } from 'react-native';
import { useAuth } from '@/data/userAuth/userCad'; // Importando o hook de autenticação

export const FavoriteScreen = () => {
  const { user } = useAuth(); // Pegando o usuário logado do hook
  
  return (
    <Container>
      <CustomTitle>Favoritos</CustomTitle>
      {user ? <FavoritesList /> : <Text> Carregando...</Text>}
    </Container>
  );
};

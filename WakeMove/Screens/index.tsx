import React, { useState } from "react";
import { CustomTitle } from '../Components/Atomo/Title';
import { ImgIndex } from '../Components/Atomo/imgIndex';
import { StackNavigationProp } from "@react-navigation/stack";
import NavButton from "@/Components/Atomo/navButton";
import { styles } from "@/Components/Atomo/navButton/styles";
import { Container } from '@/Components/container/index';
import { SeacrhView } from "@/Components/molecula/SeacrhView/index"
import 'react-native-get-random-values';


interface HomeScreenProps {
  navigation: StackNavigationProp<any>;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {

  const query = {
    key: 'AIzaSyBVrTs2yDlY96RSXS87DbMSO4QYbHP-sXY',
    language: 'pt-BR',
    types: 'address',
    components: 'country:br'
  }


  return (
    <Container>
      <CustomTitle>Wake Move</CustomTitle>
      <ImgIndex />
      <SeacrhView
        query={query}
        navigation={navigation}
      />
      <NavButton
        style={styles.btn}
        caminho="Favorite"
        label="Favoritos"
        navigation={navigation}
      />
      <NavButton
        style={styles.btn}
        caminho="Cadastro"
        label="Cadastro"
        navigation={navigation}
      />
    </Container>
  );
};

export default HomeScreen;

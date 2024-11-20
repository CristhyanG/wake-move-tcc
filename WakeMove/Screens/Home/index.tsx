import React from 'react';
import { CustomTitle } from '@/Components/Atomo/Title';
import { ImgIndex } from '@/Components/Atomo/imgIndex';
import { StackNavigationProp } from "@react-navigation/stack";
import NavButton from "@/Components/Atomo/navButton";
import { styles } from "@/Components/Atomo/navButton/styles";
import { Container } from '@/Components/Atomo/container/index';
import { SearchView } from "@/Components/molecula/SeacrhView/index"
import 'react-native-get-random-values';
import { useAuth } from "@/data/userAuth/userCad";
import { Warning } from "@/Components/Atomo/Cadastrar";
import { View } from "react-native";

interface HomeScreenProps {
  navigation: StackNavigationProp<any>;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {

  const { user } = useAuth()

  return (
    <Container>
      <CustomTitle>Wake Move</CustomTitle>
      <ImgIndex />
      <SearchView
        page="Final"
        caminho="InitialLocation"
        navigation={navigation}
      />
      {user ? (
        <NavButton
          style={styles.btn}
          caminho="Favorite"
          label="Favoritos"
          navigation={navigation}
        />
      ) : (
        <Warning />
      )}
      {!user ? (
        <NavButton
          style={styles.btn}
          caminho="Cadastro"
          label="Cadastro"
          navigation={navigation}
        />
      ) : (
        <View></View>
      )}
    </Container>
  );
};

export default HomeScreen;

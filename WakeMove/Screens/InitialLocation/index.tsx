import React from "react";
import { CustomTitle } from '@/Components/Atomo/Title';
import { ImgIndex } from '@/Components/Atomo/imgIndex';
import { StackNavigationProp } from "@react-navigation/stack";
import NavButton from "@/Components/Atomo/navButton";
import { styles } from "@/Components/Atomo/navButton/styles";
import { Container } from '@/Components/Atomo/container/index';
import { SearchView } from "@/Components/molecula/SeacrhView/index"
import 'react-native-get-random-values';


interface InitialLocationprops {
  navigation: StackNavigationProp<any>;
}

const InitialLocationScreen: React.FC<InitialLocationprops> = ({ navigation }) => {
  return (
    <Container>
      <CustomTitle>Wake Move</CustomTitle>
      <ImgIndex />

      <SearchView
        page="Current"
        caminho="FinalLocation"
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
      <NavButton
        style={styles.btn}
        caminho="FinalLocation"
        label="Enviar dados"
        navigation={navigation}
      />
    </Container>
  );
};

export default InitialLocationScreen;

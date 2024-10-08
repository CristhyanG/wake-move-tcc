import React, { useState } from "react";
import { CustomTitle } from '../Components/Title'; // Corrigido para CustomTitle
import { CustomText } from '../Components/Text'; // Corrigido para CustomText
import { View } from "react-native"; // Removido Button, se não for usado
import { ImgIndex } from '../Components/imgIndex';
import { Input } from '../Components/TextInput';
import { StackNavigationProp } from "@react-navigation/stack";
import NavButton from "@/Components/navButton";
import {Container} from '../Components/View/index'


interface HomeScreenProps {
  navigation: StackNavigationProp<any>;
}



const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [ponto, setPonto] = useState('');

  return (
    <Container>
      <CustomTitle>Wake Move</CustomTitle>
      
      <ImgIndex />
      <Input
        placeholder="Para onde vamos ?"
        value={ponto}
        onChangeText={setPonto}
      />

      <NavButton
        caminho="Cadastro"
        label="Cadastro"
        navigation={navigation}
      />
    </Container>
  );
};

export default HomeScreen;
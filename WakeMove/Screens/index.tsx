import React, { useState } from "react";
import { CustomTitle } from '../Components/Title'; 
import { View } from "react-native";
import { ImgIndex } from '../Components/imgIndex';
import { Input } from '../Components/TextInput';
import { StackNavigationProp } from "@react-navigation/stack";
import NavButton from "@/Components/navButton";
import { Container } from '@/Components/container/index'
import { Lupa } from "@/Components/molecula/icon"
import {LocationProvider} from "@/Components/locationProvider"
import {MapDisplay} from "@/Components/mapDisplay"

interface HomeScreenProps {
  navigation: StackNavigationProp<any>;
}

const lupa = require('@/src/Img/lupa.png');

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [ponto, setPonto] = useState('');

  return (
    <Container>
    <LocationProvider>
      <CustomTitle>Wake Move</CustomTitle>
      
      <ImgIndex />

      <MapDisplay/>

      <Input
        placeholder="Para onde vamos ?"
        value={ponto}
        onChangeText={setPonto}
      />
      <Lupa/>
      <NavButton
        caminho="Cadastro"
        label="Cadastro"
        navigation={navigation}
      />

      <NavButton
        caminho="Location"
        label="Localização"
        navigation={navigation}
      />
      </LocationProvider>
    </Container>
  );
};

export default HomeScreen;

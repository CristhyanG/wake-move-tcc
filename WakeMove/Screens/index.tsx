import React, { useState } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { CustomTitle } from '../Components/Atomo/Title';
import { ImgIndex } from '../Components/Atomo/imgIndex';
import { StackNavigationProp } from "@react-navigation/stack";
import NavButton from "@/Components/Atomo/navButton";
import { styles } from "@/Components/Atomo/navButton/styles";
import { Container } from '@/Components/container/index';
import { SeacrhView } from "@/Components/molecula/SeacrhView/index"
import { useAddress } from "@/Components/AddressContext";

interface HomeScreenProps {
  navigation: StackNavigationProp<any>;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { address, setAddress } = useAddress();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Container>
        <CustomTitle>Wake Move</CustomTitle>
        <ImgIndex />
        <SeacrhView
          value={address}
          onChangeText={setAddress} />
        <NavButton
          style={styles.btn}
          caminho="Cadastro"
          label="Cadastro"
          navigation={navigation}
        />
        <NavButton
          style={styles.btn}
          caminho="Location"
          label="Localização"
          navigation={navigation}
        />
      </Container>
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;

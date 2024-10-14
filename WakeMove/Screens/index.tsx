import React from "react";
import { CustomTitle } from '../Components/Title'; 
import { Alert } from "react-native";
import { ImgIndex } from '../Components/imgIndex';
import { Input } from '../Components/TextInput';
import { StackNavigationProp } from "@react-navigation/stack";
import NavButton from "@/Components/navButton";
import { Container } from '@/Components/container/index';
import { Lupa } from "@/Components/molecula/icon";
import { LocationProvider } from "@/Components/locationProvider";
import { MapDisplay } from "@/Components/mapDisplay";
import CustomAlert from "@/Components/alert/index";
import { useAddress } from "@/Components/AddressContext";

interface HomeScreenProps {
  navigation: StackNavigationProp<any>;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { address, setAddress } = useAddress();

  const showAlert = () => {
    Alert.alert("Localizando");
  };

  return (
    <Container>
      <LocationProvider>
        <CustomTitle>Wake Move</CustomTitle>
        
        <ImgIndex />
        <Input
          placeholder="Para onde vamos ?"
          value={address}
          onChangeText={setAddress}
        />
        <Lupa />
        <NavButton
          onPress={() => {}}
          caminho="Cadastro"
          label="Cadastro"
          navigation={navigation}
        />
        <NavButton
          onPress={showAlert}
          caminho="Location"
          label="Localização"
          navigation={navigation}
        />
      </LocationProvider>
    </Container>
  );
};

export default HomeScreen;

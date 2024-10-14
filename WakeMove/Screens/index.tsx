
import React, { useState } from "react";
import { CustomTitle } from '../Components/Title';
import { Alert, Button } from "react-native";
import { ImgIndex } from '../Components/imgIndex';
import { Input } from '../Components/TextInput';
import { StackNavigationProp } from "@react-navigation/stack";
import NavButton from "@/Components/navButton";
import { Container } from '@/Components/container/index';
import { Lupa } from "@/Components/molecula/icon";
import { LocationProvider } from "@/Components/locationProvider";
import { MapDisplay } from "@/Components/mapDisplay";
import { useAddress } from "@/Components/AddressContext";
import { CustonModal } from "@/Components/alert/index"; // Ajuste o caminho conforme necessário

interface HomeScreenProps {
  navigation: StackNavigationProp<any>;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  
  const { address, setAddress } = useAddress();
        
  const [modalVisible, setModalVisible] = useState(false);

  const handleShowModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    Alert.alert("Modal fechado");
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
          caminho="Cadastro"
          label="Cadastro"
          navigation={navigation}
        />
        <NavButton
          caminho="Location"
          label="Localização"
          navigation={navigation}
        />
        
         <Button
          title="Mostrar Modal"
          onPress={handleShowModal}
          />

        <CustonModal
          visible={modalVisible}
          onClose={handleCloseModal}
          modalText="Usuário cadastrado"
        >
        </CustonModal>
      </LocationProvider>
    </Container>
  );
};

export default HomeScreen;

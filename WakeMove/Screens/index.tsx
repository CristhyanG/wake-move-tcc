import React, { useState } from "react";
import { CustomTitle } from '../Components/Title';
import { Alert, Button } from "react-native";
import { ImgIndex } from '../Components/imgIndex';
import { Input } from '../Components/TextInput';
import { StackNavigationProp } from "@react-navigation/stack";
import NavButton from "@/Components/navButton";
import { Container } from '@/Components/container/index';
import { Lupa } from "@/Components/molecula/icon";
import { useAddress } from "@/Components/AddressContext";
import { CustonModal } from "@/Components/alert/index"; // Ajuste o caminho conforme necessário
import { useGeocode } from '@/Components/GeocodeProvider';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';



interface HomeScreenProps {
  navigation: StackNavigationProp<any>;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { address, setAddress } = useAddress();
  const { geocodeAddress } = useGeocode();
  const [modalVisible, setModalVisible] = useState(false);

  const handleLocationPress = async (address: string) => {
    const result = await geocodeAddress(address);
    if (result.success) {
      navigation.navigate('Location');
    } else {
      Alert.alert("Geocoding failed", result.message || "Unknown error");
      console.error("Geocoding failed: ", result.message);
    }
  };

  const handleShowModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    Alert.alert("Modal fechado");
  };

  return (
    <Container>
        <CustomTitle>Wake Move</CustomTitle>

        <ImgIndex />
        <GooglePlacesAutocomplete
          placeholder="Para onde vamos?"
          onPress={(data, details = null) => {
            const fullAddress = data.description;
            setAddress(fullAddress);
            handleLocationPress(fullAddress);
          }}
          query={{
            key: 'AIzaSyBVrTs2yDlY96RSXS87DbMSO4QYbHP-sXY',
            language: 'pt-BR',
            types: 'address',
            components: 'country:br'
          }}
          fetchDetails={true}
          styles={{
            container: { flex: 0, margin: 20 },
            textInputContainer: { marginBottom: 20 },
            textInput: { backgroundColor: '#f00' }
            
          }}
        />
        <Lupa />
        <NavButton
          caminho="Cadastro"
          label="Cadastro"
          navigation={navigation}
        />
        <Button
          title="Enviar localização"
          onPress={() => handleLocationPress(address)}
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
    </Container>
  );
};

export default HomeScreen;

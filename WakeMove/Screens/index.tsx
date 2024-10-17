import React, { useState } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { CustomTitle } from '../Components/Atomo/Title';
import { ImgIndex } from '../Components/Atomo/imgIndex';
import { StackNavigationProp } from "@react-navigation/stack";
import NavButton from "@/Components/Atomo/navButton";
import { styles } from "@/Components/Atomo/navButton/styles";
import { Container } from '@/Components/container/index';
import { Lupa } from "@/Components/molecula/icon";
import { useAddress } from "@/Components/AddressContext";
import { useGeocode } from '@/Components/GeocodeProvider';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
//import { SeacrhView } from "@/Components/molecula/SeacrhView/index";


interface HomeScreenProps {
  navigation: StackNavigationProp<any>;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  
  const { address, setAddress } = useAddress();

  const { geocodeAddress } = useGeocode();
  
  const handleLocationPress = async (address: string) => {
    const result = await geocodeAddress(address);
    if (result.success) {
      navigation.navigate('Location');
    } else {
      Alert.alert("Geocoding failed", result.message || "Unknown error");
      console.error("Geocoding failed: ", result.message);
    }
  };


  return (
    <KeyboardAvoidingView
      style=({flex: 1})
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
    
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
          style={styles.btn}
          caminho="Cadastro"
          label="Cadastro"
          navigation={navigation}
        />

        <Button
          style={styles.btn}
          title="Enviar localização"
          onPress={() => handleLocationPress(address)}
        />
     
      </Container>
    </KeyboardAvoidingView>

  );
};

export default HomeScreen;

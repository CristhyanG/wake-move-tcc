import React, {useState} from 'react';
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
import { Alert, View } from "react-native";
import { NewModal } from "@/Components/Atomo/modal";
import { useCurrentAddress, useFinalAddress } from "@/API/Context/AddressContext";

interface InitialLocationProps {
  navigation: StackNavigationProp<any>;
}

const InitialLocationScreen: React.FC<InitialLocationProps> = ({ navigation }) => {

  const [modalVisible, setModalVisible] = useState( false )
  const {currentAddress} = useCurrentAddress()
  const {finalAddress} = useFinalAddress()

  const validation = () => {
    if (currentAddress == finalAddress ) {
      Alert.alert("Endereço Final e de Partida iguais, adicione outro endereço")
      setModalVisible(false) 
    } else if (currentAddress == '') {
      Alert.alert("Endereço não pode estar vazio, adicione um endereço") 
      setModalVisible(false)
    } else {
      handleModal()
    }
  }
  
  const handleModal = () => { 
    setModalVisible(true); 
  } 
  const handleModalClose = () => { 
    setModalVisible(false); 
  } 
  const handleModalConfirm = () => { 
    setModalVisible(false);
    navigation.navigate("Navigation");
  }

  const { user } = useAuth()

  return (
    <Container>

      <NewModal
        visible={modalVisible}
        title={`Deseja confirmar seu endereço para: ${currentAddress || "endereço Desconhecido"} `}
        navigation={navigation}
        wayBack={handleModalClose}
        wayOut={handleModalConfirm}
      />
      <CustomTitle>Ponto de Partida </CustomTitle>
      <ImgIndex />
      <SearchView
        page="Current"
        param={validation}
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

export default InitialLocationScreen;

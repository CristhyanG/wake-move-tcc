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
import { useFinalAddress } from "@/API/Context/AddressContext";
import NotificationConfig from '@/Components/molecula/NotificationConfig';
import LocationConfig from '@/Components/molecula/LocationConfig';

interface HomeScreenProps {
  navigation: StackNavigationProp<any>;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {

  const [modalVisible, setModalVisible] = useState( false );
  const {finalAddress} = useFinalAddress();

  const validation = () => {
    if (finalAddress == '') {
      Alert.alert("Endereço não pode estar vazio. Adicione um endereço") 
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
    navigation.navigate("Test"); 
  }

  const { user } = useAuth()

  return (
    <Container>
      <NotificationConfig/>
      <LocationConfig/>

      <NewModal
        visible={modalVisible}
        title={`Deseja confirmar seu endereço para: ${finalAddress || "Endereço desconhecido"}`}
        navigation={navigation}
        wayBack={handleModalClose}
        wayOut={handleModalConfirm}
      />
      <CustomTitle>Ponto de Destino</CustomTitle>
      <ImgIndex />
      <SearchView
        page="Final"
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

export default HomeScreen;

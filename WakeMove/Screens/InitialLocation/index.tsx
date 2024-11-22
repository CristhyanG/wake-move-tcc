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
import { View } from "react-native";
import { NewModal } from "@/Components/Atomo/modal";
import { useCurrentAddress } from "@/API/Context/AddressContext";

interface HomeScreenProps {
  navigation: StackNavigationProp<any>;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {

  const [modalVisible, setModalVisible] = useState( false )
  const {currentAddress} = useCurrentAddress()

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
        title={`Deseja confirmar seu endereço para: ${currentAddress}`}
        navigation={navigation}
        wayBack={handleModalClose}
        wayOut={handleModalConfirm}
      />
      <CustomTitle>Ponto de Partida </CustomTitle>
      <ImgIndex />
      <SearchView
        page="Current"
        param={handleModal}
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

import React, { useState } from "react";
import { CustomTitle } from '@/Components/Atomo/Title';
import { StackNavigationProp } from "@react-navigation/stack";
import { Container } from '@/Components/Atomo/container/index';
import { SearchView } from "@/Components/molecula/SeacrhView/index"
import 'react-native-get-random-values';
import { Bus } from "@/Components/Atomo/imgLocation";
import { NewModal } from "@/Components/Atomo/modal";
import { useFinalAddress } from "@/API/Context/AddressContext";


interface InitialLocationprops {
  navigation: StackNavigationProp<any>;
}

const InitialLocationScreen: React.FC<InitialLocationprops> = ({ navigation }) => {

  const [modalVisible, setModalVisible] = useState(true)
  const {finalAddress} = useFinalAddress()

  const handleModal = () => {
    setModalVisible(false)
  }

  return (
    <Container>
      <NewModal
        visible={modalVisible}
        children={`Deseja confirmar seu endereço para: ${finalAddress}`}
        navigation={navigation}
        caminho="Home"
        onConfirm={handleModal}
      />
      <CustomTitle>Para onde vamos ?</CustomTitle>
      <Bus />

      <SearchView
        page="Current"
        caminho="Navigation"
        navigation={navigation}
      />

    </Container>
  );
};

export default InitialLocationScreen;

import React, {useState} from "react";
import { CustonTitle } from '../Components/Title'
import { CustonText } from '../Components/Text'
import { View, Button } from "react-native";
import { ImgIndex } from '../Components/imgIndex'
import { Input } from '../Components/TextInput'
import { StackNavigationProp } from "@react-navigation/stack";

interface HomeScreenProps{
  navigation: StackNavigationProp<any>
}

export default function HomeScreen({navigation}: HomeScreenProps) {

  const [ponto, setPonto] = useState('');

  return (
    <View>
      <CustonTitle>Wake Move</CustonTitle>
      <CustonText>Mova-se para onde quiser </CustonText>
      <ImgIndex></ImgIndex>
      <Input
        placeholder="Para onde vamos"
        value={ponto}
        onChangeText={setPonto}
      />
    </View>
  )
}
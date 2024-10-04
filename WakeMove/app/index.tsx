import React from 'react';
import { Text, View, SafeAreaView, Image, TextInput, KeyboardAvoidingView, ScrollView, Platform, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import styles from './css/styleIndex';
import NavButton from '@/Components/navButton';


export default function Index() {
  const imgLocation = require('../src/Img/iconIndex.png');
  const lupa = require('../src/Img/lupa.png')

  return (
    <SafeAreaView style={styles.contentContainer}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.container}>
            
            <Text style={styles.title}>Para onde vamos ?</Text>
            
            <Image style={styles.img} source={imgLocation} />
            
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder=' Search'
              />
              <Image style={styles.icon} source={lupa} />
            </View>

            <View>
              <NavButton 
                caminho={"./teste.tsx"}  
                label={"Cadastro"} 
                onPress={()=> {console.log("Botão apertado")}}
              />
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}


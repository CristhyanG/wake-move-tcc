import React from 'react';
import { Text, View, StyleSheet, SafeAreaView, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";

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
            <Text style={styles.title}>Where are you going?</Text>
            <Image style={styles.img} source={imgLocation} />
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder=' Search'
              />
              <Image style={styles.icon} source={lupa} />
            </View>
            <TouchableOpacity style={styles.btnOne}>
              <Text style={styles.text}>Btn 1</Text>
            </TouchableOpacity>
            <View style={styles.btnRow}>
              <TouchableOpacity style={styles.btn}>
                <Text style={styles.text}>Btn 2</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn}>
                <Text style={styles.text}>Btn 3</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: "#000"
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    alignItems: 'center'
  },
  title: {
    fontSize: 30,
    color: "#fff",
    marginBottom: 20,
  },
  img: {
    width: 300,
    height: 300,
    marginBottom: 20
  },
  inputContainer:{
    position: 'relative',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 20,
    width: 300,
    color: "#000",
    marginBottom: 20
  },
  icon: {
    position: 'absolute',
    left: 251,
    top: '2%',
    padding: 23,
    borderRadius: 20,
    width: 24,
    height: 24,
  },
  btnOne: {
    height: 80,
    width: 100,
    borderRadius: 20,
    backgroundColor: "#3e3e3e",
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  btnRow: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '60%'
  },
  btn: {
    height: 80,
    width: 100,
    backgroundColor: "#3e3e3e",
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 40
  },
  text: {
    color: "#fff",
    textAlign: 'center',
  },
});

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    contentContainer: {
      flex: 1,
      backgroundColor: "#a4a4a4"
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
      marginBottom: 80,
    },
    img: {
      width: 250,
      height: 250,
      marginBottom: 60
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
      backgroundColor: "#ededed",
      position: 'absolute',
      left: 254,
      top: '2%',
      padding: 23,
      borderRadius: 19,
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
    btnCadastro: {
      height: 50,
      width: 85,
      backgroundColor: "#ededed",
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

export default styles
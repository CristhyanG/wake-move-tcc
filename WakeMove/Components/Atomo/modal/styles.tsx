import { StyleSheet, Dimensions } from "react-native";

const {height} = Dimensions.get('window')

export const styles = StyleSheet.create({
  custonModal: {
    marginTop: height *  0.35,
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%', // Largura do modal
    maxWidth: 400, // Largura máxima para telas grandes
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semi-transparente
  },
  contentModal: {
    flexDirection: 'row',
    padding: 10,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
  },
  btn: {
    backgroundColor: "#ccc",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
    padding: 15,
    margin: 10,
    alignItems: 'center',
  },
});

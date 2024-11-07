import { StyleSheet,  } from "react-native";

export const styles = StyleSheet.create({
    custonModal:{
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 45,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      btn:{
        backgroundColor: "#ff0",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#fff",
        padding: 10,
        marginTop: 10,
        alignItems: 'center'
      }
})
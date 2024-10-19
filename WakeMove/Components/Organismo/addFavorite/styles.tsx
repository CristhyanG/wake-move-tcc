import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    openModal:{
        borderRadius: 20,
        backgroundColor: '#ccc',
        padding: 15,
        width: 300,
        alignItems: 'center'
    },
    contentContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalContainer:{
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
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
    modalBtn:{
        margin: 10,
        backgroundColor: "#2196F3",
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    }, 
    titleBtn:{
        margin: 5,
        fontSize: 16,
        fontWeight: 'bold'
    }
})
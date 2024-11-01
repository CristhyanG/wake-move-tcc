import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    contentContainer:{
        paddingTop: 20,
    },
    openModal:{
        alignItems: 'center',
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
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
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
        width: '80%',
        alignItems: 'center',
    }, 
    titleBtn:{
        margin: 5,
        fontSize: 16,
        fontWeight: 'bold'
    }
})
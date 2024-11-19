import { Query } from "@/API/Google/Places/Query";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    contentContainer:{
        paddingTop: 20,
    },
    openModal:{
        alignItems: 'center',
        backgroundColor: '#ccc',
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
    },
    modalContainer:{
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 55,
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
        backgroundColor: '#ccc',
        padding: 10,
        borderRadius: 10,
        marginTop: 150,
        width: '80%',
        alignItems: 'center',
    }, 
    titleBtn:{
        justifyContent: 'flex-start',
        margin: 5,
        fontSize: 16,
        fontWeight: 'bold'
    },
    query:{
        zIndex: 1000,
        position: 'absolute',
        top: 60,
        alignContent: 'center',
        borderWidth: 1,
        minHeight: 50,
        minWidth: 300,
        borderColor: "#ccc",
        marginTop: 30,
    }
})
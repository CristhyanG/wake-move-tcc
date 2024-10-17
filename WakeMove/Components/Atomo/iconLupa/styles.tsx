import { StyleSheet, Dimensions } from "react-native";

const { width, height} = Dimensions.get('window')

export const styles = StyleSheet.create({
    searchButton:{
        marginLeft: 10,
        backgroundColor: '#333',
        borderRadius: 15,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText:{
        color: '#fff',
    }
})

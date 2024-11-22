import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get('window')
export const styles = StyleSheet.create({
    title:{
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    containerTitle:{
        justifyContent: 'center',
        alignItems: 'center',
    }
})
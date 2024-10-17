import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get('window')
export const styles = StyleSheet.create({
    title:{
        fontSize: 35,
        fontWeight: 'bold',
        marginBottom: width *0.05,
        color: '#333',
    }
})
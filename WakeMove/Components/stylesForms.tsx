import { StyleSheet, Dimensions } from "react-native";
const {width} = Dimensions.get('window')
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightblue', // Temporário para ver se o estilo é aplicado
        justifyContent: 'center',
        alignItems: 'center',
    },
    title:{
        fontSize: 10
    },
    input: {
        padding: 10,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        backgroundColor: 'white', // Temporário para ver se o estilo é aplicado
        borderRadius: 10,
        marginTop: width * 0.01,
        marginBottom: width * 0.04
    },
});

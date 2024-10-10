import { StyleSheet, Dimensions } from "react-native";

const {width, height} = Dimensions.get('window')

export const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
    },
    inputError: {
        borderColor: '#00f',
    },
    errorText: {
        color: '#00f',
        marginTop: 5,
    }
})
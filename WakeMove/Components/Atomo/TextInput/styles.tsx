import { StyleSheet, Dimensions } from "react-native";

const {width, height} = Dimensions.get('window')

export const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        marginTop: 10
    },
    textInput: {
        height: 45,
        width: 325,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 20,
    },
    inputError: {
        borderColor: '#00f',
    },
    errorText: {
        color: '#00f',
        marginTop: 5,
    }
})
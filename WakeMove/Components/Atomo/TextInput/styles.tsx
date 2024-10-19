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
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        minWidth: 200
    },
    inputError: {
        borderColor: '#00f',
    },
    errorText: {
        color: '#00f',
        marginTop: 5,
    }
})
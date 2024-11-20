import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window')

export const btnStyles = StyleSheet.create({
    btnContainer: {
        borderRadius: 10,
        marginTop: 10,
    },
    btn:{
        backgroundColor: '#333',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    title:{
        color: '#fff',
        fontSize: 14,
    }
});

import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window')

export const btnStyles = StyleSheet.create({
    btnContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: 30,
    },
    btn:{
        backgroundColor: '#8F8F8F',
        padding: 10,
        borderRadius: 5,
    },
    title:{
        color: "#fff",
        fontSize: 16,
    }
});

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
        backgroundColor: '#333',
        padding: 15,
        borderRadius: 25,
        alignItems: 'center',
    },
    title:{
        color: '#fff',
        fontSize: 18,
    }
});

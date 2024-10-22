import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window')

export const styles = StyleSheet.create({
    btnContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    btn:{
        backgroundColor: '#333',
        padding: 15,
        borderRadius: 25,
        marginBottom: 30,
        width: '80%',
        alignItems: 'center',
    },
    title:{
        color: '#fff',
        fontSize: 18,
    }
});

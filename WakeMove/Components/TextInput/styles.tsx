import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const {width, height} = Dimensions.get('window')

export const styles = StyleSheet.create({
    TextInput: {
        height: height *  0.05,
        width: width * 0.5,
        textAlign: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 15,
        paddingHorizontal: 10,
        fontSize: 16,
        backgroundColor: '#fff',
    },
})
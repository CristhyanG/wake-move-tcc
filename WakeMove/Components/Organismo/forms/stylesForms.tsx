import { StyleSheet, Dimensions } from "react-native";
const {width} = Dimensions.get('window')
export const styles = StyleSheet.create({
    title:{
        fontSize: 10,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginBottom: 15,
    },
    viewContent:{
        marginTop: 20
    }
});

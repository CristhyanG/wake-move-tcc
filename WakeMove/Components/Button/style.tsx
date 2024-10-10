import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window')

export const styles = StyleSheet.create({
    btnContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: 30,
    },
});

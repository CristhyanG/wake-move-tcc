import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get('window')
export const styles = StyleSheet.create({
    title:{
        fontSize: 30,
        marginBottom: width * 0.05
    }
})
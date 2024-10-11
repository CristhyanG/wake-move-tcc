import { StyleSheet, Dimensions } from "react-native";

const { width, height} = Dimensions.get('window')

export const styles = StyleSheet.create({
    content:{
        position: 'relative',
        bottom: "6.5%",
        left: "20%"
    },
    lupa:{
        width: width * 0.1,
        height: height * 0.05,
    }
})
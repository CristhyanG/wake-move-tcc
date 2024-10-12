import { Dimensions, StyleSheet } from "react-native";

const {width, height} = Dimensions.get('window')

export const styles = StyleSheet.create({
    imgCad:{
        width: width * 0.4,
        height: height * 0.25,
        marginBottom: height * 0.1
    }
})
import { StyleSheet, Dimensions } from "react-native";

const {width, height} = Dimensions.get('window') 

export const styles = StyleSheet.create({
    img:{
        width: width * 0.62, 
        height: height * 0.4, 
        marginBottom: height * 0.05,
    }
})
import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const {width, height} = Dimensions.get('window') 

export const styles = StyleSheet.create({
    img:{
        width: width * 0.1, 
        height: height * 0.2, 
    }
})
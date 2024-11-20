import React from "react";
import { View, Text } from "react-native";
import {styles} from "./style"

export const Warning = () =>{
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Para favoritar sua rota, cadastre-se</Text>
        </View>
    )
}
import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { styles } from './styles'

interface LupaPros {
    navigation: any
    caminho: string
}

export const Lupa = ({navigation, caminho}: LupaPros) => {
    return (
        <TouchableOpacity 
            style={styles.searchButton}
            onPress={()=> navigation.navigate(caminho)}
        >
            <Text style={styles.buttonText}>🔍</Text>
        </TouchableOpacity>
    )
}
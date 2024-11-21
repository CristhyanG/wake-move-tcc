import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { styles } from './styles'

interface LupaPros {
    param: () => void;
}

export const Lupa = ({param}: LupaPros) => {
    return (
        <TouchableOpacity 
            style={styles.searchButton}
            onPress={param}
        >
            <Text style={styles.buttonText}>🔍</Text>
        </TouchableOpacity>
    )
}
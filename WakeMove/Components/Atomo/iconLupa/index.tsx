import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { styles } from './styles'


export const Lupa = () => {
    return (
        <TouchableOpacity style={styles.searchButton}>
            <Text style={styles.buttonText}>🔍</Text>
        </TouchableOpacity>
    )
}
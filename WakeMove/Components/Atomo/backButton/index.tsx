import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { styles } from "./styles"

interface BackButtonProps {
    caminho: string
    navigation: any
}

export const BackButton = ({ caminho, navigation }: BackButtonProps) => {
    return(
        <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate(caminho)}
    >
        <Text style={styles.title}>Voltar</Text>
    </TouchableOpacity>
    )
}
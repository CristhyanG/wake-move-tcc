import React from "react";
import { Input } from "@/Components/Atomo/TextInput";
import { Lupa } from "@/Components/Atomo/iconLupa";
import { View } from "react-native";
import { styles } from "./styles"

interface SeacrchProps {
    value: any
    onChangeText: (string: any) => void
}

export const SeacrhView = ({ value, onChangeText }: SeacrchProps) => {
    return (
        <View style={styles.searchView}>
            <Input
                placeholder="Para onde vamos?"
                value={value}
                onChangeText={onChangeText}
            /><Lupa/>
        </View>
    )
}
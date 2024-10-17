import React from "react";
import { TextInput, View, Text } from "react-native";
import {styles} from "./styles"
interface Props {
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    onBlur?: () => void;
    error?: string;
    label?: string;
}

export const Input: React.FC<Props> = ({ placeholder, value, onChangeText, onBlur, error, label }) => {
    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput 
                style={[styles.textInput, error ? styles.inputError : null]}
                placeholder={placeholder}
                onChangeText={onChangeText}
                value={value}
                onBlur={onBlur}
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
}

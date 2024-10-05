import React from "react";
import { TextInput } from "react-native";
// import { ReactNode } from "react";
import {styles} from './styles';

interface Props {
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
}

export const Input: React.FC<Props> = ({placeholder, value, onChangeText}) =>{
    return(
        <TextInput 
            style={styles.TextInput}
            placeholder={placeholder}
            onChangeText={onChangeText}
            value={value}
        />
    )
}
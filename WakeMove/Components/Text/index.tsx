import React from "react";
import { ReactNode } from "react";
import { Text } from "react-native";
import {styles} from './styles'

interface Props{
    children: ReactNode
}

export const CustomText: React.FC<Props> = ({children})=>{
    return(
        <Text style={styles.text}>{children}</Text>
    )
}
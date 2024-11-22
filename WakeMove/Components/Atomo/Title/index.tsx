import React from "react";
import { ReactNode } from "react";
import { Text, View } from "react-native";
import {styles} from './styles'

interface Props{
    children: ReactNode
}

export const CustomTitle: React.FC<Props> = ( {children} ) => {
    return(
        <View style={styles.containerTitle}> 
            <Text style={styles.title}>{children}</Text>
        </View>
        
    )
}
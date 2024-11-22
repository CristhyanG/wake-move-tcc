import React from 'react'; 
import { View } from "react-native";
import { ReactNode } from "react";
import { styles } from "./styles"

interface Props {
    children: ReactNode
}

export const Content: React.FC<Props> = ({children}) => {
    return(
        <View style = {styles.content}>
            {children}
        </View>
    )
}
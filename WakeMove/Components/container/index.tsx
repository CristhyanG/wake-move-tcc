import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { styles } from './styles' 
import { ReactNode } from 'react';

interface Props{
    children: ReactNode
}
export const Container: React.FC<Props> = ({ children }) => {
    return(
        <SafeAreaView style = {styles.container}>
            {children}
        </SafeAreaView>
    )
}

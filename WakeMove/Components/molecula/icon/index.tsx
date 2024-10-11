import React from "react";
import { Image, View } from "react-native";
import { styles } from './styles'

const iconImg = require('@/src/Img/lupa.png')

export const Lupa = () => {
    return (
        <View style = {styles.content}>
            <Image
                source={iconImg}
                style={styles.lupa}
            />
        </View>
    )
}
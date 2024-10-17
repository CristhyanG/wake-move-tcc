import React from "react";
import { Image } from "react-native";
import {styles} from './styles';

const imageIndex = require('@/src/Img/iconIndex.png')

export const ImgIndex = () => {
    return(
        <Image style={styles.img} source={imageIndex}/>
    )
}
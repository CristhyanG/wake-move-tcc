import React from "react";
import { Image } from "react-native";
import { styles } from "./styles";

export const Bus = () => {

    const bus = require('../../../src/Img/bus.png')

    return(
        <Image style={styles.img} source={bus}/>
    )
}
import React from "react";
import { Image } from "react-native";
import { styles } from "./styles"

export const ImgCad = ()=>{

    const imgCadastro = require("@/src/Img/iconAvatar.png")

    return(
        <Image
            style = {styles.imgCad}
            source = {imgCadastro}
        />
    )
}

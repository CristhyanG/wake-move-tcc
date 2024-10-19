import React from "react";
import NavButton from "../Atomo/navButton";
import { SafeAreaView } from "react-native";
import {styles} from "./styles"

interface FavoriteButtonProps{
    navigation: any
}

export const FavoriteButton = ({navigation}:FavoriteButtonProps) =>{
    return(
        <SafeAreaView>
            <NavButton
                style={styles.btn}
                caminho="Location"
                navigation={navigation}
                label="Teste"
            />
        </SafeAreaView>
    )
}
import React from "react";
import AddFavorite from "@/Components/Organismo/addFavorite";
import { CustomTitle } from "@/Components/Atomo/Title";
import { View } from "react-native";
import { Container } from "@/Components/container";

export const FavoriteScreen = () =>{
    return(
        <Container>
            <CustomTitle> Favoritos </CustomTitle>
            <AddFavorite
                visible={true}
            ></AddFavorite>
        </Container>
    )
}
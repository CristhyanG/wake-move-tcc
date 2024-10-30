import React, { useState } from "react";
import AddFavorite from "@/Components/Organismo/addFavorite";
import { CustomTitle } from "@/Components/Atomo/Title";
import { View } from "react-native";
import { Container } from "@/Components/container";
import { AddButton } from "@/Components/Atomo/addButton";

export const FavoriteScreen = () => {

    return (
        <Container>
            <CustomTitle> Favoritos </CustomTitle>
            <AddFavorite/>
        </Container>
    );
}

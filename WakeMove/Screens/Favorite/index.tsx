import React, { useState } from "react";
import AddFavorite from "@/Components/Organismo/ManageFavorites";
import { CustomTitle } from "@/Components/Atomo/Title";
import { Container } from "@/Components/Atomo/container";

export const FavoriteScreen = () => {

    return (
        <Container>
            <CustomTitle> Favoritos </CustomTitle>
            <AddFavorite/>
        </Container>
    );
}

import React, { useState } from "react";
import AddFavorite from "@/Components/Organismo/addFavorite";
import { CustomTitle } from "@/Components/Atomo/Title";
import { View } from "react-native";
import { Container } from "@/Components/container";
import { AddButton } from "@/Components/Atomo/addButton";

export const FavoriteScreen = () =>{
    
    const [dados, setDados] = useState<{[key:string]: string}[]>([]);
    const handleAdd = (data:{[key:string]: string}) =>{
        setDados((prevDados) => [...prevDados, data]);
    };

    return(
        <Container>
            <CustomTitle> Favoritos </CustomTitle>
            <AddFavorite
                visible={true}
                onAdd={dados.map((data, index) =>(
                    <AddButton key={index} data={data}/>
                ))}
            ></AddFavorite>
        </Container>
    )
}
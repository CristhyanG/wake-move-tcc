import React, { useState, useEffect, createContext, Children, useContext } from "react";
import MapView, { Marker } from "react-native-maps";
import { View, Text, StyleSheet } from "react-native";
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, LocationObject,} from "expo-location";
import { ReactNode } from "react";

interface Props {
    children: ReactNode
}

    // LocationContext é utilizado para gerenciar o estado de localização
    //  createContext utilizado para criar a constante e será utilizado para compartilhar a localização
const LocationContext = createContext<LocationObject | null>(null);

export const LocationProvider: React.FC<Props> = ({children}) => {
    const [location, setLocation] = useState<LocationObject | null>(null);

    async function permissaoUsuario() {
        const { granted } = await requestForegroundPermissionsAsync();

        if (granted) {
            try {
                const currentPosition = await getCurrentPositionAsync();
                setLocation(currentPosition);
                console.log("Localização atual: ", currentPosition);
            } catch (error) {
                console.error("Erro ao obter localização: ", error);
            }
        } else {
            console.log("Não foi possível acessar a localização");
        }
    }

    useEffect(() => {
        permissaoUsuario();
    }, []); // Adicionado array vazio para evitar chamadas infinitas

    return(
        // "Provider" deixa "LocationContext " disponivel para qualque componente
        <LocationContext.Provider value={location}>
            {children}
        </LocationContext.Provider>
    );
};

export const useLocation = () =>{
    return(
        useContext(LocationContext)
    )
}
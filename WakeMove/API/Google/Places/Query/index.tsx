import React from "react";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useFinalAddress, useCurrentAddress } from "@/API/Context/AddressContext";

interface QueryProps {
    type: string;
    page: string;
}

export const Query: React.FC<QueryProps> = ({ type, page }) => {
    const { setFinalAddress } = useFinalAddress(); 
    const { setCurrentAddress } = useCurrentAddress();

    const handleLocationPress = (address: string) => {
        // Registro do endereço selecionado no console
        console.log("Endereço Selecionado:", address);
    };

    const queryConfig = {
        key: 'AIzaSyBVrTs2yDlY96RSXS87DbMSO4QYbHP-sXY',
        language: 'pt-BR',
        components: 'country:br'
    };

    let types = '';
    if (type === "endereco") {
       types = 'address';
    } else if (type === "estabelecimentos") {
        types = 'establishment';
    }

    const renderGooglePlacesAutocomplete = (onPress: (address: string) => void): React.ReactNode => {
        return (
            <GooglePlacesAutocomplete
                placeholder="Digite um endereço"
                onPress={(data, details = null) => {
                    const fullAddress = data.description;
                    onPress(fullAddress);
                    handleLocationPress(fullAddress);
                }}
                query={{ ...queryConfig, types }}
                fetchDetails={true}
            /> 
        );
    };

    if (page === "Final") {
        return renderGooglePlacesAutocomplete(setFinalAddress);
    } else if (page === "Current") {
        return renderGooglePlacesAutocomplete(setCurrentAddress);
    } else {
        return null;
    }
};

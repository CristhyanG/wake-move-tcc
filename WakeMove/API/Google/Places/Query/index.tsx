import React from "react";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Alert } from "react-native";
import { useFinalAddress, useCurrentAddress } from "@/API/Context/AddressContext";
import { useGeocode } from '@/API/Google/Geocoding/Context';

interface QueryProps {
    type: string;
    page: string;
}

export const Query: React.FC<QueryProps> = ({ type, page }) => {
    const { setFinalAddress } = useFinalAddress(); 
    const { setCurrentAddress } = useCurrentAddress();
    const { geocodeAddress } = useGeocode();

    const handleLocationPress = async (address: string, type: 'origin' | 'destination') => {
        try {
            const result = await geocodeAddress(address, type);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            Alert.alert("Geocoding failed", errorMessage || "Unknown error");
            console.error("Geocoding failed: ", errorMessage);
        }
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

    const renderGooglePlacesAutocomplete = (onPress: (address: string) => void, type: 'origin' | 'destination'): React.ReactNode => {
        return (
            <GooglePlacesAutocomplete
                placeholder="Digite um endereço"
                onPress={(data, details = null) => {
                    const fullAddress = data.description;
                    onPress(fullAddress);
                    handleLocationPress(fullAddress, type);
                }}
                query={{ ...queryConfig, types }}
                fetchDetails={true}
            /> 
        );
    };

    if (page === "Final") {
        return renderGooglePlacesAutocomplete(setFinalAddress, 'destination');
    } else if (page === "Current") {
        return renderGooglePlacesAutocomplete(setCurrentAddress, 'origin');
    } else {
        return null;
    }
};
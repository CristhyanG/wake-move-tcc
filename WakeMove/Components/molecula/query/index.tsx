import React from "react";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Alert } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useAddress } from "@/Components/AddressContext";
import { useGeocode } from '@/Components/GeocodeProvider';

interface QueryProps {
    navigation: StackNavigationProp<any>;
}

export const Query: React.FC<QueryProps> = ({navigation}) => {

    const { address, setAddress } = useAddress();

    const { geocodeAddress } = useGeocode();

    const handleLocationPress = async (address: string) => {
        try {
            const result = await geocodeAddress(address);
            if (result) {
            navigation.navigate('Location');
            } else {
            Alert.alert("Geocoding failed", "Unknown error");
            console.error("Geocoding failed");
            }
        } catch (error) {
            Alert.alert("Geocoding failed", error.message || "Unknown error");
            console.error("Geocoding failed: ", error.message);
        }
    };

    return (
        <GooglePlacesAutocomplete
            placeholder="Para onde vamos?"
            onPress={(data, details = null) => {
                const fullAddress = data.description;
                setAddress(fullAddress);
                handleLocationPress(fullAddress);
            }}
            query={{
                key: 'AIzaSyBVrTs2yDlY96RSXS87DbMSO4QYbHP-sXY',
                language: 'pt-BR',
                types: 'address, establishment',
                components: 'country:br'
            }}
            fetchDetails={true}
        />
    )
}

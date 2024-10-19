import React from "react";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Alert } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useAddress } from "@/Components/AddressContext";
import { useGeocode } from '@/Components/GeocodeProvider';

interface QueryProps {
    navigation: StackNavigationProp<any>;
    query:{
        key: string,
        language: string
        types: string
        components: string
    }
}

export const Query = ({navigation, query}:QueryProps) => {
    const { address, setAddress } = useAddress();
    const { geocodeAddress } = useGeocode();

    const handleLocationPress = async (address: string) => {
        const result = await geocodeAddress(address);
        if (result.success) {
          navigation.navigate('Location');
        } else {
          Alert.alert("Geocoding failed", result.message || "Unknown error");
          console.error("Geocoding failed: ", result.message);
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
            query={query}
            fetchDetails={true}
        />
    )
}

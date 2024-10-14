import React from 'react';
import { LocationProvider } from '@/Components/locationProvider';
import { MapDisplay } from '@/Components/mapDisplay';
import {Text, View} from 'react-native';
import {useAddress} from '@/Components/AddressContext'

export const LocationScreen = () => {

    const {address} = useAddress();
    
    return (
        <LocationProvider>
            {/* <MapDisplay /> */}
            <View>
                <Text> Endereço: {address} </Text>
            </View>
        </LocationProvider>
    );
}

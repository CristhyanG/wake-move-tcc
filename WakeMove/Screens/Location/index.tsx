import React from 'react';
import { LocationProvider } from '@/Components/Atomo/locationProvider';
import { MapDisplay } from '@/Components/molecula/mapDisplay';
import {Text, View} from 'react-native';
import {useAddress} from '@/Components/AddressContext'

export const LocationScreen = () => {

    const {address} = useAddress();
    
    return (
        <LocationProvider>
            <View>
                <Text> Endereço: {address} </Text>
            </View>
        </LocationProvider>
    );
}

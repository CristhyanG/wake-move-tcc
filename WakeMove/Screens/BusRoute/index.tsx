// Exemplo de uso no componente
import React from 'react';
import { View, Text } from 'react-native';
import BusRouteDisplay from '@/API/Google/Transit/DisplayBus';
import { useFinalAddress } from '@/API/Context/AddressContext';
import { useCurrentAddress } from '@/API/Context/AddressContext';

const MyComponent = () => {
    const point = useCurrentAddress().currentAddress;
    const destination = useFinalAddress().finalAddress;

    return (
        <View>
            <Text>Rota de ônibus entre {point} e {destination}</Text>
            <BusRouteDisplay point={point} destination={destination} />
        </View>
    );
};

export default MyComponent;

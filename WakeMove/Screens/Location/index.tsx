import React from 'react';
import { LocationProvider } from '@/Components/locationProvider';
import { MapDisplay } from '@/Components/mapDisplay';

export const LocationScreen = () => {
    return (
        <LocationProvider>
            <MapDisplay />
        </LocationProvider>
    );
}

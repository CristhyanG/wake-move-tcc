import React, { useState, useEffect } from 'react';
import GetLocationComponent from '@/Components/molecula/Getlocation';

const key = "AIzaSyBVrTs2yDlY96RSXS87DbMSO4QYbHP-sXY";

interface Location {
  latitude: number;
  longitude: number;
}

export const reverseGeocodeLocation = async (location: Location): Promise<string> => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${key}`
    );
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      return data.results[0].formatted_address;
    } else {
      return "Endereço não encontrado";
    }
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : "Erro desconhecido";
    return `Erro: ${errorMessage}`;
  }
};

import React, { useEffect } from "react";
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from "expo-location";

interface Props {
  onLocationUpdate: (latitude: number, longitude: number) => void;
}

const GetLocationComponent: React.FC<Props> = ({ onLocationUpdate }) => {
  useEffect(() => {
    async function fetchLocation() {
      const { granted } = await requestForegroundPermissionsAsync();

      if (granted) {
        try {
          const currentPosition = await getCurrentPositionAsync();
          onLocationUpdate(
            currentPosition.coords.latitude,
            currentPosition.coords.longitude
          );
        } catch (error) {
          console.error("Erro ao obter localização: ", error);
        }
      } else {
        console.log("Não foi possível acessar a localização");
      }
    }

    fetchLocation();
  }, [onLocationUpdate]);

  return null;
};

export default GetLocationComponent;

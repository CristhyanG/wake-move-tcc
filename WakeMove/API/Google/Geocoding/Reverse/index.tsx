// import React, { useState } from 'react';
// import { View, ActivityIndicator, Alert } from "react-native";
// import { useCurrentAddress } from "@/API/Context/AddressContext";
// import { useAuth } from '@/data/userAuth/userCad';
// import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from "expo-location";

// const YourComponent = () => {
//   const [loading, setLoading] = useState(false);
//   const { setCurrentAddress, currentAddress } = useCurrentAddress();
//   const { user } = useAuth();

//   const reverseGeocodeLocation = async (latitude: number, longitude: number): Promise<string | null> => {
//     const GOOGLE_MAPS_API_KEY = "AIzaSyBVrTs2yDlY96RSXS87DbMSO4QYbHP-sXY";
//     try {
//         const response = await fetch(
//             `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`
//         );
//         const data = await response.json();
//         if (data.results && data.results.length > 0) {
//             return data.results[0].formatted_address;
//         }
//         return null;
//     } catch (error) {
//         console.error("Erro na geocodificação reversa:", error);
//         return null;
//     }
//   };

//   const handleUseLocation = async () => {
//     try {
//         const { granted } = await requestForegroundPermissionsAsync();
//         if (!granted) {
//             Alert.alert("Erro", "Permissão de localização negada.");
//             return;
//         }

//         const currentPosition = await getCurrentPositionAsync();
//         const { latitude, longitude } = currentPosition.coords;

//         console.log("Latitude:", latitude, "Longitude:", longitude);

//         const address = await reverseGeocodeLocation(latitude, longitude);
//         if (address) {
//             console.log("Novo endereço:", address);
//             setCurrentAddress(address);
//             Alert.alert("Localização Atualizada", `Endereço: ${address}`);
//         } else {
//             Alert.alert("Erro", "Não foi possível obter o endereço.");
//         }
//     } catch (error) {
//         console.error("Erro ao obter localização:", error);
//         Alert.alert("Erro", "Não foi possível obter a localização.");
//     }
//   };

//   return (
//     <View>
//       {loading && <ActivityIndicator />}
//       {/* Seu componente continua aqui */}
//     </View>
//   );
// };

// export default YourComponent;

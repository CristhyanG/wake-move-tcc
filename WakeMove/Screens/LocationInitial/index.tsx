
import React from "react";
import { View, Text } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import { useGeocode } from "@/Api/Google/Geocoding/Context";
import BusStops from "@/Api/Google/Places/BusStops"
        
const LocationInitialScreen: React.FC = () => {
  
  const { locations, locationsHistory } = useGeocode();

  return (
    <View style={{ flex: 1 }}>
      {locations ? (
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: locations.latitude,
            longitude: locations.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {locationsHistory.map((location, index) => (
            <Marker
              key={index}
              coordinate={{ 
                latitude: location.latitude, 
                longitude: location.longitude
              }}
              title={`Result ${index + 1}`}
            />
          ))}
          
          <BusStops 
          location={locations}
          />
        </MapView>
      ) : (
        <Text>Carregando localização...</Text>
      )}
    </View>
  );
};

export default LocationInitialScreen;

// import React from "react";
// import { View, Text, Button } from "react-native";
// import { useGeocode } from "@/Api/Google/Geocoding/Provider";
// import { useNavigation } from "@react-navigation/native";

// const LocationScreen: React.FC = () => {
//   const { locations } = useGeocode();
//   const navigation = useNavigation();

//   const handleNewAddress = () => {
//     navigation.navigate('Initial');
//   };

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       {locations.length > 0 ? (
//         <>
//           <Text>Endereço coletado com sucesso!</Text>
//           <Button
//             title="Pegar outro endereço"
//             onPress={handleNewAddress}
//           />
//         </>
//       ) : (
//         <>
//           <Text>Carregando localização...</Text>
//           <Button
//             title="Pegar outro endereço"
//             onPress={handleNewAddress}
//           />
//         </>
//       )}
//     </View>
//   );
// };

// export default LocationScreen;

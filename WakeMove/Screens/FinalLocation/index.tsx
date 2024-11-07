
// import React from "react";
// import { View, Text } from "react-native";
// import MapView, { Marker } from 'react-native-maps';
// import { useGeocode } from "@/API/Google/Geocoding/Context";
// import BusStops from "@/API/Google/Places/BusStops"
        
// const FinalLocationScreen: React.FC = () => {
  
//   const { locations, locationsHistory } = useGeocode();

//   return (
//     <View style={{ flex: 1 }}>
//       {locations ? (
//         <MapView
//           style={{ flex: 1 }}
//           initialRegion={{
//             latitude: locations.latitude,
//             longitude: locations.longitude,
//             latitudeDelta: 0.0922,
//             longitudeDelta: 0.0421,
//           }}
//         >
//           {locationsHistory.map((location, index) => (
//             <Marker
//               key={index}
//               coordinate={{ 
//                 latitude: location.latitude, 
//                 longitude: location.longitude
//               }}
//               title={`Result ${index + 1}`}
//             />
//           ))}
          
//           <BusStops 
//           location={locations}
//           />
//         </MapView>
//       ) : (
//         <Text>Carregando localização...</Text>
//       )}
//     </View>
//   );
// };

// export default FinalLocationScreen;

import React, { useState } from "react";
import { View, Text, Button } from "react-native";
 import { useGeocode } from "@/API/Google/Geocoding/Context";
import { useNavigation } from "@react-navigation/native";
import { NewModal } from "@/Components/Atomo/modal";

const LocationScreen: React.FC = () => {
  const { locations } = useGeocode();
  const navigation = useNavigation();


  const handleNewAddress = () => {
    navigation.navigate('Home');
  };


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {locations ? (
        <>
          <NewModal
            children={"Deseja confirmar o endereço para:"}
            visible={true}
          />
        </>
      ) : (
        <>
          <Text>Carregando localização...</Text>
          <Button
            title="Pegar outro endereço"
            onPress={handleNewAddress}
          />
        </>
      )}
    </View>
  );
};

export default LocationScreen;

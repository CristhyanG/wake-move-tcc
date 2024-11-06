
// import React from "react";
// import { View, Text } from "react-native";
// import MapView, { Marker } from 'react-native-maps';
// import { useGeocode } from "@/Api/Google/Geocoding/Context";
// import BusStops from "@/Api/Google/Places/BusStops"
        
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

import React from "react";
import { View, Text, Button, Alert } from "react-native";
import { useGeocode } from "@/Api/Google/Geocoding/Context"; 
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import BusStops from "@/Api/Google/Places/BusStops"

type RootStackParamList = {
  Home: undefined;
  FinalLocation: undefined;
};

const FinalLocationScreen: React.FC = () => {
  const { locations, locationsHistory } = useGeocode();  
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleNewAddress = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {locations ? (
        <>
          <Text>Endereço coletado com sucesso!</Text>
          <View 
          >
            <BusStops 
          location={locations}
          />
          
            </View>
          <Button
            title="Pegar outro endereço"
            onPress={()=>{Alert.alert('locations')}}
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

export default FinalLocationScreen;


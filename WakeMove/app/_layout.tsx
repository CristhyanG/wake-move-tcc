import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '@/Screens/Home';
import CadastroScreen from '../Screens/Cadastro';
import FinalLocationScreen from '@/Screens/FinalLocation';
import InitialLocationScreen from '@/Screens/InitialLocation';
import { StatusBar } from 'react-native';
import { AddressProvider } from '@/API/Context/AddressContext';
import { GeocodeProvider } from '@/API/Google/Geocoding/Context';
import { FavoriteScreen } from '@/Screens/Favorite';
const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <AddressProvider>
      <GeocodeProvider>
        <NavigationContainer independent={true}>
          <StatusBar barStyle="light-content" backgroundColor="#000000" />
          <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Cadastro" component={CadastroScreen} />
            <Stack.Screen name="FinalLocation" component={FinalLocationScreen} />
            <Stack.Screen name="InitialLocation" component={InitialLocationScreen} />
            <Stack.Screen name="Favorite" component={FavoriteScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </GeocodeProvider>
    </AddressProvider>
  );
}

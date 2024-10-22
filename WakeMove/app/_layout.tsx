import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screens/';
import CadastroScreen from '../Screens/Cadastro';
import LocationScreen from '@/Screens/Location';
import { StatusBar } from 'react-native';
import { AddressProvider } from '@/Components/AddressContext';
import { GeocodeProvider } from '@/Components/GeocodeProvider';
import AddFavorite from '@/Components/Organismo/addFavorite';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <AddressProvider>
      <GeocodeProvider>
        <NavigationContainer independent={true}>  
        <StatusBar barStyle="light-content" backgroundColor="#000000" />
          <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Cadastro" component={CadastroScreen} />
            <Stack.Screen name="Location" component={LocationScreen} />
            <Stack.Screen name="Favorite" component={AddFavorite} />
          </Stack.Navigator>
        </NavigationContainer>
      </GeocodeProvider>
     </AddressProvider> 
  );
}

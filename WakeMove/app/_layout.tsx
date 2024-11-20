import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '@/Screens/Home';
import CadastroScreen from '@/Screens/Cadastro';
import NavigationScreen from '@/Screens/Navigation';
import InitialLocationScreen from '@/Screens/InitialLocation';
import { StatusBar } from 'react-native';
import { AddressProvider } from '@/Api/Context/AddressContext';
import { GeocodeProvider } from '@/Api/Google/Geocoding/Context';
import { FavoriteScreen } from '@/Screens/Favorite';
import { AuthProvider } from '@/data/userAuth/userCad';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <AddressProvider>
      <GeocodeProvider>
        <AuthProvider>
        <NavigationContainer independent={true}>
          <StatusBar barStyle="light-content" backgroundColor="#000000" />
          <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Cadastro" component={CadastroScreen} />
            <Stack.Screen name="Navigation" component={NavigationScreen} />
            <Stack.Screen name="InitialLocation" component={InitialLocationScreen} />
            <Stack.Screen name="Favorite" component={FavoriteScreen} />
          </Stack.Navigator>
        </NavigationContainer>
        </AuthProvider>
      </GeocodeProvider>
    </AddressProvider>
  );
}

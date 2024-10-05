import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screens/index';
import CadastroScreen from '../Screens/Cadastro';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>  {/* Este deve ser o único NavigationContainer */}
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

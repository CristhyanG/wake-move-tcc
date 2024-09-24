import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{headerShown:false}}>
      <Stack.Screen name="index" />
      <Stack.Screen name='cadastrar'/>
      <Stack.Screen name='favoritos/index'/>
    </Stack>
  );
}

import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    //screen options remove aquele index
    <Stack screenOptions={{ 
      headerShown: false,
    }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}

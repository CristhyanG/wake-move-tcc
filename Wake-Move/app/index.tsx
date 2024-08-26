import { Text, View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { TextInput } from "react-native-gesture-handler";

export default function Index() {
  return (
    
    <View
      style={styles.bg}
    >
      <StatusBar hidden/>
      <Text>Ta nascendo.</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  bg: {
    backgroundColor: '#21130d',
    height: 100,
    flex: 1,
    
  },
});
import { View, Text, Pressable } from "react-native";
import { styles } from './styles'

interface NavButtonProps {
    caminho: string;
    label: string;
    navigation: any; 
    style: any
}

export default function NavButton({ caminho, label, navigation, style }: NavButtonProps) {
    return (
        <View style={styles.btnContainer}>
            <Pressable 
                style={style}
                onPress={() => navigation.navigate(caminho)}
            ><Text style={styles.title}>{label}</Text></Pressable>
        </View>
    );
}
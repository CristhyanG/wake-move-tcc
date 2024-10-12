import { View, Button, TouchableOpacity } from "react-native";
import { styles } from './styles'

interface NavButtonProps {
    caminho: string;
    label: string;
    navigation: any; 
    onPress: () => void;
}

export default function NavButton({ caminho, label, navigation, onPress }: NavButtonProps) {
    return (
        <View style={styles.btnContainer}>
            <Button 
                title={label}
                onPress={() => {navigation.navigate(caminho); onPress()}}
            />
        </View>
    );
}


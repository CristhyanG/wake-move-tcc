import { View, Button } from "react-native";
import { styles } from './styles'

interface NavButtonProps {
    caminho: string;
    label: string;
    navigation: any; 
}

export default function NavButton({ caminho, label, navigation }: NavButtonProps) {
    return (
        <View style={styles.btnContainer}>
            <Button 
                title={label}
                onPress={() => navigation.navigate(caminho)}
            />
        </View>
    );
}


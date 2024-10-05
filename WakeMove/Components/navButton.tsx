import { View, Button, StyleSheet } from "react-native";

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

const styles = StyleSheet.create({
    btnContainer: {
        width: 100,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2b2bff',
        borderRadius: 10,
    },
});

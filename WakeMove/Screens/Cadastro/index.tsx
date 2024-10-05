import React from 'react'; // Importando React
import { View, Text } from 'react-native';

interface CadastroScreenProps {
    navigation: any; // Você pode usar um tipo mais específico se tiver
}

const CadastroScreen: React.FC<CadastroScreenProps> = ({ navigation }) => {
    return (
        <View>
            <Text>Testando</Text>
        </View>
    );
};

export default CadastroScreen;

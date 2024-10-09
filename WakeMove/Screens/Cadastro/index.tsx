import React from 'react'; // Importando React
import { View, Text } from 'react-native';
import Formulario from '@/Components/forms'

interface CadastroScreenProps {
    navigation: any; // Você pode usar um tipo mais específico se tiver
}

const CadastroScreen: React.FC<CadastroScreenProps> = ({ navigation }) => {
    return (
        <View>
            {/* <Formulario 
                tipo="Login"
            /> */}
        </View>
    );
};

export default CadastroScreen;

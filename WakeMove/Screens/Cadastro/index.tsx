import React from 'react'; // Importando React
import { View, Text } from 'react-native';
import Formulario from '@/Components/forms';
import { StackNavigationProp } from '@react-navigation/stack';
import {Container} from '@/Components/View/index';

interface CadastroScreenProps {
    navigation: StackNavigationProp <any>; // Você pode usar um tipo mais específico se tiver
}

const CadastroScreen: React.FC<CadastroScreenProps> = ({ navigation }) => {
    return (
        <Container>
            <Formulario 
                tipo="NovoCadastro"
                navigation={navigation}
            />
        </Container>
    );
};

export default CadastroScreen;

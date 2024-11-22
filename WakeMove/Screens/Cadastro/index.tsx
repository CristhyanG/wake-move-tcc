import React from 'react'; // Importando React
import Formulario from '@/Components/Organismo/forms';
import { StackNavigationProp } from '@react-navigation/stack';
import { Container } from '@/Components/Atomo/container/index';
import { ImgCad } from '@/Components/Atomo/imgCadastro';
import { Content } from '@/Components/View/index';


interface CadastroScreenProps {
    navigation: StackNavigationProp<any>; // Você pode usar um tipo mais específico se tiver
}

const CadastroScreen: React.FC<CadastroScreenProps> = ({ navigation }) => {
    return (
        <Container>
            <ImgCad />
            <Content>
                <Formulario
                    navigation={navigation}
                />
            </Content>
        </Container>
    );
};

export default CadastroScreen;
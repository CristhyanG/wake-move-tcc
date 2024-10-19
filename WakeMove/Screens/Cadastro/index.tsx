import React from 'react'; // Importando React
import Formulario from '@/Components/Organismo/forms/forms';
import { StackNavigationProp } from '@react-navigation/stack';
import { Container } from '@/Components/container/index';
import { ImgCad } from '@/Components/Atomo/imgCadastro';
import { Content } from '@/Components/View/index';
import { CustomTitle } from '@/Components/Atomo/Title/index'

interface CadastroScreenProps {
    navigation: StackNavigationProp<any>; // Você pode usar um tipo mais específico se tiver
}

const CadastroScreen: React.FC<CadastroScreenProps> = ({ navigation }) => {
    return (
        <Container>
            <ImgCad />
            <CustomTitle> Novo Usuário</CustomTitle>
            <Content>
                <Formulario
                    tipo="NovoCadastro"
                    navigation={navigation}
                />
            </Content>
        </Container>
    );
};

export default CadastroScreen;

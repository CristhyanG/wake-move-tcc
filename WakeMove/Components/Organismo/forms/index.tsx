import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { View, ActivityIndicator, Text } from "react-native";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Field from '@/Components/molecula/Fields';
import { Btn } from "@/Components/Atomo/Button/index";
import { styles } from "@/Components/Organismo/forms/stylesForms";
import { BackButton } from '@/Components/Atomo/backButton';
import { useAuth } from '@/data/userAuth/userCad';
import { CustonModal } from '@/Components/Organismo/alert'; // Importando o modal personalizado

interface FormData {
  email: string;
  senha?: string;
  confirmaSenha?: string;
}

const Formulario: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { signup, login, resetPassword, loading, error, success } = useAuth();
  const [screen, setScreen] = useState<'login' | 'signup' | 'forgotPassword'>('login');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [navigationAfterModal, setNavigationAfterModal] = useState<'Home' | 'Login' | null>(null);
  const [screenAfter, setScreenAfter] = useState<'login' | 'signup' | 'forgotPassword' | null>(null);
  // Esquemas de validação
  const schemaLogin = yup.object({
    email: yup.string().email("Email inválido").required("Informe seu email"),
    senha: yup.string().required("Digite sua senha"),
  });

  const schemaSignup = yup.object({
    email: yup.string().email("Email inválido").required("Informe seu email"),
    senha: yup.string().required("Digite sua senha"),
    confirmaSenha: yup.string().required("Confirme sua senha").oneOf([yup.ref("senha")], "Senhas diferentes"),
  });

  const schemaForgotPassword = yup.object({
    email: yup.string().email("Email inválido").required("Informe seu email"),
  });

  // Função para alternar esquemas
  const getSchema = () => {
    switch (screen) {
      case 'login': return schemaLogin;
      case 'signup': return schemaSignup;
      case 'forgotPassword': return schemaForgotPassword;
      default: return schemaLogin;
    }
  };

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(getSchema()),
  });

  // Funções de manipulação
  const handleSignIn = async (data: FormData): Promise<void> => {
    try {
      await login(data.email, data.senha!);
      setNavigationAfterModal('Home');
    } catch (error) {
      // O erro já é tratado automaticamente pelo contexto
    }
  };

  const handleSignUp = async (data: FormData): Promise<void> => {
    try {
      await signup(data.email, data.senha!);
      setScreenAfter('login');
    } catch (error) {
      // O erro já é tratado automaticamente pelo contexto
    }
  };

  const handleResetPassword = async (data: FormData): Promise<void> => {
    try {
      await resetPassword(data.email);
      setScreenAfter('login')
    } catch (error) {
      // O erro já é tratado automaticamente pelo contexto
    }
  };

  // Função para fechar o modal e navegar
  const closeModal = () => {
    setModalVisible(false); // Fecha o modal
    if (navigationAfterModal) {
      navigation.navigate(navigationAfterModal); // Navega para a tela indicada
    } else if (screenAfter) {
      setScreen(screenAfter)
    }
  };

  // Exibir mensagem do AuthContext no modal
  useEffect(() => {
    if (error || success) {
      setModalMessage(error || success || '');  // Exibe o erro ou sucesso
      setModalVisible(true);  // Exibe o modal
    }
  }, [error, success]); // Monitora alterações no erro ou sucesso

  return (
    <View>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {!loading && (
        <>
          {/* Modal de Feedback */}
          <CustonModal
            visible={modalVisible}
            onClose={closeModal}
            modalText={modalMessage}
            closeText="Ok"
          />

          {screen === 'login' && (
            <>
              <Field
                style={styles.input}
                control={control}
                errors={errors}
                name='email'
                Title='Email'
                placeholder='Digite seu email'
                tipo='email'
              />
              <Field
                style={styles.input}
                control={control}
                errors={errors}
                name='senha'
                Title='Senha'
                placeholder='Digite sua senha'
                tipo='senha'
              />
              <View style={{ marginVertical: 10 }}>
                <Btn
                  title="Login"
                  onPress={handleSubmit(handleSignIn)}
                />
              </View>
              <View style={{ marginVertical: 10 }}>
                <Text>Esqueceu a senha? </Text>
                <View>
                  <Btn
                    title="Esqueci a senha"
                    onPress={() => setScreen('forgotPassword')}
                  />
                </View>
              </View>
              <View style={styles.viewContent}>
                <Text>Não tem uma conta? </Text>
                <View>
                  <Btn
                    title="Cadastre-se"
                    onPress={() => setScreen('signup')}
                  />
                </View>
              </View>
            </>
          )}

          {screen === 'signup' && (
            <>
              <Field
                style={styles.input}
                control={control}
                errors={errors}
                name='email'
                Title='Email'
                placeholder='Digite seu email'
                tipo='email'
              />
              <Field
                style={styles.input}
                control={control}
                errors={errors}
                name='senha'
                Title='Senha'
                placeholder='Digite sua senha'
                tipo='senha'
              />
              <Field
                style={styles.input}
                control={control}
                errors={errors}
                name='confirmaSenha'
                Title='Confirma Senha'
                placeholder='Confirme sua senha'
                tipo='senha'
              />
              <View style={{ marginVertical: 10 }}>
                <Btn
                  title="Cadastrar"
                  onPress={handleSubmit(handleSignUp)}
                />
              </View>
              <View style={styles.viewContent}>
                <Text>Já tem uma conta? </Text>
                <View>
                  <Btn
                    title='Login'
                    onPress={() => { setScreen('login') }}
                  />
                </View>
              </View>
            </>
          )}

          {screen === 'forgotPassword' && (
            <>
              <Field
                style={styles.input}
                control={control}
                errors={errors}
                name='email'
                Title='Email'
                placeholder='Digite seu email'
                tipo='email'
              />
              <View style={{ marginVertical: 10 }}>
                <Btn
                  title="Redefinir Senha"
                  onPress={handleSubmit(handleResetPassword)}
                />
              </View>
              <View style={styles.viewContent}>
                <Text>Voltar para </Text>
                <View>
                  <Btn
                    title='Login'
                    onPress={() => { setScreen('login') }}
                  />
                </View>
              </View>
            </>
          )}

          <BackButton caminho="Home" navigation={navigation} />
        </>
      )}
    </View>
  );
};

export default Formulario;

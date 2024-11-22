import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { View, Text } from "react-native";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Field from '@/Components/molecula/Fields';
import { Btn } from "@/Components/Atomo/Button/index";
import { styles } from "@/Components/Organismo/forms/stylesForms";
import { BackButton } from '@/Components/Atomo/backButton';
import { useAuth } from '@/data/userAuth/userCad';

const Formulario: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { signup, login, resetPassword } = useAuth();
  const [screen, setScreen] = useState('login');

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

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(
      screen === 'login'
        ? schemaLogin
        : screen === 'signup'
          ? schemaSignup
          : schemaForgotPassword
    ),
  });

  const handleSignIn = async (data: any) => {
    try {
      const { email, senha } = data;
      await login(email, senha);
    } catch (error) {
      console.log('Erro ao realizar login', error);
    }
  };

  const handleSignUp = async (data: any) => {
    try {
      const { email, senha } = data;
      await signup(email, senha);
    } catch (error) {
      console.log('Erro ao cadastrar usuário', error);
    }
  };

  const handleResetPassword = async (email: string) => {
    try {
      await resetPassword(email);
    } catch (error) {
      console.log('Erro ao redefinir senha', error);
    }
  };

  return (
    <View>
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
          <View>
            <Btn
              title={'Login'}
              onPress={handleSubmit(handleSignIn)}
            />
          </View>
          <View>
            <Btn
              title="Esqueci a senha"
              onPress={() => setScreen('forgotPassword')}
            />
          </View>
          <View style={styles.viewContent}>
            <Text>Não tem uma conta? </Text>
          </View>
          <Btn
            title={'Cadastre-se'}
            onPress={() => setScreen('signup')}
          />
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
          <View>
            <Btn
              title={'Cadastrar'}
              onPress={handleSubmit(handleSignUp)}
            />
          </View>
          <View style={styles.viewContent}>
            <Text>Já tem uma conta? </Text>
          </View>
          <Btn
            title={'Login'}
            onPress={() => setScreen('login')}
          />
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
          <View>
            <Btn
              title={'Redefinir Senha'}
              onPress={handleSubmit(({ email }) => handleResetPassword(email))}
            />
          </View>
          <View style={styles.viewContent}>
            <Text>Voltar para </Text>
          </View>
          <Btn
            title={'Login'}
            onPress={() => setScreen('login')}
          />
          <Btn
            title={'Cadastre-se'}
            onPress={() => setScreen('signup')}
          />
        </>
      )}
      <BackButton
        caminho="Home"
        navigation={navigation}
      />
    </View>
  );
}

export default Formulario;

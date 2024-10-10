import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Text, View, Alert, StyleSheet } from "react-native";
import NavButton from '@/Components/navButton';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { addUser, getAllUsers } from '@/data/firebase';
import { Input } from '@/Components/TextInput';
import { Btn } from "@/Components/Button/index";

interface FormularioProps {
  tipo: 'Login' | 'NovoCadastro';
  navigation: any;
}

const Formulario: React.FC<FormularioProps> = ({ tipo, navigation }) => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await getAllUsers();
        setUsers(userData);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchUsers();
  }, []);

  if (tipo === "Login") {

    const schema = yup.object({
      email: yup.string().email("Email inválido").required("Informe seu email"),
      senha: yup.string().required("Digite sua senha")
    });

    const { control, handleSubmit, formState: { errors } } = useForm({
      resolver: yupResolver(schema),
    });

    const handleSignIn = async (data) => {
      try {
        const { email, senha } = data;
        console.log("Dados recebidos no handleSignIn:", email, senha);
        const userId = await addUser({ usEmail: email, usSenha: senha });
        console.log("Usuário cadastrado com ID:", userId);
      } catch (error) {
        console.error("Erro ao cadastrar usuário", error.message);
      }
    };

    return (
      <View >
        
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Digite seu email"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.email?.message}
              label="Email"
            />
          )}
        />

        <Controller
          control={control}
          name="senha"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Digite sua senha"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.senha?.message}
              label="Senha"
            />
          )}
        />

        <View >
          <Btn
            title={'Login'}
            onPress={handleSubmit(handleSignIn)}
          />
          <NavButton
            caminho={'Home'}
            label={"Voltar"}
            navigation={navigation}
          />
        </View>
      </View>
    );

  } else if (tipo === "NovoCadastro") {

    const schema = yup.object({
      email: yup.string().email("email inválido").required("informe seu email"),
      senha: yup.string().required("digite sua senha"),
      confirmaSenha: yup.string().required("Confirme sua senha").oneOf([yup.ref("senha")], "Senhas diferentes"),
    });

    const { control, handleSubmit, formState: { errors } } = useForm({
      resolver: yupResolver(schema),
    });

    const handleSignIn = async (data) => {
      try {
        const { email, senha } = data;
        console.log("Dados recebidos no handleSignIn:", email, senha);
        const userId = await addUser({ usEmail: email, usSenha: senha });
        console.log("Usuário cadastrado com ID:", userId);
      } catch (error) {
        console.error("Erro ao cadastrar usuário", error.message);
      }
    };

    return (
      <View >
        
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Digite seu email"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.email?.message}
              label="Email"
            />
          )}
        />

        <Controller
          control={control}
          name="senha"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Digite sua senha"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.senha?.message}
              label="Senha"
            />
          )}
        />

        <Controller
          control={control}
          name="confirmaSenha"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Confirme sua senha"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.confirmaSenha?.message}
              label="Confirme a senha"
            />
          )}
        />

        <View >
          <Btn
            title={'Cadastrar'}
            onPress={handleSubmit(handleSignIn)}
          />
          <NavButton
            caminho="Home"
            label="Voltar"
            navigation={navigation}
          />
        </View>
      </View>
    );
  }
};


export default Formulario;

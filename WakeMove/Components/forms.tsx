import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { View } from "react-native";
import NavButton from '@/Components/navButton';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { addUser, getAllUsers } from '@/data/firebase';
import Field from '@/Components/Fields';
import { Btn } from "@/Components/Button/index";
import { styles } from "./stylesForms"
import { CustonModal } from './alert/index';

interface FormularioProps {
  tipo: 'Login' | 'NovoCadastro';
  navigation: any;
}

const Formulario: React.FC<FormularioProps> = ({ tipo, navigation }) => {

  const [users, setUsers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false)

  const handleShowModal = () =>{
    setModalVisible(true);
  }

  const handleCloseModal = () =>{
    setModalVisible(false);
  }

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
      <View>

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
        handleShowModal();
      } catch (error) {
        console.error("Erro ao cadastrar usuário", error.message);
      }
    };

    return (
      <View >

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

        <View >
          <Btn
            title={'Cadastrar'}
            onPress={handleSubmit(handleSignIn)}
          />

          <CustonModal
            visible={modalVisible}
            onClose={handleCloseModal}
            modalText="Usuário Cadastrado"
          >
          </CustonModal>

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

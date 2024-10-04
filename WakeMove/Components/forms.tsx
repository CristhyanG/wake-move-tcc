import React, { useState, useEffect } from 'react'
import { useForm, Controller} from 'react-hook-form';
import { Text, View, StyleSheet, TextInput  } from "react-native";
import NavButton from './navButton'
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {addUser, getAllUsers} from '../data/firebase';
import { useLocalSearchParams } from 'expo-router';

export default function Formulario ({tipo}) {
  
  const [users, setUsers] = useState([]);
  
  useEffect(() => {

    const fetchUsers = async() => {
      try{
        const userData = await getAllUsers();
        setUsers(userData);
      } catch (error) {
        console.error(error.message)
      }
    };

    fetchUsers();
  }, []); // Executa apenas uma vez ao montar o componente

    if(tipo == "Login") {
        
        const schema = yup.object ({
            email: yup.string().email("email inválido").required("informe seu email"),
            senha: yup.string().required("digite sua senha")
        })
          
        const {control, handleSubmit, formState: {errors} } = useForm ({ /* é possível usar o defaultValues dentro de ({}) para colocar alguumas definições de valores*/
            resolver: yupResolver(schema),
        }) 
        
        const handleSignIn = async (data) => {
          // try{
          //   const {email, senha} = data;
          //   const user = await addDoc(userCollectionRef, {
          //     usEmail: email,
          //     usSenha: senha,
          //   });
          //   console.log("usuario cadastrado com id:", user.id)
          // } catch(error){
          //   console.error("Erro ao cadastrar usuário", error)
          // }

          try{
            const {email, senha} = data;
            console.log("Dados recebidos no handleSignIn:", email, senha);
            const userId = await addUser ({usEmail: email, usSenha: senha});
            console.log("Usuário cadastrado com ID:", userId);
          } catch (error) {
            console.error("Erro ao cadastrar usuário", error.message)
          }  
        };
        
        return (
            <View /*style={styles.container} */>
                
                <Text /*style={styles.cadastroTiltle} */>Entrar</Text>
                
                <Text >Email</Text>      
                <Controller //FAZER UM COMPONENTE CONTROLLER
                  control={control} //user form => linha 9
                  name="email" //nome do campo
                  render={({ field: {onChange, onBlur, value} }) => ( //render = renderizar / passa também propriedaes dessa função criada
                    <TextInput
                    //   style={styles.input}
                      placeholder="   Digite seu Email"
                      onChangeText={onChange} //troca os use state por prop da renderização
                      onBlur={onBlur} //chamado quando o text input é trocado
                      value={value || ''} //troca valor de estado por valor de propriedade
                      keyboardType="email-address"
                    />
                  )}
                />
                {errors.email && <Text /*style={styles.labelErrors}*/> {errors.email?.message} </Text>}
                
                <Text >Senha</Text>
                <Controller
                  control={control} //user form => linha 9
                  name="senha" //nome do campo
                  render={({ field: {onChange, onBlur, value} }) => ( //render = renderizar / passa também propriedaes dessa função criada
                    <TextInput
                    //   style={styles.input}
                      placeholder="   Digite sua Senha"
                      onChangeText={onChange} //troca os use state por prop da renderização
                      onBlur={onBlur} //chamado quando o text input é trocado
                      value={value || ''} //troca valor de estado por valor de propriedade
                      keyboardType="default"
                      secureTextEntry={true}
                    /> 
                  )}
                />
                {errors.senha && <Text /*style={styles.labelErrors}*/> {errors.senha?.message} </Text>}
        
        
                
                
                <View /*style={styles.btns}*/>
                
                    <NavButton
                        caminho={'/'}
                        label={'Login'}
                        // style={styles.btnCadastro}
                        onPress={handleSubmit(handleSignIn)} //invés de mudança de estado chama esta função handleSign com status handleSubmit
                    />
            
                    <NavButton
                        onPress={()=>alert('Deseja retornar ao menu principal?')} 
                        caminho={'/'}
                        label={'Voltar'}
                    />
        
                </View>
            </View>
            )

    } else if (tipo == "NovoCadastro") { //mudar os styles
        
        const schema = yup.object ({
            email: yup
              .string()
              .email("email inválido")
              .required("informe seu email"),
            senha: yup
              .string()
              .required("digite sua senha"),
            confirmaSenha: yup 
              .string()
              .required("Confirme sua senha")
              .oneOf([yup.ref("senha")], "Senhas diferentes"),
        });
          
        const {control, handleSubmit, formState: {errors} } = useForm ({ /* é possível usar o defaultValues dentro de ({}) para colocar alguumas definições de valores*/
            resolver: yupResolver(schema),
        }); 
        
        const handleSignIn = async (data) => {
          // try{
          //   const {email, senha} = data;
          //   const user = await addDoc(userCollectionRef, {
          //     usEmail: email,
          //     usSenha: senha,
          //   });
          //   console.log("usuario cadastrado com id:", user.id)
          // } catch(error){
          //   console.error("Erro ao cadastrar usuário", error)
          // }

          try{
            const {email, senha} = data;
            console.log("Dados recebidos no handleSignIn:", email, senha);
            const userId = await addUser ({usEmail: email, usSenha: senha});
            console.log("Usuário cadastrado com ID:", userId);
          } catch (error) {
            console.error("Erro ao cadastrar usuário", error.message)
          }  
        };
        
        return (
            <View /*style={styles.container}  */>
                
                <Text /*style={styles.cadastroTiltle} */>Novo Cadastro </Text>
                
                <View /* CAMPO DE EMAIL */>
                  <Text >Email</Text>      
                  <Controller //FAZER UM COMPONENTE CONTROLLER
                    control={control} //user form => linha 9
                    name="email" //nome do campo
                    render={({ field: {onChange, onBlur, value} }) => ( //render = renderizar / passa também propriedaes dessa função criada
                        <TextInput
                        // style={styles.input}
                        placeholder="   Digite seu Email"
                        onChangeText={onChange} //troca os use state por prop da renderização
                        onBlur={onBlur} //chamado quando o text input é trocado
                        value={value || ""} //troca valor de estado por valor de propriedade
                        keyboardType="email-address"
                      />
                    )}
                  />
                  {errors.email && <Text /*style={styles.labelErrors}*/ > {errors.email?.message} </Text>}
                </View>

                <View /* CAMPO DE SENHA */>
                  <Text >Senha</Text> 
                  <Controller
                    control={control} 
                    name="senha" //MUDAR AQUI
                    render={({ field: {onChange, onBlur, value} }) => (
                      <TextInput
                        // style={styles.input}
                        placeholder="   Digite sua Senha" //MUDAR AQUI
                        onChangeText={onChange} 
                        onBlur={onBlur}
                        value={value || ""} //MUDAR AQUI
                        keyboardType="default" //MUDAR AQUI
                        secureTextEntry={true} //MUDAR AQUI
                      /> 
                    )}
                  />        
                    {errors.senha && <Text /*style={styles.labelErrors}*/ > {errors.senha?.message} </Text>}
                </View>

                <View /* CAMPO DE CONFIRMAÇÃO */>
                <Text >Confirme sua senha</Text>
                <Controller
                  control={control}
                  name="confirmaSenha" //MUDAR AQUI
                  render={({ field: {onChange, onBlur, value} }) => ( 
                    <TextInput
                    //   style={styles.input}
                      placeholder="   Confirme sua Senha" //MUDAR AQUI
                      onChangeText={onChange} 
                      onBlur={onBlur} 
                      value={value || ""} //MUDAR AQUI
                      keyboardType="default" //MUDAR AQUI
                      secureTextEntry={true} //MUDAR AQUI
                    /> 
                  )}
                />
                {errors.confirmaSenha && <Text /*style={styles.labelErrors}*/> {errors.confirmaSenha?.message} </Text>}
                </View>

                <View /*style={styles.btns} */>
                
                    <NavButton
                        caminho={'/'}
                        label={'Cadastrar'}
                        // style={styles.btnCadastro}
                        onPress={handleSubmit(handleSignIn)} //invés de mudança de estado chama esta função handleSign com status handleSubmit
                    />
            
                    <NavButton
                        onPress={()=>alert('Deseja retornar ao menu principal?')} 
                        caminho={'/'}
                        label={'Voltar'}
                    />
            
                </View>
            </View>
            )
        
    }
} 

  
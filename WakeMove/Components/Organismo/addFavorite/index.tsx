import React, { useEffect, useState } from "react";
import { addFavorite, RmButton, viewFavorite, EditButton } from "@/data/firebase";
import { Modal, Pressable, Text, View } from "react-native";
import { styles } from './styles';
import { Input } from "@/Components/Atomo/TextInput";
import { CustonModal } from "../alert";
import { AddButton } from "@/Components/Atomo/addButton";
//import AsyncStorage from '@react-native-async-storage/async-storage';


export const AddFavorite = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [match, setMatch] = useState('');
  const [fate, setFate] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [routes, setRoutes] = useState([]);
  const [editingRoute, setEditingRoute] = useState(null); // Estado para controlar a edição


  const handleShowModal = () => {
    setModalVisible(true);
  };


  const handleCloseModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    const unsubscribe = viewFavorite((favorites) => {
      setRoutes(favorites);
    });

    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);

  const addNewRoute = async () => {
    if (match && fate) {
      try {
        const data = { Match: match, Fate: fate };
        await addFavorite(data);
        setMatch('');
        setFate('');
        setIsVisible(false)
        console.log("Rota adicionada com sucesso!");
      } catch (error) {
        console.log("Erro ao adicionar rota aos favoritos", error);
      }
    } else {
      handleShowModal();
    }
  };

  const remolveButton = async (id) => {
    try {
      await RmButton(id);
      setRoutes((prevRoutes) => prevRoutes.filter((route) => route.id !== id));
      console.log("Rota removida com sucesso");
    } catch (error) {
      console.log("Erro ao deletar a rota", error);
    }
  };

  const editButton = async (route) => {
    setMatch(route.Match);
    setFate(route.Fate);
    setEditingRoute(route.id); 
    setIsVisible(true); 
  };

  const saveEditRoute = async () => {
    if (editingRoute && match && fate) {
      try {
        const data = { Match: match, Fate: fate };
        await EditButton(editingRoute, data); // Passa o ID e os novos dados para a função de edição
        setMatch('');
        setFate('');
        setEditingRoute(null); // Reseta o ID da rota sendo editada
        setIsVisible(false);
        console.log("Rota editada com sucesso!");
      } catch (error) {
        console.error("Erro ao editar a rota", error);
      }
    } else {
      handleShowModal();
    }
  };

  return (
    <View style={styles.contentContainer}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={() => {
          setIsVisible(!isVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.titleBtn}>{editingRoute ? 'Editar Rota' : 'Adicione a nova rota'}</Text>
          <Input
            onChangeText={setMatch}
            value={match}
            placeholder="Digite seu ponto de partida"
          />
          <Input
            onChangeText={setFate}
            value={fate}
            placeholder="Digite seu ponto de chegada"
          />
          <Pressable
            style={styles.modalBtn}
            onPress={editingRoute ? saveEditRoute : addNewRoute} // Chama a função adequada
          >
            <Text style={styles.titleBtn}>
              {editingRoute ? 'Salvar Alterações' : 'Adicionar'}
            </Text>
          </Pressable>
          <CustonModal
            visible={modalVisible}
            onClose={handleCloseModal}
            closeText="OK"
            modalText="Preencha todos os campos"
          />
          
        </View>
      </Modal>
      <AddButton
        routes={routes}
        onRemove={remolveButton}
        onEdit={editButton} 
      />
      <Pressable
        style={styles.openModal}
        onPress={() => { setIsVisible(true); setEditingRoute(null); }}
      >
        <Text style={styles.titleBtn}>Adicionar Rota 📝</Text>
      </Pressable>
    </View>
  );
};

export default AddFavorite;


import React, { useEffect, useState } from "react";
import { addFavorite, RmButton, viewFavorite, EditButton } from "@/data/firebase";
import { Modal, Pressable, Text, View } from "react-native";
import { styles } from './styles';
import { CustonModal } from "../alert";
import { AddButton } from "@/Components/Atomo/addButton";
import { Query } from "@/API/Google/Places/Query";

interface SearchProps {
  page: string;
}

export const AddFavorite: React.FC<SearchProps> = ({ page }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [routes, setRoutes] = useState([]);
  const [editingRoute, setEditingRoute] = useState(null);

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

  const handleUpdateAddress = (address: string, type: 'origin' | 'destination') => {
    if (type === 'origin') {
      setOrigin(address);
    } else {
      setDestination(address);
    }
  };

  const addNewRoute = async () => {
    if (origin && destination) {
      console.log("Dados a serem adicionados:", { origin, destination });
      try {
        const data = { origin, destination };
        await addFavorite(data);
        setIsVisible(false);
        console.log("Rota adicionada com sucesso!");
      } catch (error) {
        console.log("Erro ao adicionar rota aos favoritos", error);
      }
    } else {
      handleShowModal();
    }
  };

  const remolveButton = async (id: string) => {
    try {
      await RmButton(id);
      setRoutes((prevRoutes) => prevRoutes.filter((route) => route.id !== id));
      console.log("Rota removida com sucesso");
    } catch (error) {
      console.log("Erro ao deletar a rota", error);
    }
  };

  const editButton = async (route) => {
    setOrigin(route.origin);
    setDestination(route.destination);
    setEditingRoute(route.id);
    setIsVisible(true);
  };

  const saveEditRoute = async () => {
    if (editingRoute && origin && destination) {
      try {
        const data = { origin, destination };
        await EditButton(editingRoute, data);
        setEditingRoute(null);
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
          <View style={styles.query}>
            <Query
              type="endereço"
              page="Current"
            />
            <Query
              type="endereço"
              page="Final"
            />
          </View>
          <Pressable
            style={styles.modalBtn}
            onPress={editingRoute ?  saveEditRoute : addNewRoute}
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

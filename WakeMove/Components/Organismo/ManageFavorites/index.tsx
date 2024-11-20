import React, { useEffect, useState } from "react";
import { Modal, Pressable, Text, View, FlatList } from "react-native";
import { fetchFavorites } from "@/data/services/FetchFavorite";  // Função que busca os favoritos
import { saveEditFavorite } from "@/data/services/SaveEditFavorite";  // Função para editar favorito
import { deleteFavorite } from "@/data/services/DeleteFavorite";  // Função para excluir favorito
import { styles } from './styles';
import { CustonModal } from "../alert";  // Modal customizado
import { useAuth } from "@/data/userAuth/userCad";  // Hook de autenticação

// Interface para os dados da rota
interface Route {
  id: string;
  Origin: string;
  Destination: string;
}

export const ManageFavorites: React.FC = () => {
  const { user } = useAuth();  // Pega o usuário logado
  const [routes, setRoutes] = useState<Route[]>([]);  // Estado para armazenar as rotas
  const [editingRoute, setEditingRoute] = useState<string | null>(null);  // Rota em edição
  const [match, setMatch] = useState<string>('');  // Origem
  const [fate, setFate] = useState<string>('');  // Destino
  const [isVisible, setIsVisible] = useState<boolean>(false);  // Visibilidade do modal
  const [modalVisible, setModalVisible] = useState<boolean>(false);  // Visibilidade do modal de erro

  useEffect(() => {
    if (user) {
      // Chama fetchFavorites diretamente e atualiza o estado com os favoritos
      fetchFavorites(user.uid, (favorites: Route[]) => {
        setRoutes(favorites);  // Atualiza o estado com as rotas
      }).catch(error => {
        console.error("Erro ao carregar favoritos", error);
      });
    }
  }, [user]);

  const handleShowModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  // --- Início da edição da rota ---
  const editRoute = (route: Route) => {
    setMatch(route.Origin);  // Define a origem no estado
    setFate(route.Destination);  // Define o destino no estado
    setEditingRoute(route.id);  // Define a rota que está sendo editada
    setIsVisible(true);  // Abre o modal de edição
  };

  const saveEditRoute = async () => {
    if (editingRoute && match && fate) {  // Verifica se todos os campos estão preenchidos
      try {
        const updatedData = { Origin: match, Destination: fate };  // Dados atualizados
        await saveEditFavorite(editingRoute, updatedData);  // Salva as edições no banco de dados
        setRoutes((prevRoutes) =>
          prevRoutes.map((route) => 
            route.id === editingRoute ? { ...route, ...updatedData } : route  // Atualiza o estado com a nova rota
          )
        );
        resetEditState();  // Reseta o estado após a edição
        console.log("Rota editada com sucesso!");
      } catch (error) {
        console.error("Erro ao salvar edição", error);  // Trata qualquer erro
      }
    } else {
      handleShowModal();  // Exibe o modal caso os campos não sejam preenchidos
    }
  };

  const resetEditState = () => {
    setMatch('');  // Limpa o campo de origem
    setFate('');  // Limpa o campo de destino
    setEditingRoute(null);  // Limpa o estado da rota em edição
    setIsVisible(false);  // Fecha o modal de edição
  };
  // --- Fim da edição da rota ---

  // --- Função para excluir uma rota ---
  const deleteRoute = async (id: string) => {
    try {
      await deleteFavorite(id);  // Deleta a rota no banco de dados
      setRoutes((prevRoutes) => prevRoutes.filter((route) => route.id !== id));  // Atualiza o estado removendo a rota
      console.log("Rota removida com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar a rota", error);
    }
  };

  return (
    <View style={styles.contentContainer}>
      {/* Modal para edição de rota */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={() => setIsVisible(!isVisible)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.titleBtn}>Editar Rota</Text>
          <View style={styles.query}>
            {/* Exibe os campos de origem e destino como texto */}
            <Text style={styles.label}>Origem: {match}</Text>
            <Text style={styles.label}>Destino: {fate}</Text>
          </View>
          <Pressable style={styles.modalBtn} onPress={saveEditRoute}>  {/* Botão para salvar edição */}
            <Text style={styles.titleBtn}>Salvar Alterações</Text>
          </Pressable>
          <CustonModal
            visible={modalVisible}
            onClose={handleCloseModal}
            closeText="OK"
            modalText="Preencha todos os campos"  // Modal de erro caso os campos não estejam preenchidos
          />
        </View>
      </Modal>

      {/* Lista de rotas */}
      <FlatList
        data={routes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.routeItem}>
            <Text style={styles.routeText}>
              {item.Origin} ➡ {item.Destination}
            </Text>
            <View style={styles.actionButtons}>
              {/* Botão de editar */}
              <Pressable
                style={styles.editButton}
                onPress={() => editRoute(item)}  // Inicia o processo de edição
              >
                <Text style={styles.buttonText}>Editar</Text>
              </Pressable>
              {/* Botão de excluir */}
              <Pressable
                style={styles.deleteButton}
                onPress={() => deleteRoute(item.id)}  // Exclui a rota
              >
                <Text style={styles.buttonText}>Excluir</Text>
              </Pressable>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default ManageFavorites;

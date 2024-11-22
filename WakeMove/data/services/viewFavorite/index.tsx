import React, { useEffect, useState } from "react";
import { viewFavorites } from "@/data/userAuth/ViewDb"; // Certifique-se de usar a função certa para buscar favoritos
import { Favorite } from "@/data/userAuth/ViewDb";
import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import { useAuth } from "@/data/userAuth/userCad"; // Importando o hook de autenticação
import { deleteFavorite } from "../DeleteFavorite";

const FavoritesList = () => {
  const { user } = useAuth(); // Pegando o usuário logado do hook
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  useEffect(() => {
    if (user && user.email) {
      viewFavorites(user.email, (fetchedFavorites) => {
        setFavorites(fetchedFavorites); // Atualiza o estado com os favoritos
      });
    }
  }, [user]); // Dependência em `user` para atualizar quando o usuário mudar

  return (
    <View >
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>Origem: {item.Origin}</Text>
            <Text style={styles.itemText}>Destino: {item.Destination}</Text>
            <Pressable
              onPress={()=>deleteFavorite(item.id)}
            >
              <Text style={styles.btn}> Deletar </Text>
            </Pressable>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum favorito encontrado.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  itemText: {
    fontSize: 18,
    marginBottom: 7
  },
  emptyText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 32,
  },
  btn:{
    color: "red",
    fontSize: 16,
    margin: 5,
  }
});

export default FavoritesList;

import React from "react";
import { Favorite } from "@/data/userAuth/ViewDb";
import { FlatList, Text, View } from "react-native";

interface AddFavoriteProps {
  favorites: Favorite[];
}

const AddFavorite: React.FC<AddFavoriteProps> = ({ favorites }) => {
  return (
    <View>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.Origin} ➡ {item.Destination}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default AddFavorite;

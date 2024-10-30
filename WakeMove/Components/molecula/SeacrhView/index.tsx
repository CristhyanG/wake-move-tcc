import React from "react";
import { Query } from "@/Components/molecula/query/index"
import { Lupa } from "@/Components/Atomo/iconLupa";
import { View } from "react-native";
import { styles } from "./styles"
import { StackNavigationProp } from "@react-navigation/stack";

interface SearchProps {
    navigation: StackNavigationProp<any>
 
}

export const SearchView: React.FC<SearchProps> = ({ navigation }) => {
    return (
        <View style={styles.searchView}>
            <Query />
            <Lupa
                navigation={navigation}
                caminho="Location"
            />
        </View>
    )
}
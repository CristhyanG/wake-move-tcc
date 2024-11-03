import React from "react";
import { Query } from "@/Api/Google/Places/Query"
import { Lupa } from "@/Components/Atomo/iconLupa";
import { View } from "react-native";
import { styles } from "./styles"
import { StackNavigationProp } from "@react-navigation/stack";

interface SearchProps {
    navigation: StackNavigationProp<any>;
    page: string;
 
}

export const SearchView: React.FC<SearchProps> = ({ navigation, page }) => {
    return (
        <View style={styles.searchView}>
            <Query 
                type="endereco"
                page={page}
            />
            <Lupa
                navigation={navigation}
                caminho="Location"
            />
        </View>
    )
}
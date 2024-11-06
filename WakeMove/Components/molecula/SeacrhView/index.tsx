import React from "react";
import { Query } from "@/Api/Google/Places/Query"
import { Lupa } from "@/Components/Atomo/iconLupa";
import { View } from "react-native";
import { styles } from "./styles"
import { StackNavigationProp } from "@react-navigation/stack";

interface SearchProps {
    navigation: StackNavigationProp<any>;
    page: string,
    caminho: string;
 
}

export const SearchView: React.FC<SearchProps> = ({ navigation, page, caminho }) => {
    return (
        <View style={styles.searchView}>
            <Query 
                type="endereco"
                page={page}
            />
            <Lupa
                navigation={navigation}
                caminho={caminho}
            />
        </View>
    )
}
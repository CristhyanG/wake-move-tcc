import React from "react";
import { Query } from "@/Components/molecula/query/index"
import { Lupa } from "@/Components/Atomo/iconLupa";
import { View } from "react-native";
import { styles } from "./styles"
import { StackNavigationProp } from "@react-navigation/stack";

interface SeacrchProps {
    navigation: StackNavigationProp<any>
    query: {
        key: string,
        language: string
        types: string
        components: string
    }
}

export const SeacrhView = ({ navigation, query }: SeacrchProps) => {
    return (
        <View style={styles.searchView}>
            <Query navigation={navigation} query={query} />
            <Lupa
                navigation={navigation}
                caminho="Location"
            />
        </View>
    )
}
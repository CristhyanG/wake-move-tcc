import React from "react";
import { View, Pressable, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { Ionicons } from '@expo/vector-icons';

export const AddButton = ({ routes, onRemove }) => {
    return (
        <View style={styles.containerAdd}>
            {routes.map((route) => (
                <View key={route.id} style={styles.routeContainer}>
                    <Pressable
                        style={styles.btn}
                        onPress={() => console.log(route)}
                    >
                        <Text style={styles.textAdd}>Ponto de Partida:</Text>
                        <Text style={styles.textAdd}>{route.Match}</Text>
                        <Text style={styles.textAdd}>Destino:</Text>
                        <Text style={styles.textAdd}>{route.Fate}</Text>
                    </Pressable>
                    <TouchableOpacity 
                        style={styles.btnDel}
                        onPress={() => onRemove(route.id)}
                    >
                        <Ionicons name="trash" size={24} color="white"/>
                    </TouchableOpacity>
                </View>
            ))}
        </View>
    )
}
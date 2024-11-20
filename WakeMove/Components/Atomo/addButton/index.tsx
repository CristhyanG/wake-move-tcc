import React from "react";
import { View, Pressable, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { Ionicons } from '@expo/vector-icons';

export const AddButton = ({ routes, onRemove, onEdit }) => {

    return (
        <View style={styles.containerAdd}>
            {routes.map((route) => (
                <View key={route.id} style={styles.routeContainer}>
                    <Pressable
                        style={styles.btn}
                        onPress={() => console.log(route)}
                    >
                        <Text style={styles.textAdd}>Origin:</Text>
                        <Text style={styles.textAdd}>{route.Origin}</Text>
                        <Text style={styles.textAdd}>Destino:</Text>
                        <Text style={styles.textAdd}>{route.Destination}</Text>
                    </Pressable>
                    
                    <View>
                    <TouchableOpacity
                        style={styles.btnDel}
                        onPress={() => onRemove(route.id)}
                    >
                        <Ionicons name="trash" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btnEdit}
                        onPress={() => onEdit(route)}
                    >
                        <Ionicons name="pencil" size={24} color="black" />
                    </TouchableOpacity>
                    </View>

                </View>
            ))}
        </View>
    );
};

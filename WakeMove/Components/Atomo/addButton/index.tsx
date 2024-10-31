import React from "react";
import { View, Pressable, Text } from "react-native";
import { styles } from "./styles";

export const AddButton = ({ routes, onRemove }) => {
    return (
        <View style={styles.containerAdd}>
            {routes.map((route) => (
                <View key={route.id}>
                    <Pressable
                        style={styles.btn}
                        onPress={() => console.log(route)}
                    >
                        <Text style={styles.textAdd}>{route.Match} - {route.Fate}</Text>
                    </Pressable>
                    <Pressable 
                        style={styles.btnDel}
                        onPress={()=> onRemove(route.id)}
                    >
                        <Text style={styles.textDel}> Remover </Text>
                    </Pressable>
                </View>
            ))}
        </View>
    );
};

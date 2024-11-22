import React from "react";
import { Text, View, Pressable } from "react-native";
import { btnStyles } from "@/Components/Atomo/Button/style"
interface Props {
    title: string;
    onPress: any;
}

export const Btn: React.FC<Props> = ({ title, onPress }) => {
    return (
        <View style={btnStyles.btnContainer}>
            <Pressable
                style={btnStyles.btn}
                onPress={onPress}
            >
                <Text style={btnStyles.title}>{title}</Text>
            </Pressable>
        </View>
    )
}
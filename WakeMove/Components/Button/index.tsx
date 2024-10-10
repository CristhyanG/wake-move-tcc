import React from "react";
import { Button, View } from "react-native";
// import { ReactNode } from "react";
import { styles } from "@/Components/Button/style"
interface Props {
    title: string;
    onPress: any;
}

export const Btn: React.FC<Props> = ({ title, onPress }) => {
    return (
        <View style={styles.btnContainer}>
            <Button
                title={title}
                onPress={onPress}
            />
        </View>
    )
}
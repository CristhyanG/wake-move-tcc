import React from "react";
import { Button } from "react-native";
// import { ReactNode } from "react";

interface Props {
    title: string;
    onPress: any;
}

export const Btn: React.FC<Props> = ({title, onPress}) => {
    return(
        <Button
            title={title}
            onPress={onPress}
        />
    )
}
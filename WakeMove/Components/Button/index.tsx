import React from "react";
import { Button } from "react-native";
import { ReactNode } from "react";

interface Props {
    title: string;
}

export const Btn: React.FC<Props> = ({title}) => {
    return(
        <Button
            title={title}
        />
    )
}
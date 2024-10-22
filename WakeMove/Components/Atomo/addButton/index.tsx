import React, {useState} from "react";
import { View, Pressable, Text } from "react-native";
import {styles} from "./styles"

interface Props{
    data: {[key: string]: string}
}

export const AddButton = ({data}: Props) =>{

    const [newButton, setNewButton] = useState('')

    return(
        <View>
            <Pressable
                style={styles.btn}
                onPress={()=>console.log(data)}
            >
                <Text>{data.descrição}</Text>
            </Pressable>
        </View>
    )
}
import React, {useState} from "react";
import { View } from "react-native";
import { addNewFavorite } from "@/data/firebase"; 
import { collection } from "firebase/firestore";

export const AddButton = ({addNewButton}) =>{

    const [newButton, setNewButton] = useState('')

    const onSubmit = async() => {
        if(newButton.trim()!==(''))
            const docRef = await addNewFavorite(db,collection('Favorite')).add({
                label: newButton
        })
    }

    return(
        <View>

        </View>
    )
}
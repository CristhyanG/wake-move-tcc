import React,{useState} from "react";
import { View, Pressable, Text } from "react-native";
import { deleteFavorite } from "@/data/services/DeleteFavorite";
import { CustonModal } from "@/Components/Organismo/alert";
import {styles} from "./styles"


export const RmFavorite = () =>{

    const [ isVisible, setIsVisible] = useState(false)
    const [match, setMatch] = useState('')
    const [fate, setFate] = useState('')

    const handleShowModal = () => {
        setIsVisible(true)
    }

    const handleCloseModal = () =>{
        setIsVisible(false)
    }

    const handleRmfavorite = ( data :{match: string, fate: string}) =>{
        setMatch('')
        setFate('')
    }

    const rmBUtton = async () =>{
        if(match && fate){
            try{
                const value = {Match: match , Fate: fate}
                handleRmfavorite({match, fate})
            }
            catch (error) {
                console.error("Erro ao remover favorito" , error)
            }
        }
        else{
            handleShowModal()
        }
    }

    return(
        <View>
            <Pressable style={styles.rmButton} >
                <Text> Remover </Text>
            </Pressable>
            <CustonModal
                visible={isVisible}
                onClose={handleCloseModal}
                closeText= " Sim "
                modalText= "Realmente deseja excluir essa rota ?"
            >
            </CustonModal>
        </View>
    )
}
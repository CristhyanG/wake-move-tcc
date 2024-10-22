import React, { useState, useEffect } from "react";
import { addFavorite } from "@/data/firebase";
import { Modal, Pressable, Text, View, Alert } from "react-native";
import { styles } from './styles'
import { Input } from "@/Components/Atomo/TextInput";
import { CustonModal } from "../alert";
import { string } from "yup";

interface addFavoriteProps {
    onAdd: (data: {[key: string]: string}) => void
}

const AddFavorite = ({onAdd}: addFavoriteProps) => {

    const [isVisible, setIsVisible] = useState(false)
    const [match, setMatch] = useState('')
    const [fate, setFate] = useState('')
    const [modalVisible, setModalVisible] = useState(false)

    const handleShowModal = () => {
        setModalVisible(true)
    }

    const handleCloseModal = () =>{
        setModalVisible(false)
    }

    const handleAdd = () =>{
        onAdd({match, fate});
        setIsVisible(false)
        setMatch('')
        setFate('')
    }

     const addNewRoute = async () => {
        if (match && fate) {
            try {
                const data = { Match: match, Fate: fate };
                await addFavorite(data);
                setIsVisible(false)
                setMatch('');
                setFate('');
                console.log("Rota adicionada com sucesso!");
            } catch (error) {
                console.log("Erro ao adicionar rota aos favoritos", error);
            }
        } else {
            handleShowModal()
        }
    }

    return (
        <View style={styles.contentContainer}>
            <Modal
                animationType="slide"
                // Determina se o modal vai preencher a visualização inteira
                transparent={true}
                visible={isVisible}
                onRequestClose={() => {
                    setIsVisible(!isVisible);
                }}
            >
                <View style={styles.modalContainer}>
                    <Text style={styles.titleBtn}> Adicione a nova rota </Text>
                    <Input
                        onChangeText={setMatch}
                        value={match}
                        placeholder="Digite seu ponto de partida"
                    />
                    <Input
                        onChangeText={setFate}
                        value={fate}
                        placeholder="Digite seu ponto de chegada"
                    />
                    <Pressable
                        style={styles.modalBtn}

                        onPress={addNewRoute}/*função para adicionar dados no banco firestore */
                    >
                        <Text style={styles.titleBtn}> Adicionar </Text>
                    <CustonModal
                        visible={modalVisible}
                        onClose={handleCloseModal}
                        closeText="OK"
                        modalText="Preencha todos os campos"
                    />
                    </Pressable>
                </View>
            </Modal>
            <Pressable
                style={styles.openModal}
                onPress={() => { setIsVisible(true) }}
            >
                <Text style={styles.titleBtn}> Adicionar Rota   📝</Text>
            </Pressable>
        </View>
    )
}

export default AddFavorite

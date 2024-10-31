import React, { useEffect, useState } from "react";
import { addFavorite, RmButton, viewFavorite } from "@/data/firebase";
import { Modal, Pressable, Text, View } from "react-native";
import { styles } from './styles'
import { Input } from "@/Components/Atomo/TextInput";
import { CustonModal } from "../alert";
import { AddButton } from "@/Components/Atomo/addButton";
import Field from "@/Components/molecula/Fields";
import { FieldValue } from "firebase/firestore";


export const AddFavorite = () => {

    const [isVisible, setIsVisible] = useState(false)
    const [match, setMatch] = useState('')
    const [fate, setFate] = useState('')
    const [modalVisible, setModalVisible] = useState(false)
    const [routes, setRoutes] = useState([])

    const handleShowModal = () => {
        setModalVisible(true)
    }

    const handleCloseModal = () => {
        setModalVisible(false)
    }

    useEffect(() => {
        const unsubscribe = viewFavorite((favorites) => {
            setRoutes(favorites);
        });

        return () => unsubscribe();
    }, []);


    const addNewRoute = async () => {
        if (match && fate) {
            try {
                const data = { Match: match, Fate: fate };
                await addFavorite(data);
                setMatch('')
                setFate('')
                console.log("Rota adicionada com sucesso!");
            } catch (error) {
                console.log("Erro ao adicionar rota aos favoritos", error);
            }
        } else {
            handleShowModal()
        }
    }
    const remolveButton = async (id) => {
        try {
            await RmButton(id);
            setRoutes((prevRoutes) => prevRoutes.filter((route) => route.id !== id));
            console.log("Rota removida com sucesso")
        }catch (error){
            console.log("Erro ao deletar a rota", error)
        }
    };

    return (
        <View style={styles.contentContainer}>
            <Modal
                animationType="slide"
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
                        onPress={addNewRoute}
                    >
                        <Text style={styles.titleBtn}> Adicionar </Text>
                    </Pressable>
                    <CustonModal
                        visible={modalVisible}
                        onClose={handleCloseModal}
                        closeText="OK"
                        modalText="Preencha todos os campos"
                    />
                </View>
            </Modal>
            <AddButton
                routes={routes}
                onRemove={remolveButton}
            />
            <Pressable
                style={styles.openModal}
                onPress={() => { setIsVisible(true) }}
            >
                <Text style={styles.titleBtn}> Adicionar Rota   📝</Text>
            </Pressable>
        </View>
    )
}

export default AddFavorite;

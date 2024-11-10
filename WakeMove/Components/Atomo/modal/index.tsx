import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles"

interface ModalProps {
    visible: boolean
    children: React.ReactNode
    navigation: any
    caminho: any,
    onConfirm: () => void
}

export const NewModal = ({ visible, children, navigation, caminho, onConfirm }: ModalProps) => {
    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={visible}
            onRequestClose={() => { }}
        >
            <View style={styles.custonModal}>
                <Text style={styles.title}>{children}</Text>
                <View style={styles.contentModal}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate(caminho)}
                        style={styles.btn}>
                        <Text>Cancelar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={onConfirm}
                        style={styles.btn}>
                        <Text>Confirmar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}
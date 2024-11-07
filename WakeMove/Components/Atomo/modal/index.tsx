import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles"

interface ModalProps {
    visible: boolean
    children: React.ReactNode
}

export const NewModal = ({ visible, children }: ModalProps) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => { }}
        >
            <View style={styles.custonModal}>
                <Text>{children}</Text>
                <TouchableOpacity onPress={() => { }}
                    style={styles.btn}> 
                    <Text>Confirmar</Text> 
                </TouchableOpacity>
            </View>
        </Modal>
    )
}
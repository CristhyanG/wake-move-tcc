import React from "react";
import { Modal, View } from "react-native";
import {styles} from "./styles"

interface ModalProps{
    visible: boolean
    children: React.ReactNode
}

export const NewModal = ({visible, children}:ModalProps) =>{
    return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={()=>{}}
            style={styles.custonModal}
        >
            <View>
                {children}
            </View>
        </Modal>
    )
}
import React from "react";
import { Alert, Modal, View, Text, Pressable } from "react-native";
import { styles } from "./styles";

interface CustonModalProps {
    visible: boolean;
    onClose: () => void;
    onShow?: () => void;
    alert?: any;
    modalText?: string;
    closeText?: string;
    children?: React.ReactNode;
}

export const CustonModal = ({ visible, onClose, onShow, alert, modalText, children, closeText }: CustonModalProps) => {
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
                onRequestClose={() => {
                    Alert.alert = alert;
                    onClose();
                }}
                onShow={onShow}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {children ? children : <Text style={styles.modalText}>{modalText}</Text>}
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={onClose}
                        >
                            <Text style={styles.textStyle}>{closeText}</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

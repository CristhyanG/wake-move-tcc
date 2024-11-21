import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";

interface ModalProps {
  visible: boolean;
  title: React.ReactNode;
  navigation: any;
  wayBack: () => void; 
  wayOut: () => void; 
}

export const NewModal: React.FC<ModalProps> = ({ visible, title, wayBack, wayOut }) => {
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={() => {}}
    >
      <View style={styles.custonModal}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.contentModal}>
          <TouchableOpacity
            onPress={wayBack}
            style={styles.btn}
          >
            <Text>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={wayOut}
            style={styles.btn}
          >
            <Text>Confirmar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

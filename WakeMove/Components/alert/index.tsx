import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {styles} from "./styles"
import { ReactNode } from 'react';

interface itensModal{
  visible: any;
  onClose: any;
  title: string;
  message: string
  children: ReactNode;
}

export const CustomAlert = ({ visible, onClose, title, message, children }: itensModal) => {
    return (
        <Modal
            transparent={true} 
            animationType="fade" 
            visible={visible} 
            onRequestClose={onClose} 
        >
          {children}
            <View style={styles.overlay}>
                <View style={styles.alertContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.message}>{message}</Text>
                    <TouchableOpacity style={styles.button} onPress={onClose}>
                        <Text style={styles.buttonText}>OK</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default CustomAlert;

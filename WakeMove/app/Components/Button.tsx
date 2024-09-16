import React from "react";
import { Button, StyleSheet, View } from "react-native";

export default function Btn(){
    return(
        <View>
            <Button style={styles.btn}/> Name <Button/>
        </View>
    );
}

const styles = StyleSheet.create({
    btn:{
        backgroundColor: " #000"
    }
})
import React from "react";
import { Text, View, SafeAreaView, TextInput, Image } from "react-native";
import { useState } from "react";
import styles from "@/app/css/styleCadastrar";

export default function Cadastar() {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const icon = require('../src/Img/iconAvatar.png');

    return (
        <SafeAreaView style={styles.contentContainer}>
            <View style={styles.contentTitle}>
                <Text style={styles.title}>Wake-Move</Text>
            </View>
            <View>
                <Image
                    source={icon}
                    style={styles.iconAvatar}
                />
            </View>
            <View>
                <Text style={styles.topic}>Email</Text>
                <TextInput
                    onChangeText={setEmail}
                    value={email}
                    style={styles.textInput}
                    placeholder="Digite seu e-mail"
                />
                <Text style={styles.topic}>Senha</Text>
                <TextInput
                    onChangeText={setPassword}
                    value={password}
                    style={styles.textInput}
                    placeholder="Digite sua senha"
                    secureTextEntry={true}
                />
            </View>
        </SafeAreaView>
    );
}
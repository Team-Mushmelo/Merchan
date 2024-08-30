// Recuperacao.js

import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Entypo, FontAwesome } from '@expo/vector-icons'; // Certifique-se de instalar os ícones corretamente
import Botao from "../../Component/Botao";

export default function Recuperacao({ navigation }) {
    return (
        <View style={styles.container}>
          
            <View style={styles.caixa1}>
                <Text style={styles.title}>Recuperar senha</Text>
                <Text style={styles.subtitle}>Escolha como gostaria de ser contatado</Text>
            </View>
            
            <View style={styles.caixa2}>
                <View style={styles.boxInput}>
                    <Entypo name='mail' size={24} color='#A481A1' style={styles.icon} />
                    <Text style={styles.inpTitulo}>Email</Text>
                    <TextInput 
                        style={styles.input} 
                        placeholder='Digite o seu email' 
                        keyboardType='email-address' 
                        autoComplete='email' 
                        placeholderTextColor='#A481A1' 
                    />
                </View>

                <View style={styles.boxInput}>
                    <FontAwesome name='phone' size={24} color='#A481A1' style={styles.icon} />
                    <Text style={styles.inpTitulo}>Telefone</Text>
                    <TextInput 
                        style={styles.input} 
                        placeholder='Digite o seu telefone' 
                        keyboardType='phone-pad' 
                        autoComplete='tel' 
                        placeholderTextColor='#A481A1' 
                    />
                </View>

                <Botao texto={'CONTINUAR'} tipo={1} onPress={() => navigation.navigate('')} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flex: 1,
        paddingHorizontal: 20,
    },
  
    caixa1: {
        flex: 2,
        justifyContent: "center",
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#40173D",
        borderBottomWidth: 2,
        borderColor: "#40173D",
        marginBottom: 10,
    },
    subtitle: {
        color: "#A481A1",
        fontSize: 16,
    },
    caixa2: {
        flex: 7,
        justifyContent: "center",
    },
    boxInput: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#A481A1",
        borderRadius: 8,
        padding: 10,
        marginVertical: 10,
    },
    icon: {
        marginRight: 10,
    },
    inpTitulo: {
        fontWeight: "bold",
        color: "#40173D",
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 40,
        color: "#40173D",
    },
    button: {
        backgroundColor: "#A90F91",
        borderRadius: 30,
        paddingVertical: 15,
        alignItems: "center",
        marginTop: 20,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
});

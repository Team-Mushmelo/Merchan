import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";


export default function Recuperacao({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.caixa1}>

                <View style={{ paddingBottom: 5, borderBottomWidth: 2, borderColor: "#40173D", height: "100%", marginRight: 10, justifyContent: "flex-end" }}>
                    <Text style={{ color: "black", fontSize: 25, fontWeight: "bold" }}>Recuperar senha</Text>
                </View>

            </View>
            <View style={styles.caixa2}>

                <View style={styles.boxInput}>
                    <Text style={styles.inpTitulo}>Email</Text>
                    <TextInput style={styles.input} placeholder='Digite o seu email' keyboardType='email-address' autoComplete='email' placeholderTextColor='#A481A1' />
                </View>
            </View>


        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flex: 1,

    },
    caixa1: {
        //backgroundColor: "blue",
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },

    caixa2: {
        backgroundColor: "blue",
        flex: 7,
    },

    text: {
        alignSelf: "center",
        margin: 10,
        marginBottom: 25,
        color: "#40173D",
        fontSize: 20,
        lineHeight: 25,
        fontWeight: "normal",
        fontFamily: "OpenSansBold"
    },

    boxInput: {

    },

    inpTitulo:{

    },
    input:{
        
    }
});
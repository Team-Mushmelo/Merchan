import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ImageBackground } from "react-native";
import Botao from "../../Component/Botao";

import { auth, firestore } from "../../services/firebaseConfig";
import { doc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from "firebase/auth";

const preferencias = [
    { id: "1", nome: "TERROR", imagem: require("../../imgs/terror.png") },
    { id: "2", nome: "SUSPENSE", imagem: require("../../imgs/suspense.png") },
    { id: "3", nome: "AVENTURA", imagem: require("../../imgs/aventura.png") },
    { id: "4", nome: "MAGIA", imagem: require("../../imgs/magia.png") },
    { id: "6", nome: "CYBERPUNK", imagem: require("../../imgs/cyberpunk.png") },
    { id: "7", nome: "FICÇÃO", imagem: require("../../imgs/ficção.jpg") },
    { id: "8", nome: "EVENTOS", imagem: require("../../imgs/evento.png") },

];

export default function Preferencias({ navigation }) {
    const [selecionadas, setSelecionadas] = useState([]);
    const [uid, setUid] = useState(null);

    //Obtém o UID do usuário
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUid(user.uid);
            } else {
                setUid(null);
            }
        });
    }, []);


    async function salvarPreferenciasNoFirestore() {
        if (!uid) return; // Se não tiver o UID do usuário, não faz nada

        const userDocRef = doc(firestore, "user", uid);
        try {
            await updateDoc(userDocRef, {
                preferencias: selecionadas, // Envia o array atual de preferências
            });
            console.log("Preferências salvas com sucesso no Firestore!");
        } catch (error) {
            console.error("Erro ao salvar preferências no Firestore: ", error);
        }
    }

    function alternarPreferencia(id) {
        if (selecionadas.includes(id)) {
            setSelecionadas(selecionadas.filter(item => item !== id));
        } else {
            setSelecionadas([...selecionadas, id]);
        }
    }

    function renderPreferencia({ item }) {
        return (
            <TouchableOpacity
                style={[
                    styles.botaoPreferencia,
                    selecionadas.includes(item.id) && styles.selecionado
                ]}
                onPress={() => alternarPreferencia(item.id)}
            >
                <ImageBackground
                    source={item.imagem}
                    style={styles.imagemFundo}
                    imageStyle={{ borderRadius: 8 }}
                    resizeMode="cover"
                >
                    <Text style={styles.textoPreferencia}>{item.nome}</Text>
                </ImageBackground>
            </TouchableOpacity>
        );
    }

    function handleContinuar() {
        salvarPreferenciasNoFirestore();
        navigation.navigate('FinalLogin');
    }


    return (
        <View style={styles.container}>
            <View style={styles.caixa1}>
                <View style={{ paddingBottom: 5, borderBottomWidth: 2, borderColor: "#40173D", height: "100%", marginRight: 10, justifyContent: "flex-end" }}>
                    <Text style={{ color: "black", fontSize: 25, fontWeight: "bold" }}>Escolha suas preferências</Text>
                </View>
            </View>
            <View style={styles.caixa2}>
                <FlatList
                    data={preferencias}
                    renderItem={renderPreferencia}
                    keyExtractor={item => item.id}
                    numColumns={2}
                    columnWrapperStyle={styles.row}
                />
            </View>
            <View style={styles.caixa3}>
                <Botao texto={"CONTINUAR"} tipo={1} onPress={handleContinuar} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#F8F8F8",
    },
    row: {
        justifyContent: "space-between",
        marginBottom: 0,
    },
    caixa1: {
        flex: 0.5,
        paddingLeft: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    caixa2: {
        flex: 6,
    },
    caixa3: {
        flex: 1.5,
        padding: 5,
    },
    botaoPreferencia: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#DCDCDC",
        borderRadius: 8,
        margin: 8,
        borderWidth: 2,
        borderColor: "transparent",
    },
    selecionado: {
        borderColor: "#800080",
    },
    textoPreferencia: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    imagemFundo: {
        width: "100%",
        height: 100,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
    },
});


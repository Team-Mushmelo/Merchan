import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ImageBackground } from "react-native";
import Botao from "../../Component/Botao";

const preferencias = [
    { id: "1", nome: "TERROR", imagem: require("../../imgs/terror.png") },
    { id: "2", nome: "SUSPENSE", imagem: require("../../imgs/suspense.png") },
    { id: "3", nome: "AVENTURA", imagem: require("../../imgs/aventura.png") },
    { id: "4", nome: "MAGIA", imagem: require("../../imgs/magia.png") },
    { id: "5", nome: "COSPLAY", imagem: require("../../imgs/cosplay.jpg") },
    { id: "6", nome: "CYBERPUNK", imagem: require("../../imgs/cyberpunk.png") },
    { id: "7", nome: "FICÇÃO", imagem: require("../../imgs/ficção.jpg") },
    { id: "8", nome: "EVENTOS", imagem: require("../../imgs/evento.png") },
    { id: "9", nome: "COOP", imagem: require("../../imgs/coop.png") },
    { id: "10", nome: "STREAM", imagem: require("../../imgs/stream.jpg") },
    { id: "11", nome: "RPG", imagem: require("../../imgs/rpg.png") },
    { id: "12", nome: "INDIES", imagem: require("../../imgs/indie.png") },
];

const Preferencias = () => {
    const [selecionadas, setSelecionadas] = useState([]);

    const alternarPreferencia = (id) => {
        if (selecionadas.includes(id)) {
            setSelecionadas(selecionadas.filter(item => item !== id));
        } else {
            setSelecionadas([...selecionadas, id]);
        }
    };

    const renderPreferencia = ({ item }) => (
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
                <Botao texto={"CONTINUAR"} tipo={1} />
            </View>

        </View>
    );
};

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
        //backgroundColor: "#ff2",
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
        borderWidth: 0, // Sem borda inicialmente
        borderColor: "transparent", // Cor da borda transparente
        borderWidth: 2,
        borderColor: "transparent",
    },
    selecionado: {
        // Largura da borda quando selecionado
        borderColor: "#800080", // Cor roxa
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

export default Preferencias;
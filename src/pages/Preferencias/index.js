import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const preferencias = [
    { id: '1', nome: 'TERROR' },
    { id: '2', nome: 'SUSPENSE' },
    { id: '3', nome: 'AVENTURA' },
    { id: '4', nome: 'MAGIA' },
    { id: '5', nome: 'COSPLAY' },
    { id: '6', nome: 'CYBERPUNK' },
    { id: '7', nome: 'FICÇÃO' },
    { id: '8', nome: 'EVENTOS' },
    { id: '9', nome: 'COOP' },
    { id: '10', nome: 'STREAM' },
    { id: '11', nome: 'RPG' },
    { id: '12', nome: 'JOGOS INDIES' },
];

const TelaPreferencias = () => {
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
            <Text style={styles.textoPreferencia}>{item.nome}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.caixa1}>
                <View style={{ paddingBottom: 5, borderBottomWidth: 2, borderColor: "#40173D", height: "100%", marginRight: 10, justifyContent: "flex-end" }}>
                    <Text style={{ color: "black", fontSize: 25, fontWeight: "bold" }}>Escolha suas preferências</Text>
                </View>

            </View>
            <FlatList
                data={preferencias}
                renderItem={renderPreferencia}
                keyExtractor={item => item.id}
                numColumns={2}
                columnWrapperStyle={styles.row}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#F8F8F8',
    },

    row: {
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    caixa1: {
        flex: 1,
        paddingLeft: 10,
        justifyContent: "center",
        alignItems: "center",

    },

    caixa2: {
        backgroundColor: "#ff2",
        flex: 6,
    },
    botaoPreferencia: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#DCDCDC',
        borderRadius: 8,
        padding: 16,
        margin: 4,
        borderWidth: 0, // Sem borda inicialmente
        borderColor: 'transparent', // Cor da borda transparente
    },
    selecionado: {
        borderWidth: 2, // Largura da borda quando selecionado
        borderColor: '#800080', // Cor roxa
    },
    textoPreferencia: {
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center',
    },

});

export default TelaPreferencias;
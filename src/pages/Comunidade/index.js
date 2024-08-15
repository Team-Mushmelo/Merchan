import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

export default function Comunidade() {
    const [feed, setFeed] = useState([
        { id: '1', nome: 'xxxxx', idade: 23, email: 'xxxxx@etec.sp.gov.br' },
        { id: '2', nome: 'xxxxx', idade: 15, email: 'xxxxx@etec.sp.gov.br' },
        { id: '3', nome: 'xxxxx', idade: 19, email: 'xxxxx@etec.sp.gov.br' },
        { id: '4', nome: 'xxxxx', idade: 50, email: 'xxxxx@etec.sp.gov.br' },
        { id: '5', nome: 'xxxxx', idade: 35, email: 'xxxxx@etec.sp.gov.br' },
    ]);

    return (
        <View style={styles.container}>
            <FlatList
                data={feed}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <Dados data={item} />}
            />
        </View>
    );
}

function Dados({ data }) {
    return (
        <View style={styles.areaDados}>
            <Text style={styles.textoDados}>ID: {data.id}</Text>
            <Text style={styles.textoDados}>Nome: {data.nome}</Text>
            <Text style={styles.textoDados}>Idade: {data.idade}</Text>
            <Text style={styles.textoDados}>E-mail: {data.email}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    areaDados: {
        backgroundColor: '#222',
        height: 200,
        marginBottom: 15,
        padding: 10,
    },
    textoDados: {
        color: '#fff',
        fontSize: 20,
        padding: 5,
    },
});

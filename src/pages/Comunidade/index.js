import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';

export default function Comunidade() {
    const [items1, setItems1] = useState([]);

    const [items2, setItems2] = useState([
        { id: '1', color: '#bf0cb1' },
        { id: '2', color: '#bf0cb1' },
        { id: '3', color: '#bf0cb1' },
        { id: '4', color: '#bf0cb1' },
        { id: '5', color: '#bf0cb1' },
    ]);

    const [feed, setFeed] = useState([
        { id: '1', nome: 'xxxxx' },
        { id: '2', nome: 'xxxxx' },
        { id: '3', nome: 'xxxxx' },
        { id: '4', nome: 'xxxxx' },
        { id: '5', nome: 'xxxxx' },
        { id: '6', nome: 'xxxxx' },
        { id: '7', nome: 'xxxxx' },
        { id: '8', nome: 'xxxxx' },
        { id: '9', nome: 'xxxxx' },
        { id: '10', nome: 'xxxxx' },
    ]);

    const renderItem = ({ item }) => (
        <View style={[styles.carouselItem, { backgroundColor: item.color }]} />
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Suspense</Text>
            <View style={styles.carouselContainer}>
                <View style={styles.carouselWrapper}>
                    <FlatList
                        data={items2}
                        keyExtractor={(item) => item.id}
                        horizontal
                        renderItem={renderItem}
                        contentContainerStyle={styles.flatListContent}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            </View>

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
            <Text style={styles.textoDados}>{data.nome}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    areaDados: {
        margin: 15,
        backgroundColor: '#ebe8e2',
        height: 100,
        marginBottom: 5,
        borderRadius: 25,
        padding: 10,
        width: 'auto',
        borderWidth: 1,
        borderColor: '#40173d',
    },
    textoDados: {
        color: '#40173d',
        fontSize: 20,
        padding: 5,
    },
    carouselContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    carouselWrapper: {
        flex: 1,
        margin: 10,
        paddingHorizontal: 0,
        width: '100%',
    },
    flatListContent: {
        alignItems: 'center',
    },
    title: {
        fontSize: 14,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 0,
        borderBottomWidth: 0.5,
        borderBottomColor: '#ebe8e2',
        fontFamily: 'OpenSansRegular',
    },
    carouselItem: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginHorizontal: 5,
    },
});

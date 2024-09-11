import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, FlatList, Text, ScrollView, Button } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Carousel from '../Components/carrossel';



export default function Foru({ navigation }) {
    // Estados iniciais para as seções com imagens
    const [items1, setItems1] = useState([
        { id: '1', color: '#bf0cb1' },
        { id: '2', color: '#bf0cb1' },
        { id: '3', color: '#bf0cb1' },
        { id: '4', color: '#bf0cb1' },
        { id: '5', color: '#bf0cb1' },
    ]);
    const [items2, setItems2] = useState([]);
    const [items3, setItems3] = useState([]);
    const [items4, setItems4] = useState([]);
    const [items5, setItems5] = useState([]);
    const [items6, setItems6] = useState([]);

    // Função para selecionar uma imagem
    const pickImage = (setItems) => {
        launchImageLibrary({ mediaType: 'photo', quality: 1 }, response => {
            if (response.didCancel) {
                console.log('Usuário cancelou a seleção');
            } else if (response.errorCode) {
                Alert.alert('Erro', response.errorMessage);
            } else {
                const newItem = {
                    id: (new Date()).toISOString(), // Use um ID único
                    uri: response.assets[0].uri,
                };
                setItems(prevItems => [...prevItems, newItem]);
            }
        });
    };

    // Renderiza um item na FlatList
    const renderItem = ({ item }) => (
        <View style={[styles.square, { backgroundColor: item.color }]} />
    );

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollViewContent}>

            {/* Botão para navegação */}
            <TouchableOpacity
                style={styles.exploreButton}
                onPress={() => navigation.navigate('Explorar')}
            >
                <Text style={styles.exploreButtonText}>Ir para Explorar</Text>
            </TouchableOpacity>

            {/* Seção 1 */}
            <Text style={styles.title}>Exemplo</Text>
            <View style={styles.carouselContainer}>
                <View style={styles.carouselWrapper}>
                    <FlatList
                        data={items1}
                        keyExtractor={(item) => item.id}
                        horizontal
                        renderItem={renderItem}
                        contentContainerStyle={styles.flatListContent}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            </View>

            {/* Seção 2 */}
            <Text style={styles.title}>Exemplo</Text>
            <View style={styles.carouselContainer}>
                <View style={styles.floatingButtonWrapper}>
                    <TouchableOpacity
                        style={styles.floatingButton}
                        onPress={() => pickImage(setItems2)}
                    >
                        <Icon name="add" size={25} color="#fff" />
                    </TouchableOpacity>
                </View>
                <View style={styles.carouselWrapper}>
                    <Carousel items={items2} />
                </View>
            </View>

            {/* Seção 3 */} 
            <Text style={styles.title}>Exemplo</Text>
            <View style={styles.carouselContainer}>
                <View style={styles.floatingButtonWrapper}>
                    <TouchableOpacity
                        style={styles.floatingButton}
                        onPress={() => pickImage(setItems3)}
                    >
                        <Icon name="add" size={25} color="#fff" />
                    </TouchableOpacity>
                </View>
                <View style={styles.carouselWrapper}>
                    <Carousel items={items3} />
                </View>
            </View>

            {/* Seção 4 */}
            <Text style={styles.title}>Exemplo</Text>
            <View style={styles.carouselContainer}>
                <View style={styles.floatingButtonWrapper}>
                    <TouchableOpacity
                        style={styles.floatingButton}
                        onPress={() => pickImage(setItems4)}
                    >
                        <Icon name="add" size={25} color="#fff" />
                    </TouchableOpacity>
                </View>
                <View style={styles.carouselWrapper}>
                    <Carousel items={items4} />
                </View>
            </View>

            {/* Seção 5 */}
            <Text style={styles.title}>Exemplo</Text>
            <View style={styles.carouselContainer}>
                <View style={styles.floatingButtonWrapper}>
                    <TouchableOpacity
                        style={styles.floatingButton}
                        onPress={() => pickImage(setItems5)}
                    >
                        <Icon name="add" size={25} color="#fff" />
                    </TouchableOpacity>
                </View>
                <View style={styles.carouselWrapper}>
                    <Carousel items={items5} />
                </View>
            </View>

            {/* Seção 6 */}
            <Text style={styles.title}>Exemplo</Text>
            <View style={styles.carouselContainer}>
                <View style={styles.floatingButtonWrapper}>
                    <TouchableOpacity
                        style={styles.floatingButton}
                        onPress={() => pickImage(setItems6)}
                    >
                        <Icon name="add" size={25} color="#fff" />
                    </TouchableOpacity>
                </View>
                <View style={styles.carouselWrapper}>
                    <Carousel items={items6} />
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 0,
    },
    scrollViewContent: {
        flexGrow: 1,
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

    
    exploreButton: {
        backgroundColor: '#fff',
        padding: 15,
        borderWidth: 1,
        borderColor: '#40173d',
        borderRadius: 27,
        alignItems: 'right',
        marginBottom: 20,
    },
    exploreButtonText: {
        color: '#40173d',
        fontSize: 16,
    },

    carouselContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    floatingButtonWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        margin: 10,
        paddingLeft: 10,
    },
    floatingButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 90,
        height: 50,
        backgroundColor: '#bf0cb1',
        borderRadius: 50,
        shadowColor: '#000',
        padding: 10,
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
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
    square: {
        width: 100,
        height: 70,
        marginLeft: 5,
        borderRadius: 25,
    },
});

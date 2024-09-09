import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, FlatList, Text, ScrollView, Button, Image } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Carousel from '../Components/carrossel'; // Certifique-se de que o caminho está correto

export default function Explorar({ navigation }) {
    // Estados iniciais para cada seção com imagens
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
    const [items7, setItems7] = useState([]);
    const [items8, setItems8] = useState([]);
    const [items9, setItems9] = useState([]);
    const [items10, setItems10] = useState([]);
    const [items11, setItems11] = useState([]);
    const [items12, setItems12] = useState([]);

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
        <View style={[styles.square, { backgroundColor: item.color }]}>
            {item.uri && <Image source={{ uri: item.uri }} style={styles.image} />}
        </View>
    );

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollViewContent}>
            <Button
                title="Ir para For You"
                onPress={() => navigation.navigate('Foru')}
            />

            {/* Seção Terror */}
            <Text style={styles.title}>Terror</Text>
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

            {/* Seção Suspense */}
            <Text style={styles.title}>Suspense</Text>
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

            {/* Seção Aventura */}
            <Text style={styles.title}>Aventura</Text>
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

            {/* Seção Mágica */}
            <Text style={styles.title}>Mágica</Text>
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

            {/* Seção Cosplay */}
            <Text style={styles.title}>Cosplay</Text>
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

            {/* Seção Cyberpunk */}
            <Text style={styles.title}>Cyberpunk</Text>
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

            {/* Seção Ficção */}
            <Text style={styles.title}>Ficção</Text>
            <View style={styles.carouselContainer}>
                <View style={styles.floatingButtonWrapper}>
                    <TouchableOpacity
                        style={styles.floatingButton}
                        onPress={() => pickImage(setItems7)}
                    >
                        <Icon name="add" size={25} color="#fff" />
                    </TouchableOpacity>
                </View>
                <View style={styles.carouselWrapper}>
                    <Carousel items={items7} />
                </View>
            </View>

            {/* Seção Coop */}
            <Text style={styles.title}>Coop</Text>
            <View style={styles.carouselContainer}>
                <View style={styles.floatingButtonWrapper}>
                    <TouchableOpacity
                        style={styles.floatingButton}
                        onPress={() => pickImage(setItems8)}
                    >
                        <Icon name="add" size={25} color="#fff" />
                    </TouchableOpacity>
                </View>
                <View style={styles.carouselWrapper}>
                    <Carousel items={items8} />
                </View>
            </View>

            {/* Seção Eventos */}
            <Text style={styles.title}>Eventos</Text>
            <View style={styles.carouselContainer}>
                <View style={styles.floatingButtonWrapper}>
                    <TouchableOpacity
                        style={styles.floatingButton}
                        onPress={() => pickImage(setItems9)}
                    >
                        <Icon name="add" size={25} color="#fff" />
                    </TouchableOpacity>
                </View>
                <View style={styles.carouselWrapper}>
                    <Carousel items={items9} />
                </View>
            </View>

            {/* Seção Stream */}
            <Text style={styles.title}>Stream</Text>
            <View style={styles.carouselContainer}>
                <View style={styles.floatingButtonWrapper}>
                    <TouchableOpacity
                        style={styles.floatingButton}
                        onPress={() => pickImage(setItems10)}
                    >
                        <Icon name="add" size={25} color="#fff" />
                    </TouchableOpacity>
                </View>
                <View style={styles.carouselWrapper}>
                    <Carousel items={items10} />
                </View>
            </View>

            {/* Seção RPG */}
            <Text style={styles.title}>RPG</Text>
            <View style={styles.carouselContainer}>
                <View style={styles.floatingButtonWrapper}>
                    <TouchableOpacity
                        style={styles.floatingButton}
                        onPress={() => pickImage(setItems11)}
                    >
                        <Icon name="add" size={25} color="#fff" />
                    </TouchableOpacity>
                </View>
                <View style={styles.carouselWrapper}>
                    <Carousel items={items11} />
                </View>
            </View>

            {/* Seção Jogos Indies */}
            <Text style={styles.title}>Jogos Indies</Text>
            <View style={styles.carouselContainer}>
                <View style={styles.floatingButtonWrapper}>
                    <TouchableOpacity
                        style={styles.floatingButton}
                        onPress={() => pickImage(setItems12)}
                    >
                        <Icon name="add" size={25} color="#fff" />
                    </TouchableOpacity>
                </View>
                <View style={styles.carouselWrapper}>
                    <Carousel items={items12} />
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 25,
    },
});

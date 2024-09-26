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
    const [items2, setItems2] = useState([
        { id: '1', color: '#bf0cb1' },
        { id: '2', color: '#bf0cb1' },
        { id: '3', color: '#bf0cb1' },
        { id: '4', color: '#bf0cb1' },
        { id: '5', color: '#bf0cb1' },
    ]);
   
    const [items3, setItems3] = useState([
        { id: '1', color: '#bf0cb1' },
        { id: '2', color: '#bf0cb1' },
        { id: '3', color: '#bf0cb1' },
        { id: '4', color: '#bf0cb1' },
        { id: '5', color: '#bf0cb1' },
    ]);

    const [items4, setItems4] = useState([
        { id: '1', color: '#bf0cb1' },
        { id: '2', color: '#bf0cb1' },
        { id: '3', color: '#bf0cb1' },
        { id: '4', color: '#bf0cb1' },
        { id: '5', color: '#bf0cb1' },
    ]);

    const [items5, setItems5] = useState([
        { id: '1', color: '#bf0cb1' },
        { id: '2', color: '#bf0cb1' },
        { id: '3', color: '#bf0cb1' },
        { id: '4', color: '#bf0cb1' },
        { id: '5', color: '#bf0cb1' },
    ]);
   
    const [items6, setItems6] = useState([
        { id: '1', color: '#bf0cb1' },
        { id: '2', color: '#bf0cb1' },
        { id: '3', color: '#bf0cb1' },
        { id: '4', color: '#bf0cb1' },
        { id: '5', color: '#bf0cb1' },
    ]);

    const [items7, setItems7] = useState([
        { id: '1', color: '#bf0cb1' },
        { id: '2', color: '#bf0cb1' },
        { id: '3', color: '#bf0cb1' },
        { id: '4', color: '#bf0cb1' },
        { id: '5', color: '#bf0cb1' },
    ]);
    
    const [items8, setItems8] = useState([
        { id: '1', color: '#bf0cb1' },
        { id: '2', color: '#bf0cb1' },
        { id: '3', color: '#bf0cb1' },
        { id: '4', color: '#bf0cb1' },
        { id: '5', color: '#bf0cb1' },
    ]);
    
    const [items9, setItems9] = useState([
        { id: '1', color: '#bf0cb1' },
        { id: '2', color: '#bf0cb1' },
        { id: '3', color: '#bf0cb1' },
        { id: '4', color: '#bf0cb1' },
        { id: '5', color: '#bf0cb1' },
    ]);
    
    const [items10, setItems10] = useState([
        { id: '1', color: '#bf0cb1' },
        { id: '2', color: '#bf0cb1' },
        { id: '3', color: '#bf0cb1' },
        { id: '4', color: '#bf0cb1' },
        { id: '5', color: '#bf0cb1' },
    ]);

    const [items11, setItems11] = useState([
        { id: '1', color: '#bf0cb1' },
        { id: '2', color: '#bf0cb1' },
        { id: '3', color: '#bf0cb1' },
        { id: '4', color: '#bf0cb1' },
        { id: '5', color: '#bf0cb1' },
    ]);
    
    const [items12, setItems12] = useState([
        { id: '1', color: '#bf0cb1' },
        { id: '2', color: '#bf0cb1' },
        { id: '3', color: '#bf0cb1' },
        { id: '4', color: '#bf0cb1' },
        { id: '5', color: '#bf0cb1' },
    ]);

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
             {/* Botão para navegação */}
 <View style={{flexDirection: 'row', display:'flex', alignItems: 'center', marginLeft: 15,}}>
   
 <TouchableOpacity
                style={styles.exploreButton}
                onPress={() => navigation.navigate('For you')}
            >
                <Text style={styles.exploreButtonText}>For you</Text>
            </TouchableOpacity>
            <View style={styles.exploreButtonact}>
 <Text style={styles.exploreButtonTextact}>Explorar</Text>
 </View>
</View>

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

            {/* Seção Aventura */}
            <Text style={styles.title}>Aventura</Text>
            <View style={styles.carouselContainer}>
                <View style={styles.carouselWrapper}>
                    <FlatList
                        data={items3}
                        keyExtractor={(item) => item.id}
                        horizontal
                        renderItem={renderItem}
                        contentContainerStyle={styles.flatListContent}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            </View>

            {/* Seção Mágica */}
            <Text style={styles.title}>Mágica</Text>
            <View style={styles.carouselContainer}>
                <View style={styles.carouselWrapper}>
                    <FlatList
                        data={items4}
                        keyExtractor={(item) => item.id}
                        horizontal
                        renderItem={renderItem}
                        contentContainerStyle={styles.flatListContent}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            </View>

            {/* Seção Cosplay */}
            <Text style={styles.title}>Cosplay</Text>
            <View style={styles.carouselContainer}>
                <View style={styles.carouselWrapper}>
                    <FlatList
                        data={items5}
                        keyExtractor={(item) => item.id}
                        horizontal
                        renderItem={renderItem}
                        contentContainerStyle={styles.flatListContent}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            </View>

            {/* Seção Cyberpunk */}
            <Text style={styles.title}>Cyberpunk</Text>
            <View style={styles.carouselContainer}>
                <View style={styles.carouselWrapper}>
                    <FlatList
                        data={items6}
                        keyExtractor={(item) => item.id}
                        horizontal
                        renderItem={renderItem}
                        contentContainerStyle={styles.flatListContent}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            </View>

            {/* Seção Ficção */}
            <Text style={styles.title}>Ficção</Text>
            <View style={styles.carouselContainer}>
                <View style={styles.carouselWrapper}>
                    <FlatList
                        data={items7}
                        keyExtractor={(item) => item.id}
                        horizontal
                        renderItem={renderItem}
                        contentContainerStyle={styles.flatListContent}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            </View>

            {/* Seção Coop */}
            <Text style={styles.title}>Coop</Text>
            <View style={styles.carouselContainer}>
                <View style={styles.carouselWrapper}>
                    <FlatList
                        data={items8}
                        keyExtractor={(item) => item.id}
                        horizontal
                        renderItem={renderItem}
                        contentContainerStyle={styles.flatListContent}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            </View>

            {/* Seção Eventos */}
            <Text style={styles.title}>Eventos</Text>
            <View style={styles.carouselContainer}>
                <View style={styles.carouselWrapper}>
                    <FlatList
                        data={items9}
                        keyExtractor={(item) => item.id}
                        horizontal
                        renderItem={renderItem}
                        contentContainerStyle={styles.flatListContent}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            </View>

            {/* Seção Stream */}
            <Text style={styles.title}>Stream</Text>
            <View style={styles.carouselContainer}>
                <View style={styles.carouselWrapper}>
                    <FlatList
                        data={items10}
                        keyExtractor={(item) => item.id}
                        horizontal
                        renderItem={renderItem}
                        contentContainerStyle={styles.flatListContent}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            </View>

            {/* Seção RPG */}
            <Text style={styles.title}>RPG</Text>
            <View style={styles.carouselContainer}>
                <View style={styles.carouselWrapper}>
                    <FlatList
                        data={items11}
                        keyExtractor={(item) => item.id}
                        horizontal
                        renderItem={renderItem}
                        contentContainerStyle={styles.flatListContent}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            </View>

            {/* Seção Jogos Indies */}
            <Text style={styles.title}>Jogos Indies</Text>
            <View style={styles.carouselContainer}>
                <View style={styles.carouselWrapper}>
                    <FlatList
                        data={items12}
                        keyExtractor={(item) => item.id}
                        horizontal
                        renderItem={renderItem}
                        contentContainerStyle={styles.flatListContent}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({

    exploreButtonact: {
        backgroundColor: '#40173d',
        padding: 15,
        borderWidth: 1,
        borderColor: '#40173d',
        borderRadius: 27,
        alignItems: 'right',
        marginBottom: 20,
        marginRight: 10,
        width: '25%',
    },
    exploreButtonTextact: {
        color: '#fff',
        fontSize: 12,
    },
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
    exploreButton: {
        backgroundColor: '#fff',
        padding: 15,
        borderWidth: 1,
        borderColor: '#40173d',
        borderRadius: 27,
        alignItems: 'right',
        marginBottom: 20,
        marginRight: 10,
        width: '25%'
    },
    exploreButtonText: {
        color: '#40173d',
        fontSize: 12,
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

import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Image, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker'; // Importando react-native-image-picker
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

export default function Home() {
    const [items, setItems] = useState([]);

    const pickImage = () => {
        launchImageLibrary({ mediaType: 'photo', quality: 1 }, response => {
            if (response.didCancel) {
                console.log('Usuário cancelou a seleção');
            } else if (response.errorCode) {
                Alert.alert('Erro', response.errorMessage);
            } else {
                const newItem = {
                    id: (items.length + 1).toString(),
                    type: 'image',
                    uri: response.assets[0].uri,
                };
                setItems([...items, newItem]);
            }
        });
    };

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Image source={{ uri: item.uri }} style={styles.image} />
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.carouselWrapper}>
                <FlatList
                    data={items}
                    keyExtractor={(item) => item.id}
                    horizontal
                    renderItem={renderItem}
                    contentContainerStyle={styles.flatListContent}
                    showsHorizontalScrollIndicator={false}
                />  
            <TouchableOpacity style={styles.floatingButton} onPress={pickImage}>
                <Icon name="add" size={30} color="#fff" />
            </TouchableOpacity>
            </View>
          
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    carouselWrapper: {
        marginTop: 10, // Ajuste para não sobrepor o botão flutuante
        paddingHorizontal: 10,
        width: '100%',
    },
    flatListContent: {
        alignItems: 'center',
    },
    itemContainer: {
        backgroundColor: '#e2dada',
        height: 100,
        borderRadius: 15,
        width: width * 0.4,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 15,
    },
    floatingButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        backgroundColor: '#bf0cb1',
        borderRadius: 50,
        padding: 15,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        zIndex: 1, 
        alignContent: 'center',
        justifyContent:'center'// Garante que o botão fique sobre outros elementos
    },
});

import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Carousel from './Components/Carousel'; // Ajuste o caminho conforme necessário

export default function Home() {
    const [items1, setItems1] = useState([]);
    const [items2, setItems2] = useState([]);
    const [items3, setItems3] = useState([]);
    const [items4, setItems4] = useState([]);

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

    return (
        <View style={styles.container}>
            <View style={styles.carouselContainer}>
                <Carousel items={items1} />
                <TouchableOpacity
                    style={[styles.floatingButton, { top: 20 }]} // Ajuste a posição se necessário
                    onPress={() => pickImage(setItems1)}
                >
                    <Icon name="add" size={30} color="#fff" />
                </TouchableOpacity>
            </View>

            <View style={styles.carouselContainer}>
                <Carousel items={items2} />
                <TouchableOpacity
                    style={[styles.floatingButton, { top: 100 }]} // Ajuste a posição se necessário
                    onPress={() => pickImage(setItems2)}
                >
                    <Icon name="add" size={30} color="#fff" />
                </TouchableOpacity>
            </View>

            <View style={styles.carouselContainer}>
                <Carousel items={items3} />
                <TouchableOpacity
                    style={[styles.floatingButton, { top: 180 }]} // Ajuste a posição se necessário
                    onPress={() => pickImage(setItems3)}
                >
                    <Icon name="add" size={30} color="#fff" />
                </TouchableOpacity>
            </View>

            <View style={styles.carouselContainer}>
                <Carousel items={items4} />
                <TouchableOpacity
                    style={[styles.floatingButton, { top: 260 }]} // Ajuste a posição se necessário
                    onPress={() => pickImage(setItems4)}
                >
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
    carouselContainer: {
        marginVertical: 10,
    },
    floatingButton: {
        position: 'absolute',
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
    },
});

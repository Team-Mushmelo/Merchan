// Carousel.js
import React from 'react';
import { View, StyleSheet, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Certifique-se de que este pacote está instalado

const { width } = Dimensions.get('window');

const Carousel = ({ items }) => {
    const [favorites, setFavorites] = React.useState([]);

    // Função para alternar o status de favorito
    const handleFavoritePress = (itemId) => {
        setFavorites((prevFavorites) =>
            prevFavorites.includes(itemId)
                ? prevFavorites.filter((id) => id !== itemId) // Remove dos favoritos
                : [...prevFavorites, itemId] // Adiciona aos favoritos
        );
    };

    // Renderiza cada item do carrossel
    const renderItem = ({ item }) => {
        const isFavorited = favorites.includes(item.id);

        return (
            <View style={styles.itemContainer}>
                <Image source={{ uri: item.uri }} style={styles.image} />
                <FavoriteIcon
                    item={item}
                    isFavorited={isFavorited}
                    onFavoritePress={handleFavoritePress}
                />
            </View>
        );
    };

    // Renderiza o ícone de favorito
    const FavoriteIcon = ({ item, isFavorited, onFavoritePress }) => {
        const iconName = isFavorited ? 'star' : 'star-outline';
        return (
            <TouchableOpacity
                style={styles.favoriteIcon}
                onPress={() => onFavoritePress(item.id)}
            >
                <Icon name={iconName} size={24} color="gold" />
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.carouselWrapper}>
            <FlatList
                data={items}
                keyExtractor={(item) => item.id.toString()} // Garante que item.id seja uma string
                horizontal
                renderItem={renderItem}
                contentContainerStyle={styles.flatListContent}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    carouselWrapper: {
        margin: 10,
        paddingHorizontal: 15,
        width: '100%',
    },
    flatListContent: {
        alignItems: 'center',
    },
    itemContainer: {
        backgroundColor: '#e2dada',
        height: 200, // Define uma altura fixa para as imagens
        marginLeft: 10,
        borderRadius: 15,
        width: width * 0.8, // Define a largura como uma fração da largura da tela
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 10, // Adiciona um padding na parte inferior para o ícone
    },
    image: {
        width: '100%',
        height: '80%', // Ajusta a altura da imagem para caber dentro do itemContainer
        borderRadius: 15,
    },
    favoriteIcon: {
        marginTop: 10, // Espaço entre a imagem e o ícone
    },
});

export default Carousel;

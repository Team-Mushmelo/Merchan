// Carousel.js
import React from 'react';
import { View, StyleSheet, FlatList, Image, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const Carousel = ({ items }) => {
    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Image source={{ uri: item.uri }} style={styles.image} />
        </View>
    );

    return (
        <View style={styles.carouselWrapper}>
            <FlatList
                data={items}
                keyExtractor={(item) => item.id}
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
        marginTop: 10,
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
});

export default Carousel;

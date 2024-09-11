import React from 'react';
import { View, FlatList, Image, StyleSheet } from 'react-native';

const Carousel = ({ items }) => {
    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Image source={{ uri: item.uri }} style={styles.image} />
        </View>
    );

    return (
        <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.flatListContent}
        />
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        marginVertical: 5,
        alignItems: 'center',
    },
    image: {
        width: 300,
        height: 300,
        borderRadius: 10,
    },
    flatListContent: {
        alignItems: 'center',
    },
});

export default Carousel;

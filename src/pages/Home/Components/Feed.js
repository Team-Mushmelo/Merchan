import React, { useState, useEffect } from 'react';
import { View, FlatList, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from '../services/services';
import { auth, db } from '../services/services';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Carousel = ({ items, fetchPosts, setSelectedPostId }) => {
    const [posts, setPosts] = useState(items);

    useEffect(() => {
        setPosts(items);
    }, [items]);

    const renderItem = ({ item }) => {
        const postSavedBy = item.savedBy || [];
        const likesCount = item.likes?.length || 0;
        const userLiked = item.likes?.includes(auth.currentUser.uid);
        const userSaved = postSavedBy.includes(auth.currentUser.uid);

        return (
            <View style={styles.itemContainer}>
                <Image source={{ uri: item.uri }} style={styles.image} />
                <Text style={styles.postContent}>{item.content}</Text>
                <Text style={styles.postTimestamp}>{item.timestamp?.toDate().toLocaleString()}</Text>
                <View style={styles.postActions}>
                    <TouchableOpacity style={styles.icones} onPress={() => setSelectedPostId(item.id)}>
                        <Ionicons name="chatbubble-outline" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.icones}
                        onPress={() => handleLike(item, userLiked)}
                    >
                        <FontAwesome 
                            name={userLiked ? "heart" : "heart-o"} 
                            size={24} 
                            color={userLiked ? "red" : "red"} 
                        />
                        <Text style={styles.likeCount}>{likesCount}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.icones}
                        onPress={() => handleSavePost(item.id, userSaved)} // Passa o estado do salvamento
                    >
                        <Ionicons 
                            name={userSaved ? "bookmark" : "bookmark-outline"} 
                            size={24} 
                            color="yellow" 
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    const handleSavePost = async (postId, userSaved) => {
        const userId = auth.currentUser.uid;
        const userRef = doc(db, 'users', userId);
        const postRef = doc(db, 'posts', postId);

        // Atualiza o estado local imediatamente
        setPosts(prevPosts => 
            prevPosts.map(post => 
                post.id === postId 
                    ? { ...post, savedBy: userSaved ? post.savedBy.filter(uid => uid !== userId) : [...(post.savedBy || []), userId] } 
                    : post
            )
        );

        try {
            if (userSaved) {
                await updateDoc(postRef, { savedBy: arrayRemove(userId) });
                await updateDoc(userRef, { savedPosts: arrayRemove(postId) });
            } else {
                await updateDoc(postRef, { savedBy: arrayUnion(userId) });
                await updateDoc(userRef, { savedPosts: arrayUnion(postId) });
            }

            fetchPosts();
        } catch (error) {
            console.error('Erro ao salvar o post:', error);
        }
    };

    const handleLike = async (item, userLiked) => {
        const userId = auth.currentUser.uid;
        const postRef = doc(db, 'posts', item.id);

        // Atualiza o estado local imediatamente
        const newLikes = userLiked 
            ? item.likes.filter(uid => uid !== userId) 
            : [...(item.likes || []), userId];

        setPosts(prevPosts => 
            prevPosts.map(post => 
                post.id === item.id 
                    ? { ...post, likes: newLikes } 
                    : post
            )
        );

        try {
            await updateDoc(postRef, {
                likes: userLiked ? arrayRemove(userId) : arrayUnion(userId)
            });

            fetchPosts();
        } catch (error) {
            console.error('Erro ao curtir o post:', error);
        }
    };

    return (
        <View>
            <FlatList
                data={posts}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.flatListContent}
            />
        </View>
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
    postContent: {
        // Adicione estilos para o conteúdo do post
    },
    postTimestamp: {
        // Adicione estilos para a timestamp do post
    },
    postActions: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    icones: {
        marginHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    likeCount: {
        marginLeft: 5,
    },
});

export default Carousel;

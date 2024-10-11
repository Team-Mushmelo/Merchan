import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Text, ScrollView } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Carousel from '../Components/Feed';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getFirestore, collection, addDoc, getDocs, updateDoc, arrayUnion, arrayRemove, doc } from 'firebase/firestore';
import { auth } from '../../../services/firebaseConfig';

export default function Foru({ navigation }) {
    const [items, setItems] = useState([]);
    const db = getFirestore();

    useEffect(() => {
        const fetchPosts = async () => {
            const querySnapshot = await getDocs(collection(db, 'posts'));
            const posts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setItems(posts);
        };

        fetchPosts();
    }, []);

    const pickImage = async () => {
        const response = await launchImageLibrary({ mediaType: 'photo', quality: 1 });

        if (response.didCancel) {
            console.log('Usuário cancelou a seleção');
        } else if (response.errorCode) {
            Alert.alert('Erro', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
            const newItem = {
                id: new Date().toISOString(),
                uri: response.assets[0].uri,
                email: auth.currentUser?.email,
                content: '', // Se necessário, adicione uma descrição padrão ou outro conteúdo
                likes: [],
            };

            try {
                await addDoc(collection(db, 'posts'), newItem);
                setItems(prevItems => [newItem, ...prevItems]); // Adiciona o novo post no topo
            } catch (error) {
                console.error('Erro ao adicionar post:', error);
            }
        }
    };

    const handleLike = async (postId) => {
        if (!auth.currentUser) {
            Alert.alert('Erro', 'Você precisa estar logado para curtir um post.');
            return;
        }

        const userId = auth.currentUser.uid;
        const postRef = doc(db, 'posts', postId);
        const post = items.find(item => item.id === postId);
        const userLiked = post.likes?.includes(userId);

        try {
            await updateDoc(postRef, {
                likes: userLiked ? arrayRemove(userId) : arrayUnion(userId),
            });
            setItems(prevPosts =>
                prevPosts.map(post =>
                    post.id === postId
                        ? { ...post, likes: userLiked ? post.likes.filter(uid => uid !== userId) : [...(post.likes || []), userId] }
                        : post
                )
            );
        } catch (error) {
            console.error('Erro ao curtir o post:', error);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.header}>
                    <View style={styles.activeButton}>
                        <Text style={styles.activeButtonText}>For you</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.exploreButton}
                        onPress={() => navigation.navigate('Explorar')}
                    >
                        <Text style={styles.exploreButtonText}>Explorar</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.carouselContainer}>
                    {items.length > 0 ? (
                        <Carousel 
                            items={items}
                            onLike={handleLike}
                        />
                    ) : (
                        <View style={styles.noPostsContainer}>
                            <Icon name="ghost" size={50} color="#40173d" />
                            <Text style={styles.noPostsText}>Não há posts ainda.</Text>
                        </View>
                    )}
                </View>
            </ScrollView>

            <TouchableOpacity
                style={styles.floatingButton}
                onPress={pickImage}
            >
                <Icon name="plus" size={25} color="#fff" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 15,
        marginBottom: 20,
    },
    activeButton: {
        backgroundColor: '#40173d',
        padding: 15,
        borderRadius: 27,
        marginRight: 10,
        width: '25%',
    },
    activeButtonText: {
        color: '#fff',
        fontSize: 12,
    },
    exploreButton: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 27,
        marginRight: 10,
        width: '25%',
    },
    exploreButtonText: {
        color: '#40173d',
        fontSize: 12,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    carouselContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    floatingButton: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        width: 50,
        height: 50,
        backgroundColor: '#bf0cb1',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },
    noPostsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    noPostsText: {
        fontSize: 18,
        color: '#40173d',
    },
});

import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, Text, StyleSheet } from 'react-native';
import { getFirestore, collection, query, where, onSnapshot } from 'firebase/firestore';
import { auth } from '../../services/firebaseConfig';


const UserLikes = () => {
    const [likedPosts, setLikedPosts] = useState([]);
    const db = getFirestore();

    useEffect(() => {
        const fetchLikedPosts = () => {
            const userId = auth.currentUser.uid;
            const q = query(collection(db, 'posts'), where('likes', 'array-contains', userId));

            const unsubscribe = onSnapshot(q, (snapshot) => {
                const posts = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setLikedPosts(posts);
            });

            return () => unsubscribe();
        };

        fetchLikedPosts();
    }, [db]);

    const renderPost = ({ item }) => (
        <View style={styles.postContainer}>
            <Image source={{ uri: item.uri }} style={styles.postImage} />
            <Text style={styles.postText}>{item.content || 'Sem descrição'}</Text>
            <Text style={styles.likesCount}>{item.likes.length} Likes</Text> {/* Exibe a contagem de likes */}
        </View>
    );

    return (
        <FlatList
            data={likedPosts}
            renderItem={renderPost}
            keyExtractor={(item) => item.id}
            numColumns={3}
            columnWrapperStyle={styles.columnWrapper}
            showsVerticalScrollIndicator={false}
        />
    );
};

const styles = StyleSheet.create({
    postContainer: {
        flex: 1,
        margin: 5,
        borderRadius: 10,
        backgroundColor: '#fff',
        elevation: 3,
        overflow: 'hidden',
        aspectRatio: 1,
        position: 'relative', // Para permitir o posicionamento do texto de likes
    },
    postImage: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    postText: {
        padding: 5,
        textAlign: 'center',
    },
    likesCount: {
        position: 'absolute',
        bottom: 5,
        left: 5,
        color: '#888',
        fontSize: 12,
    },
    columnWrapper: {
        justifyContent: 'space-between',
    },
});

export default UserLikes;

// UserPosts.js
import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, Text, StyleSheet } from 'react-native';
import { getFirestore, collection, query, where, onSnapshot } from 'firebase/firestore';
import { auth } from '../../services/firebaseConfig';

const UserPosts = () => {
    const [userPosts, setUserPosts] = useState([]);
    const db = getFirestore();

    useEffect(() => {
        const fetchUserPosts = async () => {
            const postsRef = collection(db, 'posts');
            const q = query(postsRef, where('email', '==', auth.currentUser.email));

            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const posts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setUserPosts(posts);
            });

            return () => unsubscribe();
        };

        fetchUserPosts();
    }, [db]);

    const renderPost = ({ item }) => (
        <View style={styles.postContainer}>
            <Image source={{ uri: item.uri }} style={styles.postImage} />
            <Text style={styles.postText}>{item.content || 'Sem descrição'}</Text>
        </View>
    );

    return (
        <FlatList
            data={userPosts}
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
    columnWrapper: {
        justifyContent: 'space-between',
    },
});

export default UserPosts;

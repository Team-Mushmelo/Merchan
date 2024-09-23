import React, { useState, useEffect } from 'react';
import { View, FlatList, Image, StyleSheet, Text, TouchableOpacity, TextInput, Modal, ScrollView } from 'react-native';
import { getFirestore, doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { auth } from '../../../services/firebaseConfig';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

const Feed = ({ items }) => {
    const [posts, setPosts] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState(null);
    const [newComment, setNewComment] = useState('');
    const firebase = getFirestore();

    useEffect(() => {
        if (items) {
            setPosts(items);
        }
    }, [items]);

    const renderItem = ({ item }) => {
        const likesCount = item.likes?.length || 0;
        const userLiked = item.likes?.includes(auth.currentUser.uid);
        const userSaved = item.savedBy?.includes(auth.currentUser.uid);

        return (
            <View style={styles.itemContainer}>
                <View style={styles.header}>
                    {item.userProfilePic ? (
                        <Image source={{ uri: item.userProfilePic }} style={styles.profilePic} />
                    ) : (
                        <FontAwesome name="user" size={40} color="#40173d" style={styles.profilePic} />
                    )}
                    <Text style={styles.postAuthor}>{item.authorName}</Text>
                </View>
                <Image source={{ uri: item.uri }} style={styles.image} />
                <Text style={styles.postContent}>{item.content || 'Sem descrição'}</Text>
                <Text style={styles.postTimestamp}>{item.timestamp?.toDate().toLocaleString()}</Text>
                <View style={styles.postActions}>
                    <TouchableOpacity
                        style={styles.icones}
                        onPress={() => {
                            setSelectedPostId(item.id);
                            setModalVisible(true);
                        }}
                    >
                        <Ionicons name="chatbubble-outline" size={24} color="black" />
                    </TouchableOpacity>
                    <View style={styles.rightIcons}>
                        <TouchableOpacity
                            style={styles.icones}
                            onPress={() => handleLike(item, userLiked)}
                        >
                            <FontAwesome 
                                name={userLiked ? "heart" : "heart-o"} 
                                size={24} 
                                color={userLiked ? "red" : "black"} 
                            />
                            <Text style={styles.likeCount}>{likesCount}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.icones}
                            onPress={() => handleSavePost(item.id, userSaved)}
                        >
                            <Ionicons 
                                name={userSaved ? "bookmark" : "bookmark-outline"} 
                                size={24} 
                                color="yellow" 
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                {modalVisible && selectedPostId === item.id && (
                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(false)}
                    >
                        <View style={styles.modalContainer}>
                            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                                <Ionicons name="close" size={30} color="black" />
                            </TouchableOpacity>
                            <ScrollView contentContainerStyle={styles.commentList}>
                                {item.comments?.map((comment, index) => (
                                    <Text key={index} style={styles.comment}>{comment}</Text>
                                ))}
                            </ScrollView>
                            <View style={styles.commentInputContainer}>
                                <TextInput
                                    style={styles.commentInput}
                                    placeholder="Adicionar um comentário..."
                                    value={newComment}
                                    onChangeText={setNewComment}
                                />
                                <TouchableOpacity
                                    style={styles.commentButton}
                                    onPress={() => {
                                        handleAddComment(item.id);
                                    }}
                                >
                                    <Text style={styles.commentButtonText}>Comentar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                )}
            </View>
        );
    };

    const handleAddComment = async (postId) => {
        if (!newComment.trim()) return;

        const postRef = doc(firebase, 'posts', postId);
        setPosts(prevPosts => 
            prevPosts.map(post => 
                post.id === postId 
                    ? { ...post, comments: [...(post.comments || []), newComment] } 
                    : post
            )
        );

        try {
            await updateDoc(postRef, {
                comments: arrayUnion(newComment)
            });
            setNewComment('');
        } catch (error) {
            console.error('Erro ao adicionar comentário:', error);
        }
    };

    const handleSavePost = async (postId, userSaved) => {
        const userId = auth.currentUser.uid;
        const postRef = doc(firebase, 'posts', postId);

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
            } else {
                await updateDoc(postRef, { savedBy: arrayUnion(userId) });
            }
        } catch (error) {
            console.error('Erro ao salvar o post:', error);
        }
    };

    const handleLike = async (item, userLiked) => {
        const userId = auth.currentUser.uid;
        const postRef = doc(firebase, 'posts', item.id);

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
        width: '100%',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        padding: 10,
    },
    profilePic: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    postAuthor: {
        fontWeight: 'bold',
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
        padding: 10,
    },
    postTimestamp: {
        color: '#999',
    },
    postActions: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 10,
        marginTop: 10,
    },
    rightIcons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icones: {
        marginHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    likeCount: {
        marginLeft: 5,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
    },
    commentList: {
        flexGrow: 1,
        padding: 20,
    },
    comment: {
        marginVertical: 5,
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    commentInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    commentInput: {
        flex: 1,
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    commentButton: {
        backgroundColor: '#0095f6',
        borderRadius: 5,
        padding: 10,
        marginLeft: 10,
    },
    commentButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    closeButton: {
        alignSelf: 'flex-end',
        marginBottom: 10,
    },
});

export default Feed;

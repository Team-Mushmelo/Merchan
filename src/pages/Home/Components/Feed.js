import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  ScrollView,
} from 'react-native';
import {
  getFirestore,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  deleteDoc,
  onSnapshot,
  collection,
  addDoc,
} from 'firebase/firestore';
import { auth } from '../../../services/firebaseConfig';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const [descriptionModalVisible, setDescriptionModalVisible] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);

  const firebase = getFirestore();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(firebase, 'posts'), (snapshot) => {
      const updatedPosts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      updatedPosts.sort((a, b) => b.timestamp - a.timestamp);
      setPosts(updatedPosts);
    });
    return () => unsubscribe();
  }, [firebase]);

  const handleAddComment = async (postId) => {
    if (!newComment.trim()) return;

    const postRef = doc(firebase, 'posts', postId);
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, comments: [...(post.comments || []), newComment] }
          : post
      )
    );

    try {
      await updateDoc(postRef, {
        comments: arrayUnion(newComment),
      });
      setNewComment('');
    } catch (error) {
      console.error('Erro ao adicionar comentário:', error);
    }
  };

  const handleLike = async (item) => {
    const userId = auth.currentUser.uid;
    const postRef = doc(firebase, 'posts', item.id);
    const userLiked = item.likes?.includes(userId);

    const newLikes = userLiked
      ? item.likes.filter((uid) => uid !== userId)
      : [...(item.likes || []), userId];

    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === item.id ? { ...post, likes: newLikes } : post
      )
    );

    try {
      await updateDoc(postRef, {
        likes: userLiked ? arrayRemove(userId) : arrayUnion(userId),
      });
    } catch (error) {
      console.error('Erro ao curtir o post:', error);
    }
  };

  const handleSavePost = async (postId, userSaved) => {
    const userId = auth.currentUser.uid;
    const postRef = doc(firebase, 'posts', postId);

    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              savedBy: userSaved
                ? post.savedBy.filter((uid) => uid !== userId)
                : [...(post.savedBy || []), userId],
            }
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
      console.error('Erro ao favoritar o post:', error);
    }
  };

  const renderItem = ({ item }) => {
    const likesCount = item.likes?.length || 0;
    const userLiked = item.likes?.includes(auth.currentUser.uid);
    const userSaved = item.savedBy?.includes(auth.currentUser.uid);

    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          setSelectedPost(item);
          setDescriptionModalVisible(true);
        }}
      >
        <View style={styles.header}>
          {item.userProfilePic ? (
            <Image source={{ uri: item.userProfilePic }} style={styles.profilePic} />
          ) : (
            <FontAwesome name="user" size={40} color="#40173d" style={styles.profilePic} />
          )}
          <Text style={styles.postAuthor}>{item.authorName}</Text>
        </View>
        {item.uri && <Image source={{ uri: item.uri }} style={styles.image} />}
        <Text style={styles.postContent}>{item.content || 'Sem descrição'}</Text>
        <Text style={styles.postTimestamp}>{item.timestamp?.toDate().toLocaleString()}</Text>
        <View style={styles.postActions}>
          <TouchableOpacity
            onPress={() => {
              setSelectedPostId(item.id);
              setCommentModalVisible(true);
            }}
          >
            <Ionicons name="chatbubble-outline" size={24} color="#40173d" />
          </TouchableOpacity>
          <View style={styles.rightIcons}>
            <TouchableOpacity onPress={() => handleLike(item)}>
              <FontAwesome
                name={userLiked ? 'heart' : 'heart-o'}
                size={24}
                color={userLiked ? 'red' : '#40173d'}
              />
              <Text style={styles.likeCount}>{likesCount}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSavePost(item.id, userSaved)}>
              <Ionicons
                name={userSaved ? 'bookmark' : 'bookmark-outline'}
                size={24}
                color="yellow"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSelectedPostId(item.id);
                setNewDescription(item.content || '');
                setDescriptionModalVisible(true);
              }}
            >
              <Ionicons name="create-outline" size={24} color="#40173d" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeletePost(item.id)}>
              <Ionicons name="trash-outline" size={24} color="red" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        numColumns={2} // Exibir posts em duas colunas
      />

      {/* Modal para exibir post selecionado */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={descriptionModalVisible && selectedPost}
        onRequestClose={() => setDescriptionModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.postDetailModal}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setDescriptionModalVisible(false)}>
              <Ionicons name="close" size={30} color="#40173d" />
            </TouchableOpacity>
            {selectedPost?.uri && (
              <Image source={{ uri: selectedPost.uri }} style={styles.modalImage} />
            )}
            <Text style={styles.modalPostContent}>{selectedPost?.content}</Text>
            <Text style={styles.modalPostTimestamp}>{selectedPost?.timestamp?.toDate().toLocaleString()}</Text>
          </View>
        </View>
      </Modal>

      {/* Modal para Comentários */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={commentModalVisible && selectedPostId}
        onRequestClose={() => setCommentModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.commentModal}>
            <TouchableOpacity style={styles.backButton} onPress={() => setCommentModalVisible(false)}>
              <Ionicons name="chevron-back" size={24} color="#40173d" />
            </TouchableOpacity>
            <ScrollView contentContainerStyle={styles.commentList}>
              {posts.find(post => post.id === selectedPostId)?.comments?.map((comment, index) => (
                <Text key={index} style={styles.comment}>{comment}</Text>
              ))}
            </ScrollView>
            <View style={styles.commentInputContainer}>
              <TextInput
                style={styles.commentInput}
                placeholder="Adicionar comentário..."
                value={newComment}
                onChangeText={setNewComment}
              />
              <TouchableOpacity onPress={() => handleAddComment(selectedPostId)}>
                <Ionicons name="send" size={24} color="#40173d" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#ffffff',
  },
  itemContainer: {
    flex: 1,
    margin: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
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
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  postContent: {
    marginBottom: 10,
  },
  postTimestamp: {
    fontSize: 12,
    color: '#888',
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeCount: {
    marginLeft: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  postDetailModal: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  modalImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  modalPostContent: {
    marginBottom: 10,
  },
  modalPostTimestamp: {
    fontSize: 12,
    color: '#888',
  },
  commentModal: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
  },
  commentList: {
    maxHeight: 300,
    marginBottom: 10,
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  sendButton: {
    marginLeft: 10,
  },
  comment: {
    marginVertical: 5,
    color: '#333',
  },
});

export default Feed;

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
  const [selectedImage, setSelectedImage] = useState(null);

  const firebase = getFirestore();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(firebase, 'posts'), (snapshot) => {
      const updatedPosts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Ordenar os posts por timestamp, do mais recente para o mais antigo
      updatedPosts.sort((a, b) => b.timestamp - a.timestamp);
      setPosts(updatedPosts);
    });

    return () => unsubscribe();
  }, [firebase]);

  // Função para adicionar um novo post
  const handleAddPost = async (newPost) => {
    try {
      const docRef = await addDoc(collection(firebase, 'posts'), newPost);
      // Adiciona o novo post ao início do estado local
      setPosts(prevPosts => [{ id: docRef.id, ...newPost }, ...prevPosts]);
    } catch (error) {
      console.error('Erro ao adicionar post:', error);
    }
  };

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

  const handleUpdateDescription = async (postId) => {
    if (!newDescription.trim()) return;

    const postRef = doc(firebase, 'posts', postId);
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, content: newDescription } : post
      )
    );

    try {
      await updateDoc(postRef, {
        content: newDescription,
      });
      setNewDescription('');
      setDescriptionModalVisible(false);
    } catch (error) {
      console.error('Erro ao atualizar descrição:', error);
    }
  };

  const handleDeletePost = async (postId) => {
    const postRef = doc(firebase, 'posts', postId);

    try {
      await deleteDoc(postRef);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error('Erro ao excluir o post:', error);
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
      <View style={styles.itemContainer}>
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
            style={styles.icones}
            onPress={() => {
              setSelectedPostId(item.id);
              setCommentModalVisible(true);
            }}
          >
            <Ionicons name="chatbubble-outline" size={24} color="#40173d" />
          </TouchableOpacity>
          <View style={styles.rightIcons}>
            <TouchableOpacity
              style={styles.icones}
              onPress={() => handleLike(item)}
            >
              <FontAwesome
                name={userLiked ? 'heart' : 'heart-o'}
                size={24}
                color={userLiked ? 'red' : '#40173d'}
              />
              <Text style={styles.likeCount}>{likesCount}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.icones}
              onPress={() => handleSavePost(item.id, userSaved)}
            >
              <Ionicons
                name={userSaved ? 'bookmark' : 'bookmark-outline'}
                size={24}
                color="yellow"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.icones}
              onPress={() => {
                setSelectedPostId(item.id);
                setNewDescription(item.content || '');
                setDescriptionModalVisible(true);
              }}
            >
              <Ionicons name="create-outline" size={24} color="#40173d" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.icones}
              onPress={() => handleDeletePost(item.id)}
            >
              <Ionicons name="trash-outline" size={24} color="red" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Modal para Comentários */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={commentModalVisible && selectedPostId === item.id}
          onRequestClose={() => setCommentModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.commentModal}>
              <TouchableOpacity style={styles.backButton} onPress={() => setCommentModalVisible(false)}>
                <Ionicons name="chevron-back" size={24} color="#40173d" />
              </TouchableOpacity>
              <ScrollView contentContainerStyle={styles.commentList}>
                {item.comments?.map((comment, index) => (
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
                <TouchableOpacity style={styles.sendButton} onPress={() => handleAddComment(item.id)}>
                  <Ionicons name="send" size={24} color="#40173d" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }} // Adicionado para evitar sobreposição de conteúdo
      />

      {/* Modal para Atualizar Descrição */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={descriptionModalVisible}
        onRequestClose={() => setDescriptionModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.descriptionModal}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setDescriptionModalVisible(false)}>
              <Ionicons name="close" size={30} color="#40173d" />
            </TouchableOpacity>
            <TextInput
              style={styles.descriptionInput}
              placeholder="Atualize a descrição..."
              value={newDescription}
              onChangeText={setNewDescription}
              multiline
              numberOfLines={4}
            />
            <TouchableOpacity
              style={styles.updateButton}
              onPress={() => handleUpdateDescription(selectedPostId)}
            >
              <Text style={styles.updateButtonText}>Atualizar Descrição</Text>
            </TouchableOpacity>
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
    marginBottom: 15,
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
    height: 200,
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
  icones: {
    marginRight: 10,
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
  commentModal: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
  descriptionModal: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  descriptionInput: {
    height: 100,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  updateButton: {
    backgroundColor: '#40173d',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  updateButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  comment: {
    marginVertical: 5,
    color: '#333',
  },
});

export default Feed;

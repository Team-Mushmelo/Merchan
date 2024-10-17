import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { auth } from '../../../services/firebaseConfig';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFonts, Bungee_400Regular } from '@expo-google-fonts/bungee';

const GIPHY_API_KEY = 'YOUR_GIPHY_API_KEY'; // Substitua pela sua chave da Giphy

export default function App() {
  const [inputText, setInputText] = useState('');
  const [posts, setPosts] = useState([]);
  const [gifUrl, setGifUrl] = useState('');
  const [username, setUsername] = useState('');
  const [commentInput, setCommentInput] = useState('');
  const [fontsLoaded] = useFonts({ BungeeRegular: Bungee_400Regular });

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUsername(user.email);
    }
  }, []);

  const handlePost = () => {
    if (inputText || gifUrl) {
      const newPost = {
        id: Date.now().toString(),
        text: inputText,
        gif: gifUrl,
        likes: 0,
        user: username,
        likedBy: [],
        comments: [],
      };
      setPosts(prevPosts => [newPost, ...prevPosts]);
      setInputText('');
      setGifUrl('');
    }
  };

  const handleLike = (id) => {
    setPosts(prevPosts => prevPosts.map(post => {
      if (post.id === id) {
        const liked = post.likedBy.includes(username);
        return {
          ...post,
          likes: liked ? post.likes - 1 : post.likes + 1,
          likedBy: liked ? post.likedBy.filter(user => user !== username) : [...post.likedBy, username],
        };
      }
      return post;
    }));
  };

  const handleComment = (id) => {
    if (commentInput.trim()) {
      setPosts(prevPosts => prevPosts.map(post => {
        if (post.id === id) {
          return {
            ...post,
            comments: [...post.comments, { user: username, text: commentInput, likes: 0, likedBy: [] }],
          };
        }
        return post;
      }));
      setCommentInput('');
    }
  };

  const handleCommentLike = (postId, commentIndex) => {
    setPosts(prevPosts => prevPosts.map(post => {
      if (post.id === postId) {
        const comment = post.comments[commentIndex];
        const liked = comment.likedBy.includes(username);
        const updatedComments = post.comments.map((c, index) => {
          if (index === commentIndex) {
            return {
              ...c,
              likes: liked ? c.likes - 1 : c.likes + 1,
              likedBy: liked ? c.likedBy.filter(user => user !== username) : [...c.likedBy, username],
            };
          }
          return c;
        });
        return { ...post, comments: updatedComments };
      }
      return post;
    }));
  };

  const handleDeletePost = (id) => {
    setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
  };

  const pickGif = () => {
    launchImageLibrary({ mediaType: 'photo', includeBase64: true }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.error('ImagePicker Error: ', response.error);
      } else {
        const uri = response.assets[0].uri;
        setGifUrl(uri);
      }
    });
  };

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#40173d" style={{ flex: 1 }} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mini Feed</Text>
      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.post}>
            <View style={styles.postHeader}>
              <Text style={styles.username}>{item.user}</Text>
              {item.user === username && (
                <TouchableOpacity onPress={() => handleDeletePost(item.id)}>
                  <Icon name="trash" size={20} color="#bf0cb1" />
                </TouchableOpacity>
              )}
            </View>
            {item.gif ? <Image source={{ uri: item.gif }} style={styles.gif} /> : null}
            <Text style={styles.postText}>{item.text}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.roundButton} onPress={() => handleLike(item.id)}>
                <Icon name={item.likedBy.includes(username) ? 'heart' : 'heart-o'} size={25} color="#bf0cb1" />
                <Text style={styles.roundButtonText}> {item.likes}</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={item.comments}
              keyExtractor={(comment, index) => index.toString()}
              renderItem={({ item: comment, index }) => (
                <View style={styles.commentContainer}>
                  <Text style={styles.comment}>
                    <Text style={styles.commentUser}>{comment.user}: </Text>
                    <Text style={styles.commentText}>{comment.text}</Text>
                  </Text>
                  <View style={styles.commentButtons}>
                    <TouchableOpacity onPress={() => handleCommentLike(item.id, index)}>
                      <Icon name={comment.likedBy.includes(username) ? 'heart' : 'heart-o'} size={15} color="#bf0cb1" />
                      <Text style={styles.commentLikeText}> {comment.likes}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
            <TextInput
              style={styles.commentInput}
              placeholder="Escreva um comentário..."
              placeholderTextColor="#40173d"
              value={commentInput}
              onChangeText={setCommentInput}
            />
            <TouchableOpacity style={styles.commentButton} onPress={() => handleComment(item.id)}>
              <Text style={styles.commentButtonText}>Comentar</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Aqui está a parte inferior com os inputs e botões */}
      {gifUrl && <Image source={{ uri: gifUrl }} style={styles.gif} />} {/* Exibe a imagem GIF selecionada */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="O que está acontecendo?"
          placeholderTextColor="#40173d"
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity style={styles.gifButton} onPress={pickGif}>
          <Icon name="image" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.postButton} onPress={handlePost}>
          <Icon name="paper-plane" size={20} color="#fff" /> {/* Substituindo texto por ícone */}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'BungeeRegular',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#40173d',
    marginBottom: 20,
  },
  inputContainer: {
    outlineWidth: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    outlineWidth: 0,
    flex: 1,
    height: 50,
    borderColor: '#bf0cb1',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    marginRight: 10,
  },
  gif: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginVertical: 10,
  },
  gifButton: {
    backgroundColor: '#bf0cb1',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 15,
    height: 50, // Altura fixa para igualar
    width: 50,  // Largura fixa para igualar
    alignItems: 'center',
    justifyContent: 'center',
  },
  postButton: {
    backgroundColor: '#bf0cb1',
    borderRadius: 25,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50, // Altura fixa para igualar
    width: 50,  // Largura fixa para igualar
    marginLeft: 10,
  },
  postButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  post: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  username: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#40173d',
    marginBottom: 5,
  },
  postText: {
    fontSize: 16,
    color: '#40173d',
    marginBottom: 10,
  },
  roundButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 15,
    elevation: 1,
  },
  roundButtonText: {
    color: '#40173d',
    fontSize: 16,
    marginLeft: 5,
  },
  commentContainer: {
    outlineWidth: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  comment: {
    outlineWidth: 0,
    fontSize: 14,
    color: '#40173d',
    marginLeft: 10,
  },
  commentUser: {
    outlineWidth: 0,
    color: '#b0b0b0',
    fontWeight: 'bold',
  },
  commentText: {
    outlineWidth: 0,
    color: '#40173d',
  },
  commentButtons: {
    outlineWidth: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentLikeText: {
    outlineWidth: 0,
    fontSize: 14,
    color: '#40173d',
  },
  commentInput: {
    outlineWidth: 0,
    height: 40,
    borderColor: '#bf0cb1',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    marginVertical: 10,
  },
  commentButton: {
    backgroundColor: '#bf0cb1',
    borderRadius: 25,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50, // Altura fixa para igualar
    width: 100,  // Largura fixa para igualar
    marginVertical: 10,
  },
  commentButtonText: {
    color: '#fff',
  },
});


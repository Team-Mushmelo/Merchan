import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Alert, Image, Dimensions, ScrollView, FlatList } from 'react-native';
import { Entypo, Feather } from '@expo/vector-icons';
import { launchImageLibrary } from 'react-native-image-picker';
import { getFirestore, collection, query, where, onSnapshot, updateDoc, doc, getDoc } from 'firebase/firestore';
import { auth } from '../Home/services/services';

const { width } = Dimensions.get('window');

const Tab = ({ title, onPress, active }) => (
    <TouchableOpacity style={[styles.tab, active && styles.activeTab]} onPress={onPress}>
        <Text style={styles.tabText}>{title}</Text>
    </TouchableOpacity>
);

export default function Perfil() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');
    const [gender, setGender] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [activeTab, setActiveTab] = useState('posts');
    const [userPosts, setUserPosts] = useState([]);
    const db = getFirestore();

    useEffect(() => {
        const userEmail = auth.currentUser?.email;

        if (userEmail) {
            fetchUserPosts();
            fetchUserData();
        }
    }, []);

    const fetchUserPosts = async () => {
        const postsRef = collection(db, 'posts');
        const q = query(postsRef, where('email', '==', auth.currentUser.email));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const posts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setUserPosts(posts);
        });

        return () => unsubscribe();
    };

    const fetchUserData = async () => {
        const userDoc = doc(db, 'users', auth.currentUser.uid);
        const userSnap = await getDoc(userDoc);
        if (userSnap.exists()) {
            const userData = userSnap.data();
            setName(userData.name || '');
            setEmail(userData.email || '');
            setDescription(userData.description || '');
            setGender(userData.gender || '');
            setProfileImage(userData.profileImage || ''); // Carrega a imagem do Firestore
        }
    };

    const handleSave = async () => {
        if (!name || !email || !description || !gender) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }
        
        const userDoc = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(userDoc, {
            name,
            email,
            description,
            gender,
            profileImage,
        });

        Alert.alert('Perfil Atualizado', 'Seu perfil foi atualizado com sucesso.');
    };

    const pickImage = async () => {
        const options = {
            mediaType: 'photo',
            quality: 1,
            selectionLimit: 1,
            includeBase64: false,
        };

        launchImageLibrary(options, async (response) => {
            if (response.didCancel) {
                console.log('Usuário cancelou a seleção de imagem');
            } else if (response.errorCode) {
                console.error('Erro ao selecionar a imagem:', response.errorMessage);
            } else {
                const uri = response.assets[0].uri;
                setProfileImage(uri);

                // Atualiza a imagem de perfil no Firestore
                const userDoc = doc(db, 'users', auth.currentUser.uid);
                await updateDoc(userDoc, {
                    profileImage: uri,
                });
            }
        });
    };

    const renderPost = ({ item }) => (
        <View style={styles.postContainer}>
            <Image source={{ uri: item.uri }} style={styles.postImage} />
            <Text style={styles.postText}>{item.content || 'Sem descrição'}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.formContainer}>
                    <TouchableOpacity style={styles.profileImageContainer} onPress={pickImage}>
                        {profileImage ? (
                            <Image source={{ uri: profileImage }} style={styles.profileImage} />
                        ) : (
                            <Feather name="user" size={60} color="#40173d" />
                        )}
                    </TouchableOpacity>

                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                        placeholder="Digite seu apelido"
                    />
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Digite seu e-mail"
                        keyboardType="email-address"
                    />
                    <TextInput
                        style={styles.input}
                        value={gender}
                        onChangeText={setGender}
                        placeholder="Digite seu gênero"
                    />
                    <TextInput
                        style={styles.input}
                        value={description}
                        onChangeText={setDescription}
                        placeholder="Digite uma descrição"
                    />
                    <TouchableOpacity style={styles.button} onPress={handleSave}>
                        <Entypo name="pencil" size={25} color="#40173d" />
                    </TouchableOpacity>
                </View>

                <View style={styles.tabsContainer}>
                    <Tab title="Posts" onPress={() => setActiveTab('posts')} active={activeTab === 'posts'} />
                    <Tab title="Curtidas" onPress={() => setActiveTab('likes')} active={activeTab === 'likes'} />
                    <Tab title="Favoritados" onPress={() => setActiveTab('favorites')} active={activeTab === 'favorites'} />
                </View>

                <View style={styles.contentContainer}>
                    {activeTab === 'posts' && (
                        <FlatList
                            data={userPosts}
                            renderItem={renderPost}
                            keyExtractor={(item) => item.id}
                            numColumns={3}
                            columnWrapperStyle={styles.columnWrapper}
                            showsVerticalScrollIndicator={false}
                        />
                    )}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    profileImageContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 2,
        borderColor: '#40173d',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ebe8e2',
        marginBottom: 20,
    },
    profileImage: {
        width: '100%',
        height: '100%',
        borderRadius: 60,
    },
    formContainer: {
        backgroundColor: '#ebe8e2',
        borderRadius: 20,
        padding: 30,
        width: '100%',
        marginBottom: 20,
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginBottom: 20,
        paddingHorizontal: 10,
        height: 50,
        fontSize: 16,
        width: '100%',
    },
    button: {
        padding: 15,
        borderRadius: 50,
        alignItems: 'center',
        backgroundColor: '#ffffff',
        marginTop: 10,
    },
    tabsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
    },
    tab: {
        padding: 10,
        flex: 1,
        alignItems: 'center',
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: '#40173d',
    },
    tabText: {
        fontSize: 18,
        color: '#40173d',
    },
    contentContainer: {
        padding: 10,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        width: '100%',
    },
    scrollViewContent: {
        flexGrow: 1,
    },
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

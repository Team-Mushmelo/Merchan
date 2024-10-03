import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Alert, Image, Dimensions, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { launchImageLibrary } from 'react-native-image-picker';
import { auth, fetchUserData, updateUserData } from '../../services/firebaseConfig'; // Atualizar com as funções corretas
import UserPosts from './usepost'; // Certifique-se de que o caminho esteja correto
import UserLikes from './uselike'; // Certifique-se de que o caminho esteja correto

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
    const db = getFirestore();

    useEffect(() => {
        const fetchUserData = async () => {
            const userDoc = doc(db, 'users', auth.currentUser.uid);
            const userSnap = await getDoc(userDoc);
            if (userSnap.exists()) {
                const userData = userSnap.data();
                setName(userData.name || '');
                setEmail(userData.email || '');
                setDescription(userData.description || '');
                setGender(userData.gender || '');
                setProfileImage(userData.profileImage || '');
            }
        };

        fetchUserDataAsync();
    }, []);

    const handleSave = async () => {
        if (!name || !email || !description || !gender) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }

        try {
            await updateUserData(auth.currentUser.uid, {
                name,
                email,
                description,
                gender,
                profileImage,
            });
            Alert.alert('Perfil Atualizado', 'Seu perfil foi atualizado com sucesso.');
        } catch (error) {
            console.error(error);
            Alert.alert('Erro', 'Não foi possível atualizar seu perfil.');
        }
    };

    const pickImage = () => {
        launchImageLibrary({ mediaType: 'photo', quality: 1, selectionLimit: 1 }, (response) => {
            if (response.didCancel) {
                console.log('Usuário cancelou a seleção de imagem');
            } else if (response.errorCode) {
                console.error('Erro ao selecionar a imagem:', response.errorMessage);
            } else {
                const uri = response.assets[0].uri;
                setProfileImage(uri);
            }
        });
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.profileContainer}>
                    <TouchableOpacity style={styles.profileImageContainer} onPress={pickImage}>
                        {profileImage ? (
                            <Image source={{ uri: profileImage }} style={styles.profileImage} />
                        ) : (
                            <Feather name="user" size={60} color="#fff" />
                        )}
                    </TouchableOpacity>

                    <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Digite seu nome" />
                    <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Digite seu e-mail" keyboardType="email-address" />
                    <TextInput style={styles.input} value={gender} onChangeText={setGender} placeholder="Digite seu gênero" />
                    <TextInput style={styles.input} value={description} onChangeText={setDescription} placeholder="Digite uma descrição" />

                    <TouchableOpacity style={styles.button} onPress={handleSave}>
                        <Text style={styles.buttonText}>Salvar</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.tabsContainer}>
                    <Tab title="Posts" onPress={() => setActiveTab('posts')} active={activeTab === 'posts'} />
                    <Tab title="Curtidas" onPress={() => setActiveTab('likes')} active={activeTab === 'likes'} />
                </View>

                <View style={styles.contentContainer}>
                    {activeTab === 'posts' && <UserPosts />}
                    {activeTab === 'likes' && <UserLikes />}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    profileContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 20,
        elevation: 2,
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImageContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: '#40173d',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#40173d',
        marginBottom: 20,
    },
    profileImage: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginBottom: 15,
        paddingHorizontal: 10,
        height: 50,
        fontSize: 16,
        width: '100%',
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
    },
    button: {
        padding: 15,
        borderRadius: 50,
        alignItems: 'center',
        backgroundColor: '#40173d',
        marginTop: 10,
        width: '100%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    tabsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
    },
    tab: {
        padding: 10,
        flex: 1,
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    activeTab: {
        borderBottomColor: '#40173d',
    },
    tabText: {
        fontSize: 16,
        color: '#40173d',
    },
    contentContainer: {
        padding: 10,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        elevation: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
});

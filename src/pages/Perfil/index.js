import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Alert, Image, Dimensions, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { launchImageLibrary } from 'react-native-image-picker';
import { auth, fetchUserData, updateUserData } from '../../services/firebaseConfig';

const { width } = Dimensions.get('window');

export default function Perfil() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');
    const [gender, setGender] = useState('');
    const [profileImage, setProfileImage] = useState(null);

    useEffect(() => {
        const fetchUserDataAsync = async () => {
            const userData = await fetchUserData(auth.currentUser.uid);
            if (userData) {
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

                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                        placeholder="Digite seu nome"
                        placeholderTextColor="#40173d"
                        autoCapitalize="words"
                    />
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Digite seu e-mail"
                        keyboardType="email-address"
                        placeholderTextColor="#40173d"
                    />
                    <TextInput
                        style={styles.input}
                        value={gender}
                        onChangeText={setGender}
                        placeholder="Digite seus pronomes"
                        placeholderTextColor="#40173d"
                    />
                    <TextInput
                        style={styles.input}
                        value={description}
                        onChangeText={setDescription}
                        placeholder="Descrição"
                        placeholderTextColor="#40173d"
                    />

                    <TouchableOpacity style={styles.button} onPress={handleSave}>
                        <Text style={styles.buttonText}>Salvar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'center', // Centraliza verticalmente
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center', // Centraliza verticalmente
        alignItems: 'center', // Centraliza horizontalmente
    },
    profileContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 20,
        elevation: 2,
        alignItems: 'center',
        marginBottom: 20,
        width: '100%', // Garante que o formulário ocupe a largura total
        maxWidth: 400, // Define uma largura máxima
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
        outlineWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: '#40173d',
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
});


import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Alert, Image, Dimensions } from 'react-native';
import { Entypo, Feather, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const { width } = Dimensions.get('window');

export default function Perfil() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');
    const [gender, setGender] = useState('');
    const [profileImage, setProfileImage] = useState(null);

    const handleSave = () => {
        if (!name || !email || !description || !gender) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }
        Alert.alert('Perfil Atualizado', 'Seu perfil foi atualizado com sucesso.');
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setProfileImage(result.assets[0].uri);
        }
    };

    return (
        <View style={styles.container}>
           
            <View style={styles.formContainer}>

             <View style={styles.profileContainer}>
                <TouchableOpacity style={styles.profileImageContainer} onPress={pickImage}>
                    {profileImage ? (
                        <Image source={{ uri: profileImage }} style={styles.profileImage} />
                    ) : (
                        <Feather name="user" size={50} color="#40173d" />
                    )}
                </TouchableOpacity>
            </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                        placeholder="Digite seu apelido"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Digite seu e-mail"
                        keyboardType="email-address"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={gender}
                        onChangeText={setGender}
                        placeholder="Digite seu gênero"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={description}
                        onChangeText={setDescription}
                        placeholder="Digite uma descrição"
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={handleSave}>
                        <Entypo name='pencil' size={25} color="#40173d" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImageContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#40173d',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ebe8e2',
    },
    profileImage: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
    },
    formContainer: {
        backgroundColor: '#ebe8e2',
        borderColor: '#40173d',
        borderWidth: 1,
        borderRadius: 50,
        width: 359,
        height: 'auto',
        justifyContent: 'center',
        padding: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    input: {
        borderBottomWidth: 0.5,
        borderBottomColor: '#000',
        flex: 1,
        height: 40,
        fontSize: 16,
    },
    buttonContainer: {
        alignItems: 'flex-end',
    },
    button: {
        padding: 15,
        borderRadius: 50,
        alignItems: 'center',
    },
});

import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Alert, Dimensions } from 'react-native';

import {Entypo, Feather, MaterialIcons, FontAwesome} from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function Perfil() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');
    const [gender, setGender] = useState('');

    const handleSave = () => {
        if (!name || !email || !description || !gender) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }
    
        Alert.alert('Perfil Atualizado', 'Seu perfil foi atualizado com sucesso.');
    };

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
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
                <View style={{float: 'right', width: 'auto', }}>
                <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Entypo name='pencil'/>
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
    },
    formContainer: {
        backgroundColor: '#cdcdcd',
        borderColor: '#a481a1',
        borderWidth: 1,
        borderRadius: 50,
        height: 500,
        flex: 1,
        justifyContent: 'center',
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
    button: {
        padding: 15,
        borderRadius: 50,
        alignItems: 'center',
        width: 10,
        float: 'right',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

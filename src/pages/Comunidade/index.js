import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';

export default function Comunidade() {
    const [characterName, setCharacterName] = useState('');
    const [characterClass, setCharacterClass] = useState('');
    const [level, setLevel] = useState('');
    const [race, setRace] = useState('');
    const [attributes, setAttributes] = useState('');
    const [skills, setSkills] = useState('');
    const [equipment, setEquipment] = useState('');
    const [background, setBackground] = useState('');
    const [description, setDescription] = useState('');
    const [diceValue, setDiceValue] = useState(null);

    const handleSubmit = () => {
        if (!characterName || !characterClass || !level || !race) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        const characterData = {
            characterName,
            characterClass,
            level,
            race,
            attributes,
            skills,
            equipment,
            background,
            description,
        };

        console.log('Character Data:', characterData);
        Alert.alert('Sucesso', 'Personagem criado com sucesso!');
        // Limpa os campos após o envio
        setCharacterName('');
        setCharacterClass('');
        setLevel('');
        setRace('');
        setAttributes('');
        setSkills('');
        setEquipment('');
        setBackground('');
        setDescription('');
    };

    const rollDice = () => {
        const rolledValue = Math.floor(Math.random() * 6) + 1; // Lançar um dado de 1 a 6
        setDiceValue(rolledValue);
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <Text style={styles.title}>Criar Personagem</Text>
                
                <TextInput
                    style={styles.input}
                    placeholder="Nome do Personagem"
                    value={characterName}
                    onChangeText={setCharacterName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Classe do Personagem"
                    value={characterClass}
                    onChangeText={setCharacterClass}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Nível"
                    keyboardType="numeric"
                    value={level}
                    onChangeText={setLevel}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Raça"
                    value={race}
                    onChangeText={setRace}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Atributos (força, destreza, etc.)"
                    value={attributes}
                    onChangeText={setAttributes}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Habilidades"
                    value={skills}
                    onChangeText={setSkills}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Equipamentos"
                    value={equipment}
                    onChangeText={setEquipment}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Background"
                    value={background}
                    onChangeText={setBackground}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Descrição"
                    value={description}
                    onChangeText={setDescription}
                />

                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitButtonText}>Criar Personagem</Text>
                </TouchableOpacity>

                {/* Dado */}
                <View style={styles.diceContainer}>
                    <TouchableOpacity style={styles.diceButton} onPress={rollDice}>
                        <Text style={styles.diceButtonText}>Lançar Dado</Text>
                    </TouchableOpacity>
                    {diceValue !== null && (
                        <Text style={styles.diceResult}>Resultado: {diceValue}</Text>
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
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#40173d',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: '#40173d',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    submitButton: {
        backgroundColor: '#bf0cb1',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    diceContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    diceButton: {
        backgroundColor: '#40173d',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    diceButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    diceResult: {
        fontSize: 18,
        color: '#40173d',
    },
});

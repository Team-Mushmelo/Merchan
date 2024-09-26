import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert, ScrollView, Modal } from 'react-native';

const dadosRPG = [
    { nome: 'Dado Piramidal (D4)', lados: 4, descricao: 'Usado para determinar dano de armas leves ou efeitos mágicos menores.' },
    { nome: 'Dado Cubo (D6)', lados: 6, descricao: 'Usado para uma variedade de ações, como dano de armas de fogo e teste de habilidades.' },
    { nome: 'Dado Octaédrico (D8)', lados: 8, descricao: 'Usado para calcular danos em armas de dois lados ou efeitos de feitiços.' },
    { nome: 'Dado Decaédrico (D10)', lados: 10, descricao: 'Comum para testes de habilidades e porcentagens.' },
    { nome: 'Dado Dodecaédrico (D12)', lados: 12, descricao: 'Usado para danos em armas pesadas ou em algumas classes de personagem.' },
    { nome: 'Dado Icosaédrico (D20)', lados: 20, descricao: 'Usado para ataques, testes de habilidade e salvamentos.' },
    { nome: 'Dado Percentual (D100)', lados: 100, descricao: 'Usado para determinar resultados em sistemas baseados em porcentagens.' },
    { nome: 'Dado Triangular (D3)', lados: 3, descricao: 'Usado em alguns sistemas para efeitos de magia ou rolagens simples.' },
    { nome: 'Dado Trigintaédrico (D30)', lados: 30, descricao: 'Usado em sistemas de RPG que requerem uma gama maior de resultados.' },
    { nome: 'Dado Milédrico (D1000)', lados: 1000, descricao: 'Muito raro, usado para resultados altamente variados.' },
];

export default function Comunidade() {
    const [characterName, setCharacterName] = useState('');
    const [characterClass, setCharacterClass] = useState('');
    const [level, setLevel] = useState('');
    const [race, setRace] = useState('');
    const [forca, setForca] = useState('');
    const [destreza, setDestreza] = useState('');
    const [intelecto, setIntelecto] = useState('');
    const [skills, setSkills] = useState('');
    const [equipment, setEquipment] = useState('');
    const [background, setBackground] = useState('');
    const [description, setDescription] = useState('');
    const [diceValue, setDiceValue] = useState(null);
    const [selectedDado, setSelectedDado] = useState(dadosRPG[0]);
    const [modalVisible, setModalVisible] = useState(false);
    const [savedCharacters, setSavedCharacters] = useState([]);

    const handleSubmit = () => {
        if (!characterName || !characterClass || !level || !race || !forca || !destreza || !intelecto) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        const characterData = {
            characterName,
            characterClass,
            level,
            race,
            forca,
            destreza,
            intelecto,
            skills,
            equipment,
            background,
            description,
        };

        setSavedCharacters([...savedCharacters, characterData]); // Adiciona o novo personagem
        setModalVisible(true); // Abre o modal

        // Limpa os campos após o envio
        setCharacterName('');
        setCharacterClass('');
        setLevel('');
        setRace('');
        setForca('');
        setDestreza('');
        setIntelecto('');
        setSkills('');
        setEquipment('');
        setBackground('');
        setDescription('');
        setDiceValue(null);
    };

    const rollDice = () => {
        const rolledValue = Math.floor(Math.random() * selectedDado.lados) + 1;
        setDiceValue(rolledValue);
    };

    const showDadoDescription = (dado) => {
        Alert.alert(dado.nome, dado.descricao);
        setSelectedDado(dado);
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
                    placeholder="Força"
                    keyboardType="numeric"
                    value={forca}
                    onChangeText={setForca}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Destreza"
                    keyboardType="numeric"
                    value={destreza}
                    onChangeText={setDestreza}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Intelecto"
                    keyboardType="numeric"
                    value={intelecto}
                    onChangeText={setIntelecto}
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

                <Text style={styles.selectedDadoText}>Dado Selecionado: {selectedDado.nome}</Text>

                <View style={styles.diceContainer}>
                    <TouchableOpacity style={styles.diceButton} onPress={rollDice}>
                        <Text style={styles.diceButtonText}>Lançar {selectedDado.nome}</Text>
                    </TouchableOpacity>
                    {diceValue !== null && (
                        <Text style={styles.diceResult}>Resultado: {diceValue}</Text>
                    )}
                </View>

                <View style={styles.dadosContainer}>
                    <Text style={styles.dadosTitle}>Variações de Dados de RPG</Text>
                    {dadosRPG.map((dado, index) => (
                        <TouchableOpacity key={index} onPress={() => showDadoDescription(dado)} style={styles.dadoItem}>
                            <Text style={styles.dadoNome}>{dado.nome}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Renderiza um botão para cada personagem criado */}
                {savedCharacters.map((character, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.showModalButton}
                        onPress={() => {
                            setModalVisible(true);
                            setSavedCharacters([character]); // Exibe apenas o personagem selecionado
                        }}
                    >
                        <Text style={styles.showModalButtonText}>{character.characterName}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Modal para mostrar os dados do personagem */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Personagem Criado</Text>
                        {savedCharacters.length > 0 && (
                            <View>
                                {Object.entries(savedCharacters[savedCharacters.length - 1]).map(([key, value]) => (
                                    <Text key={key} style={styles.modalText}>{`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`}</Text>
                                ))}
                            </View>
                        )}
                        <TouchableOpacity style={styles.closeModalButton} onPress={() => setModalVisible(false)}>
                            <Text style={styles.closeModalButtonText}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
    selectedDadoText: {
        fontSize: 16,
        color: '#40173d',
        marginTop: 20,
        textAlign: 'center',
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
    dadosContainer: {
        marginTop: 20,
    },
    dadosTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#40173d',
        marginBottom: 10,
    },
    dadoItem: {
        marginBottom: 10,
        padding: 10,
        borderColor: '#40173d',
        borderWidth: 1,
        borderRadius: 5,
    },
    dadoNome: {
        fontWeight: 'bold',
    },
    showModalButton: {
        backgroundColor: '#40173d',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    showModalButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#40173d',
        marginBottom: 20,
    },
    modalText: {
        fontSize: 18,
        marginBottom: 10,
    },
    closeModalButton: {
        backgroundColor: '#bf0cb1',
        padding: 10,
        borderRadius: 5,
        marginTop: 15,
    },
    closeModalButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert, ScrollView, Modal } from 'react-native';
import { useFonts, OpenSans_400Regular, OpenSans_700Bold, } from '@expo-google-fonts/open-sans';
import { Bungee_400Regular } from '@expo-google-fonts/bungee';
const dadosRPG = [
    { 
        nome: 'D4', 
        lados: 4, 
        descricao: 'Usado para determinar dano de armas leves ou efeitos mágicos menores.', 
        imagem: 'url_to_d4_image', 
        usoTipico: 'RPGs de fantasia, jogos de mesa', 
        historia: 'O D4 é frequentemente associado a armas de punho.', 
        exemplo: 'Um mago lança um feitiço que causa 1d4 de dano.', 
        raridade: 'Comum' 
    },
    { 
        nome: 'D6', 
        lados: 6, 
        descricao: 'Usado para uma variedade de ações, como dano de armas de fogo e teste de habilidades.', 
        imagem: 'url_to_d6_image', 
        usoTipico: 'Jogos de mesa, RPGs modernos', 
        historia: 'O D6 é um dos dados mais populares e versáteis.', 
        exemplo: 'Um personagem atira com uma pistola, causando 2d6 de dano.', 
        raridade: 'Comum' 
    },
    { 
        nome: 'D8', 
        lados: 8, 
        descricao: 'Usado para calcular danos em armas de dois lados ou efeitos de feitiços.', 
        imagem: 'url_to_d8_image', 
        usoTipico: 'RPGs de fantasia', 
        historia: 'O D8 é muito usado em jogos de RPG, especialmente em D&D.', 
        exemplo: 'Um bárbaro ataca com um machado que causa 1d8 de dano.', 
        raridade: 'Comum' 
    },
    { 
        nome: 'D10', 
        lados: 10, 
        descricao: 'Comum para testes de habilidades e porcentagens.', 
        imagem: 'url_to_d10_image', 
        usoTipico: 'Jogos de mesa, RPGs modernos', 
        historia: 'Usado para calcular danos em armas de fogo e outras mecânicas.', 
        exemplo: 'Um personagem faz um teste de habilidade, rolando 1d10.', 
        raridade: 'Comum' 
    },
    { 
        nome: 'D12', 
        lados: 12, 
        descricao: 'Usado para danos em armas pesadas ou em algumas classes de personagem.', 
        imagem: 'url_to_d12_image', 
        usoTipico: 'RPGs de fantasia', 
        historia: 'Menos comum, mas essencial para certos personagens.', 
        exemplo: 'Um guerreiro ataca com uma espada longa, causando 1d12 de dano.', 
        raridade: 'Raro' 
    },
    { 
        nome: 'D20', 
        lados: 20, 
        descricao: 'Usado para ataques, testes de habilidade e salvamentos.', 
        imagem: 'url_to_d20_image', 
        usoTipico: 'Dungeons & Dragons e outros RPGs', 
        historia: 'É o dado mais icônico dos RPGs de mesa.', 
        exemplo: 'Um ladrão tenta desarmar uma armadilha, rolando 1d20.', 
        raridade: 'Comum' 
    },
    { 
        nome: 'D100', 
        lados: 100, 
        descricao: 'Usado para determinar resultados em sistemas baseados em porcentagens.', 
        imagem: 'url_to_d100_image', 
        usoTipico: 'RPGs de horror e investigação', 
        historia: 'Usado em muitos sistemas, especialmente para rolagens de falhas e sucessos.', 
        exemplo: 'Um teste de habilidade que exige um sucesso em 1d100.', 
        raridade: 'Raro' 
    },
    { 
        nome: 'D3', 
        lados: 3, 
        descricao: 'Usado em alguns sistemas para efeitos de magia ou rolagens simples.', 
        imagem: 'url_to_d3_image', 
        usoTipico: 'Jogos menos convencionais', 
        historia: 'Usado principalmente em sistemas alternativos de RPG.', 
        exemplo: 'Um efeito mágico que causa 1d3 de dano.', 
        raridade: 'Muito raro' 
    },
    { 
        nome: 'D30', 
        lados: 30, 
        descricao: 'Usado em sistemas de RPG que requerem uma gama maior de resultados.', 
        imagem: 'url_to_d30_image', 
        usoTipico: 'Sistemas de RPG específicos', 
        historia: 'Raro e frequentemente um item de colecionador.', 
        exemplo: 'Um ataque especial que causa 1d30 de dano.', 
        raridade: 'Raro' 
    },
    { 
        nome: 'D1000', 
        lados: 1000, 
        descricao: 'Muito raro, usado para resultados altamente variados.', 
        imagem: 'url_to_d1000_image', 
        usoTipico: 'Sistemas extremamente detalhados', 
        historia: 'Um dos dados mais raros encontrados em jogos de RPG.', 
        exemplo: 'Um evento aleatório que causa 1d1000 de dano.', 
        raridade: 'Extremamente raro' 
    },
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
    const [isFocused, setIsFocused] = useState(false);

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

        setSavedCharacters([...savedCharacters, characterData]);
        setModalVisible(true);

        // Limpar os campos após a criação
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
        Alert.alert(
            dado.nome,
            `${dado.descricao}\n\nUso Típico: ${dado.usoTipico}\nHistória: ${dado.historia}\nExemplo: ${dado.exemplo}\nRaridade: ${dado.raridade}`,
            [{ text: "Fechar" }]
        );
        setSelectedDado(dado);
    };
       
    let [fontsLoaded] = useFonts({
        'OpenSansRegular': OpenSans_400Regular,
        'OpenSansBold': OpenSans_700Bold,
        'BungeeRegular': Bungee_400Regular,
    });
    
    if (!fontsLoaded) {
        return <Text>Carregando fontes...</Text>; // ou algum componente de carregamento
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <Text style={styles.title}>Criar Personagem</Text>

                <TextInput
                    style={[styles.input, isFocused && styles.inputFocused]}
                    placeholder="Nome do Personagem"
                    value={characterName}
                    onChangeText={setCharacterName}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    selectionColor="#40173d"
                    underlineColorAndroid="#40173d"
                />
                <TextInput
                    style={[styles.input, isFocused && styles.inputFocused]}
                    placeholder="Classe do Personagem"
                    value={characterClass}
                    onChangeText={setCharacterClass}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    selectionColor="#40173d"
                    underlineColorAndroid="transparent"
                />
                <TextInput
                    style={[styles.input, isFocused && styles.inputFocused]}
                    placeholder="Nível"
                    keyboardType="numeric"
                    value={level}
                    onChangeText={setLevel}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    selectionColor="#40173d"
                    underlineColorAndroid="transparent"
                />
                <TextInput
                    style={[styles.input, isFocused && styles.inputFocused]}
                    placeholder="Etnia"
                    value={race}
                    onChangeText={setRace}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    selectionColor="#40173d"
                    underlineColorAndroid="transparent"
                />
                <TextInput
                    style={[styles.input, isFocused && styles.inputFocused]}
                    placeholder="Força"
                    keyboardType="numeric"
                    value={forca}
                    onChangeText={setForca}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    selectionColor="#40173d"
                    underlineColorAndroid="transparent"
                />
                <TextInput
                    style={[styles.input, isFocused && styles.inputFocused]}
                    placeholder="Destreza"
                    keyboardType="numeric"
                    value={destreza}
                    onChangeText={setDestreza}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    selectionColor="#40173d"
                    underlineColorAndroid="transparent"
                />
                <TextInput
                    style={[styles.input, isFocused && styles.inputFocused]}
                    placeholder="Intelecto"
                    keyboardType="numeric"
                    value={intelecto}
                    onChangeText={setIntelecto}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    selectionColor="#40173d"
                    underlineColorAndroid="transparent"
                />
                <TextInput
                    style={[styles.input, isFocused && styles.inputFocused]}
                    placeholder="Habilidades"
                    value={skills}
                    onChangeText={setSkills}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    selectionColor="#40173d"
                    underlineColorAndroid="transparent"
                />
                <TextInput
                    style={[styles.input, isFocused && styles.inputFocused]}
                    placeholder="Equipamentos"
                    value={equipment}
                    onChangeText={setEquipment}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    selectionColor="#40173d"
                    underlineColorAndroid="transparent"
                />
                <TextInput
                    style={[styles.input, isFocused && styles.inputFocused]}
                    placeholder="Background"
                    value={background}
                    onChangeText={setBackground}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    selectionColor="#40173d"
                    underlineColorAndroid="transparent"
                />
                <TextInput
                    style={[styles.input, isFocused && styles.inputFocused]}
                    placeholder="Descrição"
                    value={description}
                    onChangeText={setDescription}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    selectionColor="#40173d"
                    underlineColorAndroid="transparent"
                />

                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitButtonText}>Criar Personagem</Text>
                </TouchableOpacity>

            

                <View style={styles.diceContainer}>
                    <TouchableOpacity style={styles.diceButton} onPress={rollDice}>
                        <Text style={styles.diceButtonText}>Lançar {selectedDado.nome}</Text>
                    </TouchableOpacity>
                    <Text style={styles.diceResult}>Resultado: {diceValue}
            </Text>
                </View>

                <View style={styles.dadosContainer}>
    <Text style={styles.dadosTitle}>Variações de Dados de RPG</Text>
    <View style={styles.colunasContainer}>
        <View style={styles.coluna}>
            {dadosRPG.slice(0, Math.ceil(dadosRPG.length / 2)).map((dado, index) => (
                <TouchableOpacity key={index} onPress={() => showDadoDescription(dado)} style={styles.dadoItem}>
                    <Text style={styles.dadoNome}>{dado.nome}</Text>
                </TouchableOpacity>
            ))}
        </View>
        <View style={styles.coluna}>
            {dadosRPG.slice(Math.ceil(dadosRPG.length / 2)).map((dado, index) => (
                <TouchableOpacity key={index + Math.ceil(dadosRPG.length / 2)} onPress={() => showDadoDescription(dado)} style={styles.dadoItem}>
                    <Text style={styles.dadoNome}>{dado.nome}</Text>
                </TouchableOpacity>
            ))}
        </View>
    </View>
</View>


                {savedCharacters.map((character, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.showModalButton}
                        onPress={() => {
                            setModalVisible(true);
                            setSavedCharacters([character]);
                        }}
                    >
                        <Text style={styles.showModalButtonText}>{character.characterName}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

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
        backgroundColor: '#fff',
        flex: 1,
        padding: 10,
        justifyContent: 'center',
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
        fontFamily: 'BungeeRegular',
    },
    input: {
        height: 35,
        borderColor: '#40173d',
        borderWidth: 1,
        borderRadius: 15,
        paddingHorizontal: 4,
        marginBottom: 15,
        outlineWidth: 0,
        fontFamily: 'OpenSansRegular',
    },
  
    submitButton: {
        backgroundColor: '#bf0cb1',
        padding: 15,
        borderRadius: 18,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        borderRadius: 15,
        fontFamily: 'OpenSansRegular',
    },
    selectedDadoText: {
        fontSize: 16,
        color: '#40173d',
        marginTop: 20,
        textAlign: 'center',
        outlineWidth: 0,
        fontFamily: 'OpenSansRegular',
    },
    diceContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    diceButton: {
        backgroundColor: '#40173d',
        padding: 15,
        borderRadius: 15,
        alignItems: 'center',
        marginBottom: 10,
    },
    diceButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontFamily: 'OpenSansRegular',
    },
    diceResult: {
        fontSize: 18,
        color: '#40173d',
    },
    dadosContainer: {
        borderRadius: 15,
    },
    dadosTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },
    dadoItem: {
        marginBottom: 10,
        color: '#fff',
        padding: 10,
        backgroundColor: '#40173d',
        borderColor: '#40173d',
        borderWidth: 1,
        borderRadius: 15,
    },
    dadoNome: {
        fontWeight: 'bold',
        color: '#fff',
    },
    colunasContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    coluna: {
        flex: 1,
        padding: 10, // Ajuste o padding conforme necessário
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
        borderRadius: 18,
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

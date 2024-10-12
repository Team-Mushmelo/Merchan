import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native';

const storyTypes = [
    {
        id: 1,
        title: "Aventura Fantástica",
        stories: [
            {
                id: 1,
                title: "Aventura na Floresta",
                text: "Você se encontra em uma floresta densa, cercado por árvores imensas e sons misteriosos. O que você faz?",
                options: [
                    { text: "Explorar a floresta", nextStory: 2 },
                    { text: "Voltar para casa", nextStory: 3 }
                ],
                inventory: [],
                endings: [
                    { text: "Você encontrou um tesouro escondido!", points: 10 },
                    { text: "Você voltou em segurança, mas com uma história incrível para contar.", points: 5 }
                ]
            },
            {
                id: 2,
                title: "Explorando Ruínas",
                text: "Você avista ruínas antigas, com pedras cobertas de musgo e símbolos misteriosos. Dentro delas, você encontra dois caminhos.",
                options: [
                    { text: "Caminho da esquerda", nextStory: 4 },
                    { text: "Caminho da direita", nextStory: 5 }
                ],
                inventory: ["Mapa"],
                endings: [
                    { text: "Você encontrou um artefato mágico!", points: 20 },
                    { text: "Você foi pego por uma armadilha.", points: -5 }
                ]
            },
            {
                id: 3,
                title: "Fim da Aventura",
                text: "Você decidiu voltar para casa. Fim da história.",
                options: [],
                inventory: [],
                endings: []
            }
        ]
    },
    {
        id: 2,
        title: "Aventura Espacial",
        stories: [
            {
                id: 1,
                title: "Uma Viagem no Espaço",
                text: "Você está em uma nave espacial viajando por galáxias distantes. Uma luz estranha aparece no painel. O que você faz?",
                options: [
                    { text: "Investigar a luz", nextStory: 6 },
                    { text: "Ignorar e continuar a viagem", nextStory: 7 }
                ],
                inventory: [],
                endings: [
                    { text: "Você descobriu um planeta inexplorado!", points: 15 },
                    { text: "Você perdeu a rota e teve que retornar.", points: -10 }
                ]
            },
            {
                id: 6,
                title: "Explorando o Planeta",
                text: "Você pousou no planeta e encontra formas de vida estranhas. O que você faz?",
                options: [
                    { text: "Tentar se comunicar", nextStory: 8 },
                    { text: "Explorar sozinho", nextStory: 9 }
                ],
                inventory: [],
                endings: [
                    { text: "Você fez amigos intergalácticos!", points: 25 },
                    { text: "Você foi capturado por alienígenas.", points: -15 }
                ]
            },
            {
                id: 7,
                title: "Retornando para Casa",
                text: "Você ignorou a luz e seguiu sua rota. A viagem foi tranquila, mas você perdeu uma oportunidade incrível.",
                options: [],
                inventory: [],
                endings: []
            }
        ]
    }
];

const App = () => {
    const [currentStory, setCurrentStory] = useState(null);
    const [points, setPoints] = useState(0);
    const [inventory, setInventory] = useState([]);
    const [storyType, setStoryType] = useState(null);

    const handleStoryTypeSelect = (typeId) => {
        setStoryType(typeId);
        setCurrentStory(1); // Começa a primeira história do tipo selecionado
    };

    const handleOptionPress = (nextStory) => {
        const story = storyTypes[storyType - 1].stories.find(s => s.id === nextStory);
        if (story) {
            setCurrentStory(nextStory);

            if (story.inventory.length > 0) {
                setInventory(prev => [...prev, ...story.inventory]);
            }

            if (story.endings.length > 0) {
                const ending = story.endings[Math.floor(Math.random() * story.endings.length)];
                setPoints(prev => prev + ending.points);
                Alert.alert("Fim da Aventura", ending.text);
            }
        } else {
            Alert.alert("Erro", "História não encontrada.");
        }
    };

    const getCurrentStory = () => {
        if (storyType === null) return null;
        return storyTypes[storyType - 1].stories.find(s => s.id === currentStory);
    };

    const story = getCurrentStory();

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {storyType === null ? (
                <>
                    <Text style={styles.title}>Escolha seu tipo de história</Text>
                    {storyTypes.map(type => (
                        <TouchableOpacity
                            key={type.id}
                            style={styles.button}
                            onPress={() => handleStoryTypeSelect(type.id)}
                        >
                            <Text style={styles.buttonText}>{type.title}</Text>
                        </TouchableOpacity>
                    ))}
                </>
            ) : (
                <>
                    {story && (
                        <>
                            <Text style={styles.title}>{story.title}</Text>
                            <Text style={styles.text}>{story.text}</Text>
                            {story.options.map((option, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.button}
                                    onPress={() => handleOptionPress(option.nextStory)}
                                >
                                    <Text style={styles.buttonText}>{option.text}</Text>
                                </TouchableOpacity>
                            ))}
                            <Text style={styles.points}>Pontos: {points}</Text>
                            <Text style={styles.inventory}>Inventário: {inventory.join(', ')}</Text>
                        </>
                    )}
                </>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    text: {
        fontSize: 18,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#bf0cb1',
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
    },
    points: {
        fontSize: 16,
        marginTop: 20,
    },
    inventory: {
        fontSize: 16,
        marginTop: 10,
    },
});

export default App;

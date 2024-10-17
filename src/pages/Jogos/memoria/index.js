import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useFonts, Bungee_400Regular } from '@expo-google-fonts/bungee';

const images = ['🍎', '🍌', '🍇', '🍒', '🍓', '🍊'];
const createShuffledImages = () => [...images, ...images].sort(() => Math.random() - 0.5);

const MemoryGame = () => {
    const [fontsLoaded] = useFonts({ BungeeRegular: Bungee_400Regular });

    const navigation = useNavigation(); // Hook de navegação

    const [cards, setCards] = useState(createShuffledImages());
    const [flippedIndices, setFlippedIndices] = useState([]);
    const [matchedPairs, setMatchedPairs] = useState(new Set());

    const handleCardPress = (index) => {
        if (flippedIndices.length === 2 || matchedPairs.has(index)) return;

        setFlippedIndices((prev) => [...prev, index]);

        if (flippedIndices.length === 1) {
            const firstIndex = flippedIndices[0];

            if (cards[firstIndex] === cards[index]) {
                // Se for um par, adiciona os índices ao conjunto de pares combinados
                setMatchedPairs((prev) => new Set([...prev, firstIndex, index]));
                setFlippedIndices([]); // Limpa os índices virados
            } else {
                // Se não for um par, limpa os índices após 1 segundo
                setTimeout(() => {
                    setFlippedIndices([]);
                }, 1000);
            }
        }
    };

    const restartGame = () => {
        setCards(createShuffledImages());
        setFlippedIndices([]);
        setMatchedPairs(new Set());
    };

    const renderCard = (index) => {
        const isFlipped = flippedIndices.includes(index) || matchedPairs.has(index);
        return (
            <TouchableOpacity
                key={index}
                style={[styles.card, isFlipped && styles.flippedCard]}
                onPress={() => handleCardPress(index)}
            >
                {isFlipped ? (
                    <Text style={styles.cardText}>{cards[index]}</Text>
                ) : (
                    <Text style={styles.cardText}>♠</Text>
                )}
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            {/* Botão de voltar para a tela de início */}
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('MeuApp')}>
                <Ionicons name="arrow-back" size={30} color="#40173d" />
            </TouchableOpacity>

            <Text style={styles.title}>Jogo da Memória</Text>
            <View style={styles.grid}>
                {cards.map((_, index) => renderCard(index))}
            </View>
            {matchedPairs.size === cards.length && (
                <TouchableOpacity style={styles.restartButton} onPress={restartGame}>
                    <Text style={styles.restartButtonText}>Reiniciar Jogo</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        color: '#40173d',
        fontFamily: 'BungeeRegular',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: '80%',
    },
    card: {
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 15,
        margin: 5,
        backgroundColor: '#bc0cb1',
    },
    flippedCard: {
        backgroundColor: '#fff',
    },
    cardText: {
        fontSize: 30,
        color: '#fff',
    },
    restartButton: {
        marginTop: 20,
        padding: 10,
        borderRadius: 20,
        backgroundColor: '#bc0cb1', // Cor do botão
    },
    restartButtonText: {
        color: '#fff', // Cor do texto do botão
        fontSize: 18,
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        borderRadius: 20,
        padding: 10,
        elevation: 4,
        shadowColor: '#bc0cb1',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
    },
});

export default MemoryGame;

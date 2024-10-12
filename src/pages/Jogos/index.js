import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Animated, Modal, KeyboardAvoidingView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

const App = () => {
    const [message, setMessage] = useState('');
    const [currentTheme, setCurrentTheme] = useState({ name: '', icon: '' });
    const [isGameActive, setIsGameActive] = useState(false);
    const [timeLeft, setTimeLeft] = useState(60);
    const [score, setScore] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [timer, setTimer] = useState(30);
    const maxWrongGuesses = 6;
    const symbols = ['O', '-', ']', '-', '-', '<', ' '];
    const [firstWrongGuess, setFirstWrongGuess] = useState(true);
    
    const [titleAnimation] = useState(new Animated.Value(-50));
    const [contentAnimation] = useState(new Animated.Value(-50));
    const [opacityAnimation] = useState(new Animated.Value(0));

    useEffect(() => {
        let timer;
        if (isGameActive && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isGameActive, timeLeft]);

    useEffect(() => {
        let interval;
        if (isGameActive && timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isGameActive, timer]);

    const handleStartGame = () => {
        const randomTheme = THEMES[Math.floor(Math.random() * THEMES.length)];
        setMessage('');
        setFirstWrongGuess(true);
        setIsGameActive(true);
        setTimeLeft(60);
        setScore(0);
        setTimer(30);

        Animated.parallel([
            Animated.timing(titleAnimation, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(contentAnimation, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(opacityAnimation, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const handleGuess = (letter) => {
        if (!isGameActive || guessedLetters.includes(letter)) return;

        setGuessedLetters([...guessedLetters, letter]);

        if (word.includes(letter)) {
            setTimeLeft((prev) => prev + 10);
            if (word.split('').every((char) => guessedLetters.includes(char) || char === letter)) {
                setScore((prev) => prev + 25);
                setMessage('Você ganhou! O-]--<');
                setIsGameActive(false);
                setIsModalVisible(true);
            }
            setTimer((prev) => prev + 5);
        } else {
            if (firstWrongGuess) {
                setFirstWrongGuess(false);
            } else {
                setWrongGuesses(wrongGuesses + 1);
            }
            if (wrongGuesses + (firstWrongGuess ? 0 : 1) >= maxWrongGuesses) {
                setMessage(`Fim de jogo! A palavra era: ${word}`);
                setIsGameActive(false);
                setIsModalVisible(true);
            }
        }
    };

    const calculateScore = () => {
        return guessedLetters.reduce((acc, letter) => {
            return word.includes(letter) ? acc + 5 : acc;
        }, 0);
    };

    const endGame = (isLost) => {
        setMessage(isLost ? `Fim de jogo! A palavra era: ${word}` : 'Tempo esgotado! A palavra era: ' + word);
        setIsGameActive(false);
        setScore(calculateScore());
    };

    const renderWord = () => {
        // Implementar a lógica de renderização da palavra
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
        handleStartGame();
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Animated.Text style={[styles.title, { transform: [{ translateY: titleAnimation }], opacity: opacityAnimation, color: '#40173d' }]}>
                Jogo da Forca
            </Animated.Text>
            <Animated.Text style={[styles.subtitle, { transform: [{ translateY: titleAnimation }], opacity: opacityAnimation, color: '#40173d' }]}>
                seu primeiro erro é perdoado
            </Animated.Text>
            <Text style={styles.timer}>Tempo: {timeLeft}s</Text>
            <Text style={styles.score}>Pontuação: {score}</Text>
            {currentTheme.name && (
                <Animated.View style={[styles.themeContainer, { transform: [{ translateY: contentAnimation }], opacity: opacityAnimation }]}>
                    <Entypo name={currentTheme.icon} size={32} style={[styles.themeIcon, { color: '#40173d' }]} />
                    <Text style={[styles.themeName, { fontFamily: 'BungeeRegular', color: '#40173d' }]}>{currentTheme.name}</Text>
                </Animated.View>
            )}
            <View style={styles.hangmanContainer}>
                {renderHangman()}
            </View>
            <Animated.View style={{ transform: [{ translateY: contentAnimation }], opacity: opacityAnimation }}>
                <View style={styles.wordContainer}>
                    {renderWord()}
                </View>
            </Animated.View>
            <TouchableOpacity style={styles.startButton} onPress={handleStartGame}>
                <Ionicons name="play" size={30} color="#fff" />
            </TouchableOpacity>

            <Modal visible={isModalVisible} transparent={true} animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Fim de jogo!</Text>
                        <Text style={styles.modalScore}>Sua pontuação: {score}</Text>
                        <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
                            <Text style={styles.closeButtonText}>Recomeçar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    scrollViewContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    timer: {
        fontSize: 18,
        marginBottom: 10,
        color: '#40173d',
    },
    score: {
        fontSize: 18,
        marginBottom: 20,
        color: '#40173d',
    },
    themeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    hangmanContainer: {
        // Definir estilos para o contêiner do boneco da forca
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    scoreContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalScore: {
        fontSize: 18,
        marginBottom: 20,
    },
    closeButton: {
        backgroundColor: '#bf0cb1',
        padding: 10,
        borderRadius: 5,
    },
    closeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    score: {
        fontSize: 24,
        color: '#40173d',
        textAlign: 'center',
    },
});

export default App;

import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Animated, KeyboardAvoidingView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';

const WORDS = {
    'Aventura Espacial': ["galáxia", "nave", "astronauta", "cometa", "buraco negro", "estrela", "planeta", "satélite", "foguete", "exploração"],
    'Fantasia Medieval': ["cavaleiro", "castelo", "dragão", "espada", "reino", "rainha", "mago", "taverna", "aventura", "batalha"],
    'Pós-Apocalíptico': ["sobrevivente", "deserto", "mutante", "ruínas", "catástrofe", "refúgio", "fome", "pandemia", "guerra", "desolação"],
};

const THEMES = [
    { name: 'Aventura Espacial', icon: 'rocket' },
    { name: 'Fantasia Medieval', icon: 'star' },
    { name: 'Pós-Apocalíptico', icon: 'warning' },
];

const Forca = () => {
    const navigation = useNavigation();
    const [word, setWord] = useState('');
    const [guessedLetters, setGuessedLetters] = useState([]);
    const [wrongGuesses, setWrongGuesses] = useState(0);
    const [message, setMessage] = useState('');
    const [currentTheme, setCurrentTheme] = useState({ name: '', icon: '' });
    const [isGameActive, setIsGameActive] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(30);
    const [gameOver, setGameOver] = useState(false);
    const maxWrongGuesses = 6;
    const symbols = ['O', '-', ']', '-', '-', '<', ' '];
    const [firstWrongGuess, setFirstWrongGuess] = useState(true);

    // Animações
    const titleAnimation = useState(new Animated.Value(-50))[0];
    const contentAnimation = useState(new Animated.Value(-50))[0];
    const opacityAnimation = useState(new Animated.Value(0))[0];

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
        } else if (timer === 0) {
            endGame(false);
        }
        return () => clearInterval(interval);
    }, [isGameActive, timer]);

    const handleStartGame = () => {
        const randomTheme = THEMES[Math.floor(Math.random() * THEMES.length)];
        setCurrentTheme(randomTheme);

        const randomWord = WORDS[randomTheme.name][Math.floor(Math.random() * WORDS[randomTheme.name].length)];
        setWord(randomWord);
        setGuessedLetters([]);
        setWrongGuesses(0);
        setMessage('');
        setFirstWrongGuess(true);
        setIsGameActive(true);
        setGameOver(false);
        setTimeLeft(30);
        setScore(0);
        setTimer(30);

        // Animações
        Animated.parallel([
            Animated.timing(titleAnimation, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(contentAnimation, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(opacityAnimation, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const handleGuess = (letter) => {
        if (!isGameActive || guessedLetters.includes(letter) || wrongGuesses >= maxWrongGuesses) return;

        setGuessedLetters([...guessedLetters, letter]);

        if (word.includes(letter)) {
            setTimeLeft((prev) => prev + 10);
            if (word.split('').every((char) => guessedLetters.includes(char) || char === letter)) {
                setScore((prev) => prev + 25);
                setMessage('Você ganhou!');
                setIsGameActive(false);
                setGameOver(true);
            }
            setTimer((prev) => prev + 5);
        } else {
            if (firstWrongGuess) {
                setFirstWrongGuess(false);
            } else {
                setWrongGuesses(wrongGuesses + 1);
            }
        }

        if (wrongGuesses + (firstWrongGuess ? 0 : 1) >= maxWrongGuesses) {
            endGame(true);
        }
    };

    const endGame = (isLost) => {
        setMessage(isLost ? `Fim de jogo! A palavra era: ${word}` : 'Você ganhou!');
        setIsGameActive(false);
        setGameOver(true);
    };

    const renderWord = () => {
        return word.split('').map((letter, index) => (
            <Text key={index} style={styles.letter}>
                {guessedLetters.includes(letter) ? letter : '_'}
            </Text>
        ));
    };

    const renderAlphabet = () => {
        const alphabet = 'abcdefghijklmnopqrstuvwxyzçâôáéíóú';
        return alphabet.split('').map((letter) => (
            <TouchableOpacity
                key={letter}
                onPress={() => handleGuess(letter)}
                disabled={!isGameActive || guessedLetters.includes(letter) || wrongGuesses >= maxWrongGuesses}
                style={[styles.button, { backgroundColor: isGameActive ? (guessedLetters.includes(letter) ? '#e0e0e0' : '#bf0cb1') : '#d3d3d3' }]} >
                <Text style={styles.buttonText}>{letter}</Text>
            </TouchableOpacity>
        ));
    };

    const renderHangman = () => {
        const currentSymbol = symbols.slice(0, wrongGuesses).join(' ');
        return <Text style={styles.hangman}>{currentSymbol}</Text>;
    };

    const handleRestartGame = () => {
        handleStartGame();
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <ScrollView contentContainerStyle={styles.scrollViewContainer} keyboardShouldPersistTaps="handled">
                <TouchableOpacity onPress={() => navigation.navigate('velha')}>
                    <Text style={styles.navigateText}>Ir para Velha</Text>
                </TouchableOpacity>

                <Animated.Text style={[styles.title, { transform: [{ translateY: titleAnimation }], opacity: opacityAnimation }]}>
                    Jogo da Forca
                </Animated.Text>
                <Animated.Text style={[styles.subtitle, { transform: [{ translateY: titleAnimation }], opacity: opacityAnimation }]}>
                    Seu primeiro erro é perdoado
                </Animated.Text>
                <Text style={styles.timer}>Tempo: {timeLeft}s</Text>
                <Text style={styles.score}>Pontuação: {score}</Text>
                {currentTheme.name && (
                    <Animated.View style={[styles.themeContainer, { transform: [{ translateY: contentAnimation }], opacity: opacityAnimation }]}>
                        <Entypo name={currentTheme.icon} size={32} style={styles.themeIcon} />
                        <Text style={styles.themeName}>{currentTheme.name}</Text>
                    </Animated.View>
                )}
                <View style={styles.hangmanContainer}>
                    {renderHangman()}
                </View>
                <View style={styles.wordContainer}>
                    {renderWord()}
                </View>
                <Text style={styles.message}>{message}</Text>
                <View style={styles.alphabetContainer}>
                    {renderAlphabet()}
                </View>
                <TouchableOpacity style={styles.startButton} onPress={handleStartGame}>
                    <Ionicons name="play" size={30} color="#fff" />
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    scrollViewContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        fontFamily: 'BungeeRegular',
        color: '#40173d',
    },
    subtitle: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#40173d',
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
        marginBottom: 20,
    },
    themeIcon: {
        marginRight: 10,
    },
    themeName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#40173d',
    },
    hangmanContainer: {
        marginBottom: 20,
    },
    hangman: {
        fontSize: 48,
        textAlign: 'center',
        lineHeight: 40,
    },
    wordContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    letter: {
        fontSize: 32,
        margin: 5,
    },
    message: {
        fontSize: 18,
        marginBottom: 20,
        color: '#40173d',
        textAlign: 'center',
    },
    alphabetContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 20,
    },
    button: {
        borderRadius: 50,
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        elevation: 4,
        shadowColor: '#40173d',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
    },
    buttonText: {
        fontSize: 24,
        color: '#fff',
    },
    startButton: {
        backgroundColor: '#bf0cb1',
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        elevation: 4,
        shadowColor: '#40173d',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
    },
    navigateText: {
        fontSize: 16,
        color: '#bf0cb1',
        marginBottom: 20,
    },
});

export default Forca;

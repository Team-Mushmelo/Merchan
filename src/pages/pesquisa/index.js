import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const WORDS = ["javascript", "react", "node", "programming", "development"];
const THEMES = [
    { name: 'Aventura Espacial', icon: '🚀' },
    { name: 'Fantasia Medieval', icon: '🏰' },
    { name: 'Pós-Apocalíptico', icon: '☣️' },
];

const App = () => {
    const [word, setWord] = useState('');
    const [guessedLetters, setGuessedLetters] = useState([]);
    const [wrongGuesses, setWrongGuesses] = useState(0);
    const [message, setMessage] = useState('');
    const [currentTheme, setCurrentTheme] = useState({ name: '', icon: '' });
    const [isGameActive, setIsGameActive] = useState(false);
    const maxWrongGuesses = 6; // Apenas 6 erros permitidos
    const symbols = ['O', '-', ']', '-', '-', '<', ' '];
    const [firstWrongGuess, setFirstWrongGuess] = useState(true); // Primeiro erro perdoado

    // Animações
    const [titleAnimation] = useState(new Animated.Value(-50));
    const [contentAnimation] = useState(new Animated.Value(-50));
    const [opacityAnimation] = useState(new Animated.Value(0));

    const handleStartGame = () => {
        const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)];
        setWord(randomWord);
        setGuessedLetters([]);
        setWrongGuesses(0);
        setMessage('');
        setFirstWrongGuess(true); // Resetar para o próximo jogo
        setIsGameActive(true);

        const randomTheme = THEMES[Math.floor(Math.random() * THEMES.length)];
        setCurrentTheme(randomTheme);

        // Iniciar animações
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

        if (!word.includes(letter)) {
            if (firstWrongGuess) {
                setFirstWrongGuess(false); // O primeiro erro foi perdoado
            } else {
                setWrongGuesses(wrongGuesses + 1);
            }
        }

        // Verifica se o jogador perdeu
        if (wrongGuesses + (firstWrongGuess ? 0 : 1) >= maxWrongGuesses) {
            setMessage(`Fim de jogo! A palavra era: ${word}`);
            setIsGameActive(false);
            return;
        }

        // Verifica se o jogador ganhou
        if (word.split('').every((char) => guessedLetters.includes(char))) {
            setMessage('Você ganhou! O-]--<');
            setIsGameActive(false);
        }
    };

    const renderWord = () => {
        return word.split('').map((letter, index) => (
            <Text key={index} style={styles.letter}>
                {guessedLetters.includes(letter) ? letter : '_'}
            </Text>
        ));
    };

    const renderAlphabet = () => {
        const alphabet = 'abcdefghijklmnopqrstuvwxyz';
        return alphabet.split('').map((letter) => (
            <TouchableOpacity
                key={letter}
                onPress={() => handleGuess(letter)}
                disabled={!isGameActive || guessedLetters.includes(letter) || wrongGuesses >= maxWrongGuesses}
                style={[
                    styles.button,
                    { backgroundColor: isGameActive ? (guessedLetters.includes(letter) ? '#e0e0e0' : '#bf0cb1') : '#d3d3d3' }
                ]}
            >
                <Text style={styles.buttonText}>{letter}</Text>
            </TouchableOpacity>
        ));
    };

    const renderHangman = () => {
        const currentSymbol = symbols.slice(0, wrongGuesses).join(' ');
        return <Text style={styles.hangman}>{currentSymbol}</Text>;
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Animated.Text style={[styles.title, { transform: [{ translateY: titleAnimation }], opacity: opacityAnimation }]}>
                Jogo da Forca
            </Animated.Text>
            <Animated.Text style={[styles.subtitle, { transform: [{ translateY: titleAnimation }], opacity: opacityAnimation }]}>
                seu primeiro erro é perdoado
            </Animated.Text>
            {currentTheme.name && (
                <Animated.View style={[styles.themeContainer, { transform: [{ translateY: contentAnimation }], opacity: opacityAnimation }]}>
                    <Text style={styles.themeIcon}>{currentTheme.icon}</Text>
                    <Text style={styles.themeName}>{currentTheme.name}</Text>
                </Animated.View>
            )}
            <View style={styles.hangmanContainer}>
                {renderHangman()}
            </View>
            <Animated.View style={{ transform: [{ translateY: contentAnimation }], opacity: opacityAnimation }}>
                <View style={styles.wordContainer}>
                    {renderWord()}
                </View>
                <Text style={styles.message}>{message}</Text>
                <View style={styles.alphabetContainer}>
                    {renderAlphabet()}
                </View>
            </Animated.View>
            <TouchableOpacity style={styles.startButton} onPress={handleStartGame}>
                <Icon name="play" size={30} color="#fff" />
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    subtitle: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    themeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    themeIcon: {
        fontSize: 32,
        marginRight: 10,
    },
    themeName: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    hangmanContainer: {
        marginBottom: 20,
        alignItems: 'center',
    },
    hangman: {
        fontSize: 48,
        textAlign: 'center',
        lineHeight: 40,
    },
    wordContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
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
        shadowColor: '#000',
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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
    },
});

export default App;

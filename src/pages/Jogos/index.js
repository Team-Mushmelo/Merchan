import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Animated, Modal } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

const WORDS = {
    'Aventura Espacial': ["galáxia", "nave", "astronauta", "estrelas", "planeta"],
    'Fantasia Medieval': ["dragão", "cavaleiro", "castelo", "magia", "princesa"],
    'Pós-Apocalíptico': ["sobrevivente", "deserto", "ruínas", "radiação", "apocalipse"],
};

const THEMES = [
    { name: 'Aventura Espacial', icon: 'rocket' },
    { name: 'Fantasia Medieval', icon: 'star' },
    { name: 'Pós-Apocalíptico', icon: 'warning' },
];

const App = () => {
    const [word, setWord] = useState('');
    const [guessedLetters, setGuessedLetters] = useState([]);
    const [wrongGuesses, setWrongGuesses] = useState(0);
    const [message, setMessage] = useState('');
    const [currentTheme, setCurrentTheme] = useState({ name: '', icon: '' });
    const [isGameActive, setIsGameActive] = useState(false);
    const [timeLeft, setTimeLeft] = useState(60);
    const [score, setScore] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false);
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
        } else if (timeLeft === 0 || wrongGuesses >= maxWrongGuesses) {
            setIsGameActive(false);
            setIsModalVisible(true);
        }
        return () => clearInterval(timer);
    }, [isGameActive, timeLeft, wrongGuesses]);

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
        setTimeLeft(60);
        setScore(0);

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
                disabled={!isGameActive || guessedLetters.includes(letter)}
                style={[styles.button, { backgroundColor: isGameActive ? '#bf0cb1' : '#d3d3d3' }]}
            >
                <Text style={styles.buttonText}>{letter}</Text>
            </TouchableOpacity>
        ));
    };

    const renderHangman = () => {
        const currentSymbol = symbols.slice(0, wrongGuesses).join(' ');
        return <Text style={styles.hangman}>{currentSymbol}</Text>;
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
                <Text style={styles.message}>{message}</Text>
                <View style={styles.alphabetContainer}>
                    {renderAlphabet()}
                </View>
            </Animated.View>
            <TouchableOpacity style={styles.startButton} onPress={handleStartGame}>
                <Ionicons name="play" size={30} color="#fff" />
            </TouchableOpacity>

            {/* Modal para mostrar o placar */}
            <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="slide"
            >
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
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        fontFamily: 'BungeeRegular',
    },
    subtitle: {
        fontSize: 12,
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
        marginBottom: 20,
    },
    themeIcon: {
        marginRight: 10,
    },
    themeName: {
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'BungeeRegular',
        color: '#40173d',
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
        alignItems: 'center',
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
});

export default App;

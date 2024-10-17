import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Animated, KeyboardAvoidingView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import { useFonts, Bungee_400Regular } from '@expo-google-fonts/bungee';

// Definição de palavras e temas
const WORDS = {
    'Aventura Espacial': ["galaxia", "nave", "astronauta", "cometa", "buraco negro", "estrela", "planeta", "satellite", "foguete", "exploracao"],
    'Fantasia Medieval': ["cavaleiro", "castelo", "dragao", "espada", "reino", "rainha", "mago", "taverna", "aventura", "batalha"],
    'Pos-Apocaliptico': ["sobrevivente", "deserto", "mutante", "ruinas", "catastrofe", "refugio", "fome", "pandemia", "guerra", "desolacao"],
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
    const [timeLeft, setTimeLeft] = useState(30);
    const [score, setScore] = useState(0);
    const [firstWrongGuess, setFirstWrongGuess] = useState(true);
    const maxWrongGuesses = 6;
    const symbols = ['O', '-', ']', '-', '-', '<', ' '];
    const [fontsLoaded] = useFonts({ BungeeRegular: Bungee_400Regular });

    // Animações
    const titleAnimation = useState(new Animated.Value(-50))[0];
    const contentAnimation = useState(new Animated.Value(-50))[0];
    const opacityAnimation = useState(new Animated.Value(0))[0];

    // Controle do tempo e do jogo
    useEffect(() => {
        let timer;
        if (isGameActive && timeLeft > 0) {
            timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
        } else if (timeLeft === 0) {
            endGame(true, true); // Tempo esgotado
        }
        return () => clearInterval(timer);
    }, [isGameActive, timeLeft]);

    // Início do jogo
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
        setTimeLeft(30);
        setScore(0);

        // Iniciar animações
        Animated.parallel([
            Animated.timing(titleAnimation, { toValue: 0, duration: 1000, useNativeDriver: true }),
            Animated.timing(contentAnimation, { toValue: 0, duration: 1000, useNativeDriver: true }),
            Animated.timing(opacityAnimation, { toValue: 1, duration: 1000, useNativeDriver: true }),
        ]).start();
    };

    const handleGuess = (letter) => {
        if (!isGameActive || guessedLetters.includes(letter) || wrongGuesses >= maxWrongGuesses) return;

        const startTime = Date.now(); // Registro do tempo inicial
        setGuessedLetters((prev) => [...prev, letter]);

        if (word.includes(letter)) {
            const letterCount = word.split('').filter((char) => char === letter).length;

            // Calcular o tempo que levou para adivinhar a letra
            const elapsedTime = Math.floor((Date.now() - startTime) / 1000); // em segundos

            // Pontuação baseada na quantidade de letras corretas e no tempo
            const points = Math.max(0, (100 * letterCount) - elapsedTime); // Deduzir pontos com base no tempo
            setScore((prev) => prev + points);

            if (word.split('').every((char) => guessedLetters.includes(char) || char === letter)) {
                setMessage('Você ganhou!');
                setIsGameActive(false);
            }
        } else {
            const newWrongGuesses = firstWrongGuess ? wrongGuesses : wrongGuesses + 1;
            setFirstWrongGuess(false);
            setWrongGuesses(newWrongGuesses);

            if (newWrongGuesses >= maxWrongGuesses) {
                endGame(true);
            }
        }
    };

    const endGame = (isLost, isTimeUp = false) => {
        setMessage(`Fim de jogo! ${isTimeUp ? 'O tempo acabou!' : ''} A palavra era: ${word}`);
        setIsGameActive(false);
    };

    // Renderizar palavra
    const renderWord = () => {
        return word.split('').map((letter, index) => (
            <Text key={index} style={styles.letter}>
                {guessedLetters.includes(letter) ? letter : '_'}
            </Text>
        ));
    };

    // Renderizar alfabeto
    const renderAlphabet = () => {
        const alphabet = 'abcdefghijklmnopqrstuvwxyz';
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

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <ScrollView contentContainerStyle={styles.scrollViewContainer} keyboardShouldPersistTaps="handled">
                {/* Botão de voltar para a tela de início */}
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('MeuApp')}>
                    <Ionicons name="arrow-back" size={30} color="#40173d" />
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
                <View style={styles.playButtonContainer}>
                    <TouchableOpacity style={styles.startButton} onPress={handleStartGame}>
                        <Ionicons name="play" size={30} color="#fff" />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

// Estilos
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        alignItems: 'center',
    },
    scrollViewContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        shadowColor: '#40173d',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
    },
    title: {
        fontFamily: 'BungeeRegular',
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#40173d',
    },
    subtitle: {
        fontFamily: 'BungeeRegular',
        fontSize: 15,
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
        marginBottom: 10,
        color: '#40173d',
    },
    themeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        color: '#40173d',
    },
    themeIcon: {
        marginRight: 10,
        color: '#40173d',
    },
    themeName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#40173d',
    },
    hangmanContainer: {
        marginBottom: 20,
    },
    hangman: {
        fontSize: 40,
        textAlign: 'center',
    },
    wordContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    letter: {
        fontSize: 18,
        marginHorizontal: 5,
    },
    alphabetContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#bf0cb1',
        borderRadius: 40,
        padding: 20,
        margin: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
    },
    playButtonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
    },
    startButton: {
        backgroundColor: '#bc0cb1',
        borderRadius: 50,
        padding: 15,
    },
});

export default Forca;

import React, { useState } from 'react';
import { ScrollView, StyleSheet, Button, Text, View } from 'react-native';

const WORDS = ["javascript", "react", "node", "programming", "development"];

const App = () => {
    const [word, setWord] = useState('');
    const [guessedLetters, setGuessedLetters] = useState([]);
    const [wrongGuesses, setWrongGuesses] = useState(0);
    const [message, setMessage] = useState('');
    const maxWrongGuesses = 6;

    const symbols = ['O', '-', '-', ']', '-', '-', '<'];

    const handleStartGame = () => {
        const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)];
        setWord(randomWord);
        setGuessedLetters([]);
        setWrongGuesses(0);
        setMessage('');
    };

    const handleGuess = (letter) => {
        if (guessedLetters.includes(letter) || wrongGuesses >= maxWrongGuesses) return;

        setGuessedLetters([...guessedLetters, letter]);

        if (!word.includes(letter)) {
            setWrongGuesses(wrongGuesses + 1);
        }

        if (wrongGuesses + 1 >= maxWrongGuesses) {
            setMessage(`Você perdeu! A palavra era: ${word}`);
        }

        if (word.split('').every((char) => guessedLetters.includes(char))) {
            setMessage('Você ganhou! A palavra é: ' + word);
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
            <Button
                key={letter}
                title={letter}
                onPress={() => handleGuess(letter)}
                disabled={guessedLetters.includes(letter) || wrongGuesses >= maxWrongGuesses}
            />
        ));
    };

    const renderHangman = () => {
        const currentSymbol = symbols.slice(0, wrongGuesses).join(' ');
        return <Text style={styles.hangman}>{currentSymbol}</Text>;
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Jogo da Forca</Text>
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
            <Button title="Começar Novo Jogo" onPress={handleStartGame} />
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
    },
    alphabetContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 20,
    },
});

export default App;

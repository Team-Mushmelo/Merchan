import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Modal, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useFonts, Bungee_400Regular } from '@expo-google-fonts/bungee';

const COLS = 10;
const ROWS = 13;
const BLOCK_SIZE = Math.floor(Dimensions.get('window').width / COLS);

const createEmptyGrid = () => {
    return Array.from({ length: ROWS }, () => Array(COLS).fill(null));
};

const randomPiece = () => {
    const pieces = [
      { shape: [[1]], color: 'red' }, // Bloco simples
      { shape: [[1, 1]], color: 'blue' }, // Linha de 2 blocos
      { shape: [[1, 1, 1]], color: 'green' }, // Linha de 3 blocos
      { shape: [[1, 1, 1, 1]], color: 'cyan' }, // Linha de 4 blocos (parecido com o "I")
      { shape: [[1], [1]], color: 'purple' }, // Coluna de 2 blocos
      { shape: [[1], [1], [1]], color: 'orange' }, // Coluna de 3 blocos
      { shape: [[1, 1], [1, 1]], color: 'yellow' }, // Quadrado 2x2 (parecido com o "O")
      { shape: [[1, 1, 0], [0, 1, 1]], color: 'pink' }, // "S"
      { shape: [[0, 1, 1], [1, 1, 0]], color: 'lime' }, // "Z"
      { shape: [[0, 1, 0], [1, 1, 1]], color: 'magenta' }, // "T"
      { shape: [[1, 1, 0], [0, 1, 0], [0, 1, 0]], color: 'brown' }, // L invertido
      { shape: [[0, 1, 1], [0, 0, 1], [0, 0, 1]], color: 'indigo' } // L normal
    ];
  
    return pieces[Math.floor(Math.random() * pieces.length)];
  };
  

const Tetris = () => {
    const [fontsLoaded] = useFonts({ BungeeRegular: Bungee_400Regular });
    const navigation = useNavigation();
    const [grid, setGrid] = useState(createEmptyGrid());
    const [currentPiece, setCurrentPiece] = useState(randomPiece());
    const [nextPiece, setNextPiece] = useState(randomPiece());
    const [position, setPosition] = useState({ x: 3, y: 0 });
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            move(0, 1); // Move a peça para baixo a cada intervalo
        }, 1000);

        return () => clearInterval(interval);
    }, [currentPiece, position]); // Adicionado position para garantir que o movimento seja rastreado

    const move = (dx, dy) => {
        const newPosition = { x: position.x + dx, y: position.y + dy };

        if (!isCollision(newPosition, currentPiece)) {
            setPosition(newPosition); // Atualiza a posição
        } else if (dy !== 0) { // Se a peça não pode descer
            mergePiece(); // Mescla a peça ao grid
            setCurrentPiece(nextPiece);
            setNextPiece(randomPiece());
            setPosition({ x: 3, y: 0 }); // Reinicia a posição
            if (isCollision(position, currentPiece)) {
                setGameOver(true); // Se colidir no início, termina o jogo
            }
        }
    };

    const isCollision = (pos, piece) => {
        return piece.shape.some((row, rowIndex) =>
            row.some((block, colIndex) => {
                if (!block) return false;
                const x = pos.x + colIndex;
                const y = pos.y + rowIndex;
                return (
                    x < 0 || 
                    x >= COLS || 
                    y >= ROWS || 
                    (grid[y] && grid[y][x])
                );
            })
        );
    };

    const mergePiece = () => {
        const newGrid = grid.map(row => row.slice());
        currentPiece.shape.forEach((row, rowIndex) => {
            row.forEach((block, colIndex) => {
                if (block) {
                    newGrid[position.y + rowIndex][position.x + colIndex] = currentPiece.color;
                }
            });
        });
        setGrid(newGrid);
        setScore(prevScore => prevScore + 10);
        checkForFullRows(newGrid);
    };

    const checkForFullRows = (newGrid) => {
        const newGridWithClearedRows = newGrid.filter(row => row.some(block => block === null));
        const rowsCleared = ROWS - newGridWithClearedRows.length;
        if (rowsCleared > 0) {
            const clearedRows = Array.from({ length: rowsCleared }, () => Array(COLS).fill(null));
            setGrid(clearedRows.concat(newGridWithClearedRows));
            setScore(prevScore => prevScore + rowsCleared * 100); // Pontuação por linhas limpas
        }
    };

    const rotatePiece = () => {
        const newShape = currentPiece.shape[0].map((val, index) =>
            currentPiece.shape.map(row => row[index]).reverse()
        );

        const originalShape = currentPiece.shape;
        setCurrentPiece({ ...currentPiece, shape: newShape });

        if (isCollision(position, currentPiece)) {
            setCurrentPiece({ ...currentPiece, shape: originalShape }); // Reverte se colidir
        }
    };

    const restartGame = () => {
        setGrid(createEmptyGrid());
        setCurrentPiece(randomPiece());
        setNextPiece(randomPiece());
        setPosition({ x: 3, y: 0 });
        setScore(0);
        setGameOver(false);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('MeuApp')}>
                <Ionicons name="arrow-back" size={30} color="#40173D" />
            </TouchableOpacity>

            <Text style={styles.score}>Score: {score}</Text>
            <Text style={styles.highScore}>High Score: {highScore}</Text>
            <View style={styles.grid}>
                {grid.map((row, rowIndex) => (
                    <View key={rowIndex} style={styles.row}>
                        {row.map((block, colIndex) => (
                            <View
                                key={colIndex}
                                style={[styles.block, block ? styles.filledBlock : styles.emptyBlock]}
                            />
                        ))}
                    </View>
                ))}
                {currentPiece.shape.map((row, rowIndex) => (
                    row.map((block, colIndex) => (
                        block ? (
                            <View
                                key={`piece-${rowIndex}-${colIndex}`}
                                style={[
                                    styles.block,
                                    {
                                        position: 'absolute',
                                        top: (position.y + rowIndex) * BLOCK_SIZE,
                                        left: (position.x + colIndex) * BLOCK_SIZE,
                                        backgroundColor: currentPiece.color,
                                    },
                                ]}
                            />
                        ) : null
                    ))
                ))}
            </View>
            {nextPiece.shape.length > 0 && (
                <View style={styles.nextPieceContainer}>
                    <Text style={styles.nextPieceText}>Next Piece:</Text>
                    {nextPiece.shape.map((row, rowIndex) => (
                        <View key={rowIndex} style={styles.row}>
                            {row.map((block, colIndex) => (
                                <View
                                    key={colIndex}
                                    style={[styles.block, block ? { backgroundColor: nextPiece.color } : styles.emptyBlock]}
                                />
                            ))}
                        </View>
                    ))}
                </View>
            )}
            <View style={styles.controls}>
                <TouchableOpacity onPress={() => move(-1, 0)} style={styles.controlButton}>
                    <Text style={styles.controlText}>⬅</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={rotatePiece} style={styles.controlButton}>
                    <Text style={styles.controlText}>⟲</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => move(1, 0)} style={styles.controlButton}>
                    <Text style={styles.controlText}>⮕</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => move(0, 1)} style={styles.controlButton}>
                    <Text style={styles.controlText}>⬇</Text>
                </TouchableOpacity>
            </View>
            <Modal visible={gameOver} transparent>
                <View style={styles.modalContainer}>
                    <Text style={styles.gameOverText}>Game Over!</Text>
                    <TouchableOpacity onPress={restartGame} style={styles.restartButton}>
                        <Text style={styles.restartButtonText}>Restart</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
    },
    score: {
        color: '#40173D',
        fontSize: 20,
        position: 'absolute',
        color:'#40173d',
        fontFamily: 'BungeeRegular',
        top: 60,
        left: 20,
    },
    highScore: {
        color: '#40173D',
        fontSize: 20,
        position: 'absolute',
        color:'#40173d',
        fontFamily: 'BungeeRegular',
        top: 60,
        right: 20,
    },
    grid: {
        width: BLOCK_SIZE * COLS,
        height: BLOCK_SIZE * ROWS,
        backgroundColor: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden',
        borderColor: '#40173D',
        borderWidth: 2,
    },
    row: {
        flexDirection: 'row',
    },
    block: {
        width: BLOCK_SIZE,
        height: BLOCK_SIZE,
    },
    filledBlock: {
        backgroundColor: '#bc0cb1',
        borderColor: '#40173D',
        borderWidth: 1,
    },
    emptyBlock: {
        backgroundColor: 'transparent',
    },
    nextPieceContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    nextPieceText: {
        color: '#40173D',
        fontSize: 18,
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'center', // Centraliza os botões
        marginTop: 20,
        width: '100%',
    },
    controlButton: {
        padding: 10,
        backgroundColor: '#40173d',
        borderRadius: 5,
        marginHorizontal: 5, // Diminui o espaço horizontal entre os botões
    },
    controlText: {
        color: 'white',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    gameOverText: {
        fontSize: 30,
        color: 'white',
    },
    finalScoreText: {
        fontSize: 20,
        color: 'white',
        marginVertical: 20,
    },
    restartButton: {
        padding: 10,
        backgroundColor: '#40173d',
        borderRadius: 5,
    },
    restartButtonText: {
        color: 'white',
        fontSize: 18,
    },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        borderRadius: 20,
        padding: 10,
        elevation: 4,
        shadowColor: '#40173D',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        zIndex: 10,
    },
});

export default Tetris;

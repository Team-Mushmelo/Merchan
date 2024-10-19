import React, { useState, useEffect } from 'react';
import { View, PanResponder, Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Importação do Ionicons


// Dimensões da tela
const { width, height } = Dimensions.get('window');

// Parâmetros do jogo
const paddleHeight = 10; // Altura da paddle
const ballRadius = 10; // Raio da bola
const brickHeight = 30; // Altura dos tijolos
const baseColumns = 3; // Número base de colunas para o primeiro nível
const levels = [6, 12, 20, 24, 28]; // Número de tijolos por nível

export default function App() {
  const navigation = useNavigation();
  const [paddleX, setPaddleX] = useState((width / 2) - (width / 8)); // Posição inicial da paddle
  const [ballX, setBallX] = useState(width / 2); // Posição inicial da bola
  const [ballY, setBallY] = useState(height / 2); // Posição inicial da bola
  const [ballDX, setBallDX] = useState(2); // Direção inicial da bola (X)
  const [ballDY, setBallDY] = useState(3); // Direção inicial da bola (Y)
  const [bricks, setBricks] = useState([]); // Estado dos tijolos
  const [isPlaying, setIsPlaying] = useState(false); // Estado do jogo
  const [currentLevel, setCurrentLevel] = useState(0); // Nível atual
  const [completedLevels, setCompletedLevels] = useState(0); // Contador de níveis completos
  const [gameOver, setGameOver] = useState(false); // Estado do jogo
  const [gameWon, setGameWon] = useState(false); // Estado de jogo zerado
  const [isBallMoving, setIsBallMoving] = useState(false); // Estado para controlar o movimento da bola

  // Cria os tijolos para o nível atual
  const createBricks = (numColumns) => {
    const numBricks = levels[currentLevel]; // Total de tijolos no nível
    const newBricks = Array(numBricks).fill(true);
    return newBricks;
  };

  // Inicializa os tijolos do nível inicial
  useEffect(() => {
    const numColumns = baseColumns + currentLevel; // Aumenta o número de colunas com o nível
    const initialBricks = createBricks(numColumns);
    setBricks(initialBricks);
    resetBallAndPaddle(); // Reseta a posição da bola e paddle ao mudar de nível
  }, [currentLevel]);

  // Movimenta a bola a cada atualização
  useEffect(() => {
    if (isPlaying && isBallMoving) {
      const interval = setInterval(() => {
        moveBall();
      }, 16); // Aproximadamente 60 fps
      return () => clearInterval(interval);
    }
  }, [ballX, ballY, ballDX, ballDY, isPlaying, isBallMoving]);

  // Função para reposicionar a bola e paddle no início do jogo
  const resetBallAndPaddle = () => {
    setBallX(width / 2); // Centraliza a bola
    setBallY(height / 2); // Centraliza a bola
    setPaddleX((width / 2) - (width / 8)); // Centraliza a paddle
  };

  // Função de movimentação da bola e colisões
  const moveBall = () => {
    let newBallX = ballX + ballDX;
    let newBallY = ballY + ballDY;

    // Colisão com as paredes laterais
    if (newBallX <= ballRadius || newBallX >= width - ballRadius) {
      setBallDX(-ballDX);
      newBallX = newBallX <= ballRadius ? ballRadius : width - ballRadius; // Corrige a posição da bola
    }

    // Colisão com o topo
    if (newBallY <= ballRadius) {
      setBallDY(-ballDY);
      newBallY = ballRadius; // Corrige a posição da bola
    }

    // Colisão com a paddle (barra do jogador)
    if (
      newBallY >= height - paddleHeight - ballRadius &&
      newBallX >= paddleX &&
      newBallX <= paddleX + width / 4 // Tamanho da paddle
    ) {
      setBallDY(-ballDY);
      newBallY = height - paddleHeight - ballRadius; // Corrige a posição da bola
    }

    // Verifica se a bola caiu (fim de jogo)
    if (newBallY > height) {
      setGameOver(true); // Ativa o estado de game over
      setIsPlaying(false); // Para o jogo
      return; // Não atualiza a posição da bola
    }

    // Verificar colisão com tijolos
    checkBrickCollision(newBallX, newBallY);

    // Atualiza a posição da bola
    setBallX(newBallX);
    setBallY(newBallY);
  };

  // Função para verificar colisão com os tijolos
  const checkBrickCollision = (newBallX, newBallY) => {
    const numBricks = levels[currentLevel];
    const numColumns = baseColumns + currentLevel; // Atualiza o número de colunas
    const brickWidth = width / numColumns; // Largura de cada tijolo

    for (let i = 0; i < numBricks; i++) {
      const brickX = (i % numColumns) * brickWidth; // Posição horizontal do tijolo
      const brickY = Math.floor(i / numColumns) * brickHeight; // Posição vertical do tijolo

      if (
        bricks[i] && // O tijolo está ativo
        newBallX >= brickX &&
        newBallX <= brickX + brickWidth &&
        newBallY >= brickY &&
        newBallY <= brickY + brickHeight
      ) {
        // Remove o tijolo e inverte a direção da bola
        const updatedBricks = [...bricks];
        updatedBricks[i] = false;
        setBricks(updatedBricks);
        setBallDY(-ballDY); // Inverte a direção da bola verticalmente

        // Verifica se todos os tijolos foram destruídos
        if (updatedBricks.every((brick) => !brick)) {
          nextLevel();
        }
        return;
      }
    }
  };

  // Função para ir para o próximo nível
  const nextLevel = () => {
    if (currentLevel < levels.length - 1) {
      setCompletedLevels(completedLevels + 1); // Incrementa o contador de níveis completos
      setCurrentLevel(currentLevel + 1);
      setIsBallMoving(true); // Inicia o movimento da bola ao mudar de nível
    } else {
      // Se o jogador completou o jogo
      setGameWon(true); // Ativa o estado de jogo zerado
      setIsPlaying(false); // Para o jogo
    }
  };

  // Função para reposicionar a bola e paddle no início do jogo
  const resetGame = () => {
    resetBallAndPaddle(); // Reseta a posição da bola e paddle
    setBallDX(2); // Reinicia a direção da bola (X)
    setBallDY(3); // Reinicia a direção da bola (Y)
    setCurrentLevel(0); // Reseta para o primeiro nível
    setCompletedLevels(0); // Reseta o contador de níveis completos
    setBricks(createBricks(baseColumns)); // Reinicializa os tijolos para o primeiro nível
    setGameOver(false); // Reseta o estado de game over
    setGameWon(false); // Reseta o estado de jogo zerado
    setIsBallMoving(false); // Pausa o movimento da bola
    setIsPlaying(false); // Pausa o jogo
  };

  // Movimenta a paddle de acordo com o gesto do usuário
  const handlePaddleMove = (gestureState) => {
    const newPaddleX = gestureState.moveX - (width / 8); // Centraliza a paddle
    if (newPaddleX >= 0 && newPaddleX <= width - (width / 4)) {
      setPaddleX(newPaddleX);
    }
  };

  // PanResponder para detectar movimento de toque
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => handlePaddleMove(gestureState),
  });

  // Renderiza os tijolos na tela
  const renderBricks = () => {
    const numBricks = levels[currentLevel];
    const numColumns = baseColumns + currentLevel;
    const brickWidth = width / numColumns;

    return bricks.map((isActive, index) => {
      if (!isActive) return null; // Não renderiza tijolos destruídos

      const brickX = (index % numColumns) * brickWidth; // Posição horizontal do tijolo
      const brickY = Math.floor(index / numColumns) * brickHeight; // Posição vertical do tijolo

      return (
        <View
          key={index}
          style={[
            styles.brick,
            {
              width: brickWidth,
              height: brickHeight,
              left: brickX,
              top: brickY,
            },
          ]}
        />
      );
    });
  };

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('MeuApp')}>
                    <Ionicons name="arrow-back" size={30} color="#40173d" />
                </TouchableOpacity>
      {/* Renderiza a paddle */}
      <View
        style={[
          styles.paddle,
          {
            width: width / 4,
            height: paddleHeight,
            left: paddleX,
            bottom: 0,
          },
        ]}
      />

      {/* Renderiza a bola */}
      <View
        style={[
          styles.ball,
          {
            width: ballRadius * 2,
            height: ballRadius * 2,
            left: ballX - ballRadius,
            top: ballY - ballRadius,
          },
        ]}
      />

      {/* Renderiza os tijolos */}
      {renderBricks()}

      {/* Mensagem de Game Over */}
      {gameOver && (
        <View style={styles.gameOverContainer}>
          <Text style={styles.gameOverText}>Game Over!</Text>
          <TouchableOpacity style={styles.restartButton} onPress={resetGame}>
            <Text style={styles.restartButtonText}>Reiniciar</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Mensagem de Jogo ZERADO */}
      {gameWon && (
        <View style={styles.gameWonContainer}>
          <Text style={styles.gameWonText}>Você zerou o jogo!</Text>
          <TouchableOpacity style={styles.restartButton} onPress={resetGame}>
            <Text style={styles.restartButtonText}>Reiniciar</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Botão de Start para iniciar o jogo */}
      {!isPlaying && !gameOver && !gameWon && (
        <TouchableOpacity style={styles.startButton} onPress={() => {
          resetGame(); // Reseta o jogo ao iniciar
          setIsBallMoving(true); // Inicia o movimento da bola
          setIsPlaying(true); // Inicia o jogo
        }}>
          <Text style={styles.startButtonText}>Start</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
    backButton: {
    position: 'absolute',   // Faz o botão ficar em posição absoluta
    top: height - 800,      // Define a distância do topo (ajuste o valor conforme necessário)
    left: 20,               // Distância da lateral esquerda da tela
    padding: 10,            // Espaçamento interno
    backgroundColor: 'white', // Cor do fundo do botão
    borderRadius: 5,  
    },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  paddle: {
    position: 'absolute',
    backgroundColor: '#40173d',
  },
  ball: {
    position: 'absolute',
    borderRadius: 50,
    backgroundColor: '#40173d',
  },
  brick: {
    position: 'absolute',
    backgroundColor: '#bc0cb1',
    borderWidth: 0.5,
    borderColor: '#40173d',
  },
  gameOverContainer: {
    position: 'absolute',
    top: height / 2 - 50,
    left: width / 2 - 100,
    width: 200,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#bc0cb1',
    borderRadius: 10,
  },
  gameWonContainer: {
    position: 'absolute',
    top: height / 2 - 50,
    left: width / 2 - 100,
    width: 200,
    height: 200,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#bc0cb1',
    borderRadius: 10,
  },
  gameOverText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  gameWonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  startButton: {
    position: 'absolute',
    top: height / 2 - 30,
    left: width / 2 - 50,
    width: 100,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#bc0cb1',
    borderRadius: 10,
  },
  startButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  restartButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  restartButtonText: {
    color: '#40173d',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

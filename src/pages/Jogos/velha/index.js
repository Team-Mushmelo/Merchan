import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Importando o ícone para o botão de voltar
import { useNavigation } from '@react-navigation/native'; // Importando a navegação
import { useFonts, Bungee_400Regular } from '@expo-google-fonts/bungee';

const App = () => {
  const navigation = useNavigation(); // Obtendo a navegação
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [status, setStatus] = useState('');
  const [fontsLoaded] = useFonts({ BungeeRegular: Bungee_400Regular });

  const handlePress = (index) => {
    if (board[index] || calculateWinner(board)) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const winner = calculateWinner(newBoard);
    if (winner) {
      setStatus(`${winner} ganhou!`);
    } else if (!newBoard.includes(null)) {
      setStatus('Empate!');
    } else {
      setStatus('');
    }
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setStatus('');
  };

  const renderSquare = (index) => {
    return (
      <TouchableOpacity
        style={[styles.square, getCornerStyle(index)]}
        onPress={() => handlePress(index)}
      >
        <Text style={styles.squareText}>{board[index]}</Text>
      </TouchableOpacity>
    );
  };

  const getCornerStyle = (index) => {
    switch (index) {
      case 0: // Top left
        return { borderTopLeftRadius: 20 };
      case 1: // Top middle
        return {}; // Middle squares remain square
      case 2: // Top right
        return { borderTopRightRadius: 20 };
      case 3: // Middle left
        return {}; // Middle squares remain square
      case 4: // Center
        return {}; // Center remains square
      case 5: // Middle right
        return {}; // Middle squares remain square
      case 6: // Bottom left
        return { borderBottomLeftRadius: 20 };
      case 7: // Bottom middle
        return {}; // Middle squares remain square
      case 8: // Bottom right
        return { borderBottomRightRadius: 20 };
      default:
        return {};
    }
  };

  return (
    <View style={styles.container}>
      {/* Botão de voltar para a tela anterior */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={30} color="#40173d" />
      </TouchableOpacity>
      
      <Text style={styles.title}>Jogo da Velha</Text>
      <Text style={styles.status}>{status}</Text>
      <View style={styles.board}>
        {Array(3)
          .fill(null)
          .map((_, row) => (
            <View style={styles.row} key={row}>
              {Array(3)
                .fill(null)
                .map((_, col) => renderSquare(row * 3 + col))}
            </View>
          ))}
      </View>
      <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
        <Text style={styles.resetText}>Reiniciar</Text>
      </TouchableOpacity>
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
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    borderRadius: 20,
    padding: 10,
    elevation: 4,
    shadowColor: '#40173d',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
},
  title: {
    fontSize: 30,
    marginBottom: 20,
    color:'#40173d',
    fontFamily: 'BungeeRegular',
  },
  status: {
    fontSize: 20,
    marginBottom: 20,
    color: '#40173d',
    fontFamily: 'BungeeRegular',
  },
  board: {
    borderWidth: 5,
    borderColor: '#40173d',
    marginBottom: 20,
    borderRadius: 30,
  },
  row: {
    color: '#40173d',
    flexDirection: 'row',
  },
  square: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#40173d',
  },
  squareText: {
    fontSize: 40,
  },
  resetButton: {
    backgroundColor: '#bc0cb1',
    padding: 10,
    borderRadius: 15,
  },
  resetText: {
    color: '#fff',
    fontSize: 20,
  },
});

export default App;

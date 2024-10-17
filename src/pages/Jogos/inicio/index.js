import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts, Bungee_400Regular } from '@expo-google-fonts/bungee';

const Inicio = () => {
  const navigation = useNavigation();
  
  const [fontsLoaded] = useFonts({ BungeeRegular: Bungee_400Regular });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escolha um Jogo</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('forca')}
      >
        <Text style={styles.buttonText}>Jogo da Forca</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('velha')}
      >
        <Text style={styles.buttonText}>Jogo da Velha</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('memoria')}
      >
        <Text style={styles.buttonText}>Jogo da Memória</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('tetris')}
      >
        <Text style={styles.buttonText}>Jogo da Tetris</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',  // Centraliza verticalmente
    alignItems: 'center',       // Centraliza horizontalmente
    backgroundColor: '#f5f5f5', // Cor de fundo
  },
  title: {
    fontFamily: 'BungeeRegular',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30, // Espaçamento abaixo do título
    textAlign: 'center',
    color: '#40173d',
  },
  button: {
    backgroundColor: '#bc0cb1', // Cor de fundo do botão
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 20, // Espaçamento entre os botões
    width: '90%',
    textAlign: 'center',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Inicio;

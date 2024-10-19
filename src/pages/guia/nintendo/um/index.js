import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const GameBoyPage = () => {
  const navigation = useNavigation();

  const consoles = [
    { id: '1', name: "Game Boy (1989)", description: "O primeiro console portátil da Nintendo.", games: ["Tetris", "Super Mario Land"], purchaseLink: "https://www.amazon.com.br/s?k=game+boy+original" },
    { id: '2', name: "Game Boy Color (1998)", description: "Console portátil com tela colorida.", games: ["Pokémon Gold", "The Legend of Zelda: Oracle of Seasons"], purchaseLink: "https://www.amazon.com.br/s?k=game+boy+color" },
    { id: '3', name: "Game Boy Advance (2001)", description: "Console portátil com gráficos 32-bits.", games: ["Metroid Fusion", "Final Fantasy Tactics Advance"], purchaseLink: "https://www.amazon.com.br/s?k=game+boy+advance" },
    { id: '4', name: "Nintendo DS (2004)", description: "Console com tela dupla e toque sensível.", games: ["Nintendogs", "Brain Age"], purchaseLink: "https://www.amazon.com.br/s?k=nintendo+ds" },
    // Adicione outros consoles aqui conforme necessário...
  ];

  const handlePurchase = (link) => {
    Linking.openURL(link); // Abre o link em um navegador
  };

  return (
    <View style={styles.container}>
      {/* Botão de Voltar */}
      <View style={styles.backButton}>
        <Ionicons name="arrow-back" size={30} color="#40173d" onPress={() => navigation.goBack()} />
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContainer} 
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Game Boy (1989)</Text>

        <Text style={styles.sectionTitle}>Histórico</Text>
        <Text style={styles.text}>
          O Game Boy é um console portátil da Nintendo lançado em 1989, marcando um ponto de virada na indústria de jogos.
        </Text>

        <Text style={styles.sectionTitle}>Características</Text>
        <Text style={styles.text}>- Tela LCD de 2,6 polegadas com gráficos em escala de cinza.</Text>
        <Text style={styles.text}>- Processador Z80 personalizado.</Text>
        <Text style={styles.text}>- Memória de 8 KB de RAM.</Text>
        <Text style={styles.text}>- Operava com 4 pilhas AA, com duração de 10 a 30 horas.</Text>

        <Text style={styles.sectionTitle}>Jogos Notáveis</Text>
        <Text style={styles.text}>- Tetris</Text>
        <Text style={styles.text}>- Super Mario Land</Text>
        <Text style={styles.text}>- The Legend of Zelda: Link's Awakening</Text>
        <Text style={styles.text}>- Pokémon Red e Blue</Text>

        <Text style={styles.sectionTitle}>Impacto</Text>
        <Text style={styles.text}>
          O Game Boy vendeu mais de 118 milhões de unidades, ajudando a Nintendo a se tornar líder de mercado.
        </Text>

        <Text style={styles.sectionTitle}>Legado</Text>
        <Text style={styles.text}>
          O sucesso do Game Boy levou ao desenvolvimento de versões como o Game Boy Color e o Game Boy Advance.
        </Text>

        {/* Botão de compra */}
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => handlePurchase(consoles[0].purchaseLink)} // Adapta para o console correto
        >
          <Text style={styles.buttonText}>Comprar Aqui</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#bc0cb1',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    paddingTop: 50,
    margin: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 50,
  },
  title: {
    fontSize: 16, // Tamanho da fonte reduzido
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#bc0cb1',
  },
  sectionTitle: {
    fontSize: 14, // Tamanho da fonte reduzido
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center', // Centralizando o subtítulo
    color: '#40173d',
  },
  text: {
    fontSize: 12, // Tamanho da fonte reduzido
    lineHeight: 18,
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
});

export default GameBoyPage;

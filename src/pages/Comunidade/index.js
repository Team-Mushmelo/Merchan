import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Carousel from '../Home/Components/carrossel'; // Certifique-se de que o caminho está correto
import Icon from 'react-native-vector-icons/MaterialIcons';

// Função de simulação para selecionar imagem
const pickImage = (setItems) => {
  console.log('Selecionar imagem...');
};

export default function Comunidade() {
  const [items1, setItems1] = useState([
    { id: '1', color: '#ff6347' },
    { id: '2', color: '#ffa07a' },
    { id: '3', color: '#20b2aa' },
    { id: '4', color: '#4682b4' },
    { id: '5', color: '#6a5acd' },
  ]);

  // Simulação de dados para o feed
  const feed = [
    { nome: 'Item 1' },
    { nome: 'Item 2' },
    { nome: 'Item 3' },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.square}>
      <Text style={styles.text}>{item.color}</Text>
    </View>
  );

  return (
    <View style={styles.outerContainer}>
      <View style={styles.carouselSection}>
        <Text style={styles.title}>Exemplo</Text>
        <FlatList
          data={items1}
          keyExtractor={(item) => item.id}
          horizontal
          renderItem={renderItem}
          contentContainerStyle={styles.flatListContent}
          showsHorizontalScrollIndicator={false}
        />
        <Carousel items={items1} style={styles.carouselFullWidth} />
      </View>
      <FlatList
        data={feed}
        keyExtractor={(item) => item.nome}
        renderItem={({ item }) => <Dados data={item} />}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
}

function Dados({ data }) {
  return (
    <View style={styles.areaDados}>
      <Text style={styles.textoDados}>nome: {data.nome}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  carouselSection: {
    width: '100%', // Garante que a seção de carrossel ocupe toda a largura da tela
    alignItems: 'center', // Centraliza o conteúdo horizontalmente
    paddingHorizontal: 0, // Remove qualquer padding horizontal
  },
  carouselWrapper: {
    width: '100%',
    overflow: 'hidden', // Garante que o conteúdo horizontal não ultrapasse os limites
  },
  carouselFullWidth: {
    width: '100%', // Faz com que o carrossel ocupe a tela toda horizontalmente
  },
  flatListContainer: {
    flexGrow: 1, // Ajusta o conteúdo para preencher o espaço restante
    backgroundColor: '#fff',
    alignItems: 'center', // Centraliza todos os itens horizontalmente
  },
  areaDados: {
    marginTop: 15,
    backgroundColor: '#ebe8e2',
    height: 100,
    marginBottom: 5,
    borderRadius: 25,
    padding: 10,
    width: '90%', // Ajusta a largura da área de dados para caber na tela
    borderWidth: 1,
    borderColor: '#40173d',
    alignItems: 'center', // Centraliza o texto horizontalmente
    justifyContent: 'center', // Centraliza o texto verticalmente
  },
  textoDados: {
    color: '#40173d',
    fontSize: 20,
    padding: 5,
    textAlign: 'center', // Centraliza o texto dentro da área de dados
  },
  square: {
    width: 100,
    height: 70,
    margin: 5,
    borderRadius: 25,
    justifyContent: 'center', // Centraliza o texto dentro do quadrado
    alignItems: 'center', // Centraliza o texto dentro do quadrado
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 0, // Remove a margem abaixo do título
    paddingHorizontal: 0, // Remove padding horizontal se houver
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    lineHeight: 70,
    fontSize: 14,
  },
  flatListContent: {
    alignItems: 'center',
  },
});

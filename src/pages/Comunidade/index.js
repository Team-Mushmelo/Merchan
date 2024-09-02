import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Carousel from '../Home/Components/carrossel';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Defina a função pickImage para evitar erro
const pickImage = (setItems) => {
  // Simulação de seleção de imagem, substitua com lógica real se necessário
  console.log('Selecionar imagem...');
};

export default function Comunidade() {
  const [items1, setItems1] = useState([
    { id: '1', color: '#bf0cb1' },
    { id: '2', color: '#bf0cb1' }, 
    { id: '3', color: '#bf0cb1' },
    { id: '4', color: '#bf0cb1' }, 
    { id: '5', color: '#bf0cb1' },  
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
        <View style={styles.carouselWrapper}>
          <FlatList
            data={items1}
            keyExtractor={(item) => item.id}
            horizontal
            renderItem={renderItem}
            contentContainerStyle={styles.flatListContent}
            showsHorizontalScrollIndicator={false}
          />
        </View>
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
    marginBottom: 0, // Remove espaço abaixo do carrossel
  },
  carouselWrapper: {
    width: '100%',
    overflow: 'hidden', // Garante que o conteúdo horizontal não ultrapasse os limites
    marginBottom: 0, // Remove espaço abaixo do carrossel
  },
  carouselFullWidth: {
    width: '100%', // Faz com que o carrossel ocupe a tela toda horizontalmente
    marginBottom: 0, // Remove espaço abaixo do carrossel
  },
  flatListContainer: {
    flexGrow: 1, // Ajusta o conteúdo para preencher o espaço restante
    backgroundColor: '#fff',
  },
  areaDados: {
    marginTop: 15,
    backgroundColor: '#ebe8e2',
    height: 100,
    marginBottom: 5,
    borderRadius: 25,
    padding: 10,
    width: 400,
    borderWidth: 1,
    borderColor: '#40173d',
  },
  textoDados: {
    color: '#40173d',
    fontSize: 20,
    padding: 5,
  },
  square: {
    width: 100,
    height: 70,
    margin: 5,
    borderRadius: 25,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
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

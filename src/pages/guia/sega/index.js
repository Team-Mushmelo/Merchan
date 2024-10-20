import React from 'react';
import { StyleSheet, Text, View, Linking, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const consoles = [
  { 
    id: '1', 
    name: "Sega Genesis (1988)", 
    description: "Prepare-se para uma viagem nostálgica com o icônico Sega Genesis, lançado em 1988. Este console revolucionou os games, trazendo gráficos em 16 bits e uma biblioteca de clássicos como Sonic the Hedgehog, Mortal Kombat e Streets of Rage. O Sega Genesis conquistou jogadores de todas as idades e se tornou um ícone na história dos videogames. Reviva a emoção dos jogos clássicos ou descubra o Genesis pela primeira vez. O Sega Genesis espera por você!", 
    games: [
      { name: "Sonic the Hedgehog", details: "Detalhes sobre Sonic the Hedgehog", purchaseLink: "https://www.gamestop.com/video-games/products/sonic-the-hedgehog---sega-genesis/10064166.html" }, 
      { name: "Mortal Kombat", details: "Detalhes sobre Mortal Kombat", purchaseLink: "https://www.gamestop.com/video-games/products/mortal-kombat---sega-genesis/10064587.html" }
    ], 
    purchaseLink: "https://www.amazon.com.br/s?k=sega+genesis" 
  },
  { 
    id: '2', 
    name: "Sega Saturn (1994)", 
    description: "Mergulhe na nostalgia do Sega Saturn, lançado em 1994, que trouxe gráficos em 3D e uma vasta biblioteca de títulos icônicos como Virtua Fighter 2 e Sonic 3D Blast. Este console se consolidou como um favorito entre os gamers, oferecendo uma experiência de jogo incomparável. Reviva as emoções do Sega Saturn ou descubra esta joia pela primeira vez!", 
    games: [
      { name: "Virtua Fighter 2", details: "Detalhes sobre Virtua Fighter 2", purchaseLink: "https://www.gamestop.com/video-games/products/virtua-fighter-2---sega-saturn/10064695.html" }, 
      { name: "Sonic 3D Blast", details: "Detalhes sobre Sonic 3D Blast", purchaseLink: "https://www.gamestop.com/video-games/products/sonic-3d-blast---sega-saturn/10064448.html" }
    ], 
    purchaseLink: "https://www.amazon.com.br/s?k=sega+saturn" 
  },
  { 
    id: '3', 
    name: "Sega Dreamcast (1998)", 
    description: "Descubra o Sega Dreamcast, lançado em 1998, que revolucionou os jogos com sua conexão à Internet e uma vasta biblioteca de títulos. Com jogos como Shenmue e Jet Set Radio, o Dreamcast estabeleceu novos padrões para a indústria de jogos. Reviva a magia do Sega Dreamcast ou descubra este console pela primeira vez. O futuro dos jogos está na palma da sua mão!", 
    games: [
      { name: "Shenmue", details: "Detalhes sobre Shenmue", purchaseLink: "https://www.gamestop.com/video-games/products/shenmue---sega-dreamcast/10064601.html" }, 
      { name: "Jet Set Radio", details: "Detalhes sobre Jet Set Radio", purchaseLink: "https://www.gamestop.com/video-games/products/jet-set-radio---sega-dreamcast/10064630.html" }
    ], 
    purchaseLink: "https://www.amazon.com.br/s?k=sega+dreamcast" 
  },
  { 
    id: '4', 
    name: "Sega Mega Drive (1988)", 
    description: "Mergulhe no Sega Mega Drive, também conhecido como Genesis, que é um dos consoles mais icônicos da Sega. Com uma vasta gama de jogos, incluindo Phantasy Star IV e Golden Axe, o Mega Drive continua a ser um clássico apreciado por fãs em todo o mundo. Reviva a magia do Mega Drive ou descubra este clássico pela primeira vez!", 
    games: [
      { name: "Phantasy Star IV", details: "Detalhes sobre Phantasy Star IV", purchaseLink: "https://www.gamestop.com/video-games/products/phantasy-star-iv---sega-mega-drive/10064498.html" }, 
      { name: "Golden Axe", details: "Detalhes sobre Golden Axe", purchaseLink: "https://www.gamestop.com/video-games/products/golden-axe---sega-mega-drive/10064499.html" }
    ], 
    purchaseLink: "https://www.amazon.com.br/s?k=sega+mega+drive" 
  },
];

const Stack = createNativeStackNavigator();

const App = () => {
  return (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Consoles da Sega' }} />
        {consoles.map(console => (
          <Stack.Screen key={console.id} name={console.name} component={ConsoleDetailScreen} initialParams={console} />
        ))}
      </Stack.Navigator>
  );
};

const HomeScreen = ({ navigation }) => {
  const renderConsoleItem = ({ item }) => (
    <View style={styles.consoleItem}>
      <Text style={styles.consoleName}>{item.name}</Text>
      <Text>{item.description}</Text>
      <Text style={styles.subTitle}>Jogos Notáveis:</Text>
      {item.games.map((game, index) => (
        <Text key={index}>- {game.name}</Text>
      ))}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(item.name)}>
        <Text style={styles.buttonText}>Saiba mais</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={consoles}
        keyExtractor={(item) => item.id}
        renderItem={renderConsoleItem}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={true}
      />
    </View>
  );
};

const ConsoleDetailScreen = ({ route }) => {
  const { name, description, games, purchaseLink } = route.params;

  const renderGameItem = (game) => (
    <View style={styles.gameItem}>
      <Text>{game.name}</Text>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => Linking.openURL(game.purchaseLink)}>
        <Text style={styles.buttonText}>Saiba mais sobre {game.name}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.detailContainer}>
      <Text style={styles.detailTitle}>{name}</Text>
      <Text>{description}</Text>
      <Text style={styles.detailSubTitle}>Jogos Notáveis:</Text>
      {games.map((game, index) => renderGameItem(game))}
      <TouchableOpacity style={styles.button} onPress={() => Linking.openURL(purchaseLink)}>
        <Text style={styles.buttonText}>Comprar Aqui</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
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
    elevation: 5,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  consoleItem: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 15,
    marginBottom: 15,
  },
  consoleName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#40173d',
  },
  subTitle: {
    fontWeight: 'bold',
    marginTop: 10,
  },
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
  detailContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  detailTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#40173d',
    marginBottom: 10,
  },
  detailSubTitle: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  gameItem: {
    marginVertical: 5,
  },
});

export default App;

import React from 'react';
import { StyleSheet, Text, View, Linking, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const consoles = [
  { 
    id: '1', 
    name: "Game Boy (1989)", 
    description: "Prepare-se para uma viagem nostálgica com o icônico Game Boy, lançado em 1989. Este console portátil revolucionou os games, trazendo uma experiência inovadora para as palmas das suas mãos. Com um design robusto e uma biblioteca de clássicos como Tetris, Pokémon e Super Mario Land, o Game Boy conquistou jogadores de todas as idades. Além de sua jogabilidade envolvente, o Game Boy introduziu o multiplayer com link cables, permitindo que amigos jogassem juntos. Reviva a emoção dos games clássicos ou descubra o Game Boy pela primeira vez. O Game Boy espera por você!", 
    games: [
      { name: "Tetris", details: "Detalhes sobre Tetris", purchaseLink: "https://www.gamestop.com/products/tetris---game-boy/152306.html" }, 
      { name: "Super Mario Land", details: "Detalhes sobre Super Mario Land", purchaseLink: "https://www.gamestop.com/video-games/products/super-mario-land---game-boy/123026.html" }
    ], 
    purchaseLink: "https://www.amazon.com.br/s?k=game+boy+original" 
  },
  { 
    id: '2', 
    name: "Game Boy Color (1998)", 
    description: "Mergulhe na nostalgia do Game Boy Color, lançado em 1998, que trouxe cores vibrantes para os jogos portáteis. Com títulos icônicos como Pokémon Gold & Silver e The Legend of Zelda: Oracle of Seasons, este console transformou a experiência de jogo, tornando-a mais rica e envolvente. Compacto e compatível com jogos do Game Boy original, o Game Boy Color consolidou sua posição como um ícone dos videogames. Reviva as emoções dos anos 90 ou descubra esta joia pela primeira vez!.", 
    games: [
      { name: "Pokémon Gold", details: "Detalhes sobre Pokémon Gold", purchaseLink: "https://www.gamestop.com/video-games/products/pokemon-gold-version---game-boy-color/123008.html" }, 
      { name: "The Legend of Zelda: Oracle of Seasons", details: "Detalhes sobre The Legend of Zelda: Oracle of Seasons", purchaseLink: "https://www.gamestop.com/products/the-legend-of-zelda-oracle-of-seasons---game-boy-color/123001.html" }
    ], 
    purchaseLink: "https://www.amazon.com.br/s?k=game+boy+color" 
  },
  { 
    id: '3', 
    name: "Game Boy Advance (2001)", 
    description: "Descubra o Game Boy Advance, lançado em 2001, que revolucionou os jogos portáteis com sua tela maior, gráficos impressionantes e design ergonômico. Com uma vasta biblioteca de clássicos como Pokémon Ruby & Sapphire e The Legend of Zelda: The Minish Cap, o GBA trouxe inovações como a capacidade de salvar progressos e conectividade com o GameCube. Reviva a magia dos jogos portáteis ou descubra o Game Boy Advance pela primeira vez. O futuro dos jogos está na palma da sua mão!", 
    games: [
      { name: "Metroid Fusion", details: "Detalhes sobre Metroid Fusion", purchaseLink: "https://www.gamestop.com/products/metroid-fusion---game-boy-advance/122839.html" }, 
      { name: "Final Fantasy Tactics Advance", details: "Detalhes sobre Final Fantasy Tactics Advance", purchaseLink: "https://www.gamestop.com/products/final-fantasy-tactics---playstation/948016.html" }
    ], 
    purchaseLink: "https://www.amazon.com.br/s?k=game+boy+advance" 
  },
  { 
    id: '4', 
    name: "Nintendo DS (2004)", 
    description: "Mergulhe no Nintendo DS, lançado em 2004, que redefiniu os jogos portáteis com sua tela dupla e recursos de toque. Com títulos icônicos como Mario Kart DS e The Legend of Zelda: Phantom Hourglass, o DS proporcionou uma experiência de jogo imersiva e interativa. Sua conectividade Wi-Fi permitiu competir e cooperar com amigos em todo o mundo, tornando-o um ícone dos videogames. Reviva a magia das duas telas ou descubra este clássico pela primeira vez..", 
    games: [
      { name: "Nintendogs", details: "Detalhes sobre Nintendogs", purchaseLink: "https://www.gamestop.com/video-games/nds/products/nintendogs-dachshund-and-friends---nintendo-ds/919044.html" }, 
      { name: "Brain Age", details: "Detalhes sobre Brain Age", purchaseLink: "https://www.gamestop.com/video-games/nds/products/brain-age-train-your-brain-in-minutes-a-day---nintendo-ds/919144.html" }
    ], 
    purchaseLink: "https://www.amazon.com.br/s?k=nintendo+ds" 
  },
];

const Stack = createNativeStackNavigator();

const App = () => {
  return (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Consoles Portáteis da Nintendo' }} />
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

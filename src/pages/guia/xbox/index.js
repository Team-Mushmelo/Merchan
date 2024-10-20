import React from 'react';
import { StyleSheet, Text, View, Linking, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const consoles = [
  { 
    id: '1', 
    name: "Xbox (2001)", 
    description: "Prepare-se para uma viagem nostálgica com o icônico Xbox, lançado em 2001. Este console revolucionou os games, trazendo gráficos de alta definição e uma biblioteca de clássicos como Halo: Combat Evolved, Fable e Forza Motorsport. O Xbox conquistou jogadores de todas as idades e se tornou um ícone na história dos videogames. Reviva a emoção dos jogos clássicos ou descubra o Xbox pela primeira vez. O Xbox espera por você!", 
    games: [
      { name: "Halo: Combat Evolved", details: "Detalhes sobre Halo: Combat Evolved", purchaseLink: "https://www.gamestop.com/products/halo-combat-evolved-anniversary---xbox-one/200678.html" }, 
      { name: "Fable", details: "Detalhes sobre Fable", purchaseLink: "https://www.gamestop.com/video-games/products/fable---xbox/200129.html" }
    ], 
    purchaseLink: "https://www.amazon.com.br/s?k=xbox+original" 
  },
  { 
    id: '2', 
    name: "Xbox 360 (2005)", 
    description: "Mergulhe na nostalgia do Xbox 360, lançado em 2005, que trouxe gráficos ainda mais avançados e uma vasta biblioteca de títulos icônicos como Gears of War e Halo 3. Este console se consolidou como um dos favoritos da geração, oferecendo uma experiência de jogo incomparável. Reviva as emoções do Xbox 360 ou descubra esta joia pela primeira vez!", 
    games: [
      { name: "Gears of War", details: "Detalhes sobre Gears of War", purchaseLink: "https://www.gamestop.com/video-games/products/gears-of-war---xbox-360/200128.html" }, 
      { name: "Halo 3", details: "Detalhes sobre Halo 3", purchaseLink: "https://www.gamestop.com/video-games/products/halo-3---xbox-360/200130.html" }
    ], 
    purchaseLink: "https://www.amazon.com.br/s?k=xbox+360" 
  },
  { 
    id: '3', 
    name: "Xbox One (2013)", 
    description: "Descubra o Xbox One, lançado em 2013, que revolucionou os jogos com seu hardware potente e uma vasta biblioteca de títulos. Com jogos como Forza Horizon 4 e Sea of Thieves, o Xbox One estabeleceu novos padrões para a indústria de jogos. Reviva a magia do Xbox One ou descubra este console pela primeira vez. O futuro dos jogos está na palma da sua mão!", 
    games: [
      { name: "Forza Horizon 4", details: "Detalhes sobre Forza Horizon 4", purchaseLink: "https://www.gamestop.com/video-games/products/forza-horizon-4---xbox-one/200129.html" }, 
      { name: "Sea of Thieves", details: "Detalhes sobre Sea of Thieves", purchaseLink: "https://www.gamestop.com/video-games/products/sea-of-thieves---xbox-one/200130.html" }
    ], 
    purchaseLink: "https://www.amazon.com.br/s?k=xbox+one" 
  },
  { 
    id: '4', 
    name: "Xbox Series X (2020)", 
    description: "Mergulhe no Xbox Series X, lançado em 2020, que redefine a experiência de jogos com seu hardware de última geração e uma vasta gama de jogos, incluindo Halo Infinite e Gears 5. Com recursos de retrocompatibilidade e suporte a jogos em 4K, o Xbox Series X se tornou um dos consoles mais populares da sua geração. Reviva a magia do Xbox Series X ou descubra este clássico pela primeira vez!", 
    games: [
      { name: "Halo Infinite", details: "Detalhes sobre Halo Infinite", purchaseLink: "https://www.gamestop.com/products/halo-infinite---xbox-series-x-xbox-one/400063.html" }, 
      { name: "Gears 5", details: "Detalhes sobre Gears 5", purchaseLink: "https://www.gamestop.com/products/gears-5---xbox-one/200128.html" }
    ], 
    purchaseLink: "https://www.amazon.com.br/s?k=xbox+series+x" 
  },
];

const Stack = createNativeStackNavigator();

const App = () => {
  return (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Consoles Portáteis da Xbox' }} />
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

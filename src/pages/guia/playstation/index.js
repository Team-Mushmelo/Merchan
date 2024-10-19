import React from 'react';
import { StyleSheet, Text, View, Linking, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const consoles = [
  { 
    id: '1', 
    name: "PlayStation (1994)", 
    description: "Prepare-se para uma viagem nostálgica com o icônico PlayStation, lançado em 1994. Este console revolucionou os games, trazendo gráficos 3D e uma biblioteca de clássicos como Final Fantasy VII, Metal Gear Solid e Tekken. O PlayStation conquistou jogadores de todas as idades e se tornou um ícone na história dos videogames. Reviva a emoção dos jogos clássicos ou descubra o PlayStation pela primeira vez. O PlayStation espera por você!", 
    games: [
      { name: "Final Fantasy VII", details: "Detalhes sobre Final Fantasy VII", purchaseLink: "https://www.gamestop.com/video-games/playstation-5/products/final-fantasy-vii-rebirth---playstation-5/400731.html" }, 
      { name: "Metal Gear Solid", details: "Detalhes sobre Metal Gear Solid", purchaseLink: "https://www.gamestop.com/video-games/products/metal-gear-solid-master-collection-vol.1---xbox-series-x-xbox-one/402149.html" }
    ], 
    purchaseLink: "https://www.amazon.com.br/s?k=playstation+original" 
  },
  { 
    id: '2', 
    name: "PlayStation 2 (2000)", 
    description: "Mergulhe na nostalgia do PlayStation 2, lançado em 2000, que trouxe jogos em DVD e uma vasta biblioteca de títulos icônicos como Grand Theft Auto: San Andreas e God of War. Este console se consolidou como o mais vendido da história, oferecendo uma experiência de jogo incomparável. Reviva as emoções do PS2 ou descubra esta joia pela primeira vez!", 
    games: [
      { name: "Grand Theft Auto: San Andreas", details: "Detalhes sobre GTA: San Andreas", purchaseLink: "https://www.gamestop.com/products/grand-theft-auto-san-andreas---playstation-2/176005.html" }, 
      { name: "God of War", details: "Detalhes sobre God of War", purchaseLink: "https://www.gamestop.com/products/god-of-war-ii---playstation-2/175997.html" }
    ], 
    purchaseLink: "https://www.amazon.com.br/s?k=playstation+2" 
  },
  { 
    id: '3', 
    name: "PlayStation 3 (2006)", 
    description: "Descubra o PlayStation 3, lançado em 2006, que revolucionou os jogos com seus gráficos de alta definição e jogos online. Com uma biblioteca impressionante que inclui títulos como The Last of Us e Uncharted 2: Among Thieves, o PS3 estabeleceu novos padrões para a indústria de jogos. Reviva a magia do PS3 ou descubra este console pela primeira vez. O futuro dos jogos está na palma da sua mão!", 
    games: [
      { name: "The Last of Us", details: "Detalhes sobre The Last of Us", purchaseLink: "https://www.gamestop.com/video-games/products/the-last-of-us-part-1---pc-steam/357912.html" }, 
      { name: "Uncharted 2: Among Thieves", details: "Detalhes sobre Uncharted 2", purchaseLink: "https://porvoonpelikauppa.fi/uncharted-2-among-thieves-ps3" }
    ], 
    purchaseLink: "https://www.amazon.com.br/s?k=playstation+3" 
  },
  { 
    id: '4', 
    name: "PlayStation 4 (2013)", 
    description: "Mergulhe no PlayStation 4, lançado em 2013, que redefiniu a experiência de jogos com seu hardware potente e uma vasta gama de jogos, incluindo Bloodborne e Horizon Zero Dawn. Com recursos sociais e uma experiência online aprimorada, o PS4 se tornou um dos consoles mais populares da sua geração. Reviva a magia do PS4 ou descubra este clássico pela primeira vez!", 
    games: [
      { name: "Bloodborne", details: "Detalhes sobre Bloodborne", purchaseLink: "https://www.gamestop.com/video-games/playstation-4/products/bloodborne---playstation-4/109552.html" }, 
      { name: "Horizon Zero Dawn", details: "Detalhes sobre Horizon Zero Dawn", purchaseLink: "https://www.gamestop.com/video-games/products/horizon-zero-dawn---playstation-4/141998.html" }
    ], 
    purchaseLink: "https://www.amazon.com.br/s?k=playstation+4" 
  },
];

const Stack = createNativeStackNavigator();

const App = () => {
  return (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Consoles Portáteis da PlayStation' }} />
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

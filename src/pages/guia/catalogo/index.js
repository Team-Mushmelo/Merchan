import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts, Bungee_400Regular } from '@expo-google-fonts/bungee';

const Inicio = () => {
  const navigation = useNavigation();
  
  const [fontsLoaded] = useFonts({ BungeeRegular: Bungee_400Regular });

  if (!fontsLoaded) {
    return null; // ou um indicador de carregamento
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Guia do bom comprador</Text>

      <TouchableOpacity
        style={styles.buttonn}
        onPress={() => navigation.navigate('nintendo')}
      >
        <Image
          source={require('../../../../assets/nintendo.png')}
          style={styles.imagem}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonp}
        onPress={() => navigation.navigate('playstation')}
      >
        <Image
          source={require('../../../../assets/playst.png')}
          style={styles.imagem}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonx}
        onPress={() => navigation.navigate('xbox')}
      >
        <Image
          source={require('../../../../assets/xbox.png')}
          style={styles.imagem}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttons}
        onPress={() => navigation.navigate('sega')}
      >
        <Image
          source={require('../../../../assets/sega.png')}
          style={styles.imagem}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontFamily: 'BungeeRegular',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#40173d',
  },
  buttonn: {
    backgroundColor: '#E60012',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 20,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonp: {
    backgroundColor: '#F6D600',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 20,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonx: {
    backgroundColor: '#1CBA3D',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 20,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttons: {
    backgroundColor: '#003DA5',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 20,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagem: {
    width: '100%',
    height: 100, // Ajuste a altura da imagem conforme necessário
    resizeMode: 'contain',
  },
});

export default Inicio;

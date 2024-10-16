import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar, SafeAreaView, Image } from 'react-native';
import Logo from './assets/splash.png';
import { useFonts, OpenSans_400Regular, OpenSans_700Bold } from '@expo-google-fonts/open-sans';
import { Bungee_400Regular } from '@expo-google-fonts/bungee';
// Importação das páginas principais
import Routes from './src/pages/Routes';
import PaginaLogar from './src/pages/PaginaLogar';
import Modo from './src/pages/Modo';
import Recuperacao from './src/pages/Recuperacao';
import Preferencias from './src/pages/Preferencias';
import FinalLogin from './src/pages/Final_Login';
import Forca from './src/pages/Jogos/forca'; // Certifique-se de que está exportando corretamente
import Velha from './src/pages/Jogos/velha'; // Certifique-se de que está exportando corretamente
import inicio from './src/pages/Jogos/inicio'; // Certifique-se de que está exportando corretamente

const Stack = createStackNavigator();

export default function App() {
  const [loginFeito, setLoginFeito] = useState(false);
  const [lsDarkMode, setlsDarkMode] = useState(false);

  const [fontsLoaded] = useFonts({
    'OpenSansRegular': OpenSans_400Regular,
    'OpenSansBold': OpenSans_700Bold,
    'BungeeRegular': Bungee_400Regular,
  });

  if (!fontsLoaded) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#BE00B0" }}>
        <Image source={Logo} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
      </SafeAreaView>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar translucent backgroundColor={'#00000000'} />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!loginFeito ? (
          <>
            <Stack.Screen name='Modo' component={Modo} initialParams={{ setlsDarkMode }} />
            <Stack.Screen name='Recuperacao' component={Recuperacao} />
            <Stack.Screen name='PaginaLogar'>
              {(props) => <PaginaLogar {...props} setLoginFeito={setLoginFeito} />}
            </Stack.Screen>
            <Stack.Screen name='Preferencias' component={Preferencias} />
            <Stack.Screen name='FinalLogin'>
              {(props) => <FinalLogin {...props} setLoginFeito={setLoginFeito} />}
            </Stack.Screen>
          </>
        ) : (
          <>
            <Stack.Screen name='MeuApp' component={Routes} />
            <Stack.Screen name='forca' component={Forca} />
            <Stack.Screen name='velha' component={Velha} />
            <Stack.Screen name='inicio' component={inicio} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

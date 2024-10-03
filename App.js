import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar, SafeAreaView, Image } from 'react-native';
import Logo from './assets/splash.png';
import { useFonts, OpenSans_400Regular, OpenSans_700Bold, } from '@expo-google-fonts/open-sans';
import { Bungee_400Regular } from '@expo-google-fonts/bungee'
// Páginas principais
import Routes from './src/pages/Routes';
import PaginaLogar from './src/pages/PaginaLogar/';
import Modo from './src/pages/Modo';
import Recuperacao from './src/pages/Recuperacao';
import Preferencias from './src/pages/Preferencias';
import FinalLogin from './src/pages/Final_Login';

const Stack = createStackNavigator();

export default function App() {
  const [loginFeito, setLoginFeito] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  let [fontsLoaded] = useFonts({
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
    <>
      <StatusBar translucent backgroundColor={'#00000000'} />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!loginFeito ? (
            <>
              <Stack.Screen name='Modo' >
                {(props) => <Modo {...props} modoEscuro={isDarkMode} ModoDL={setIsDarkMode} />}
              </Stack.Screen>
              <Stack.Screen name='Recuperacao' component={Recuperacao} />
              <Stack.Screen name='PaginaLogar'>
                {(props) => <PaginaLogar {...props} setLoginFeito={setLoginFeito} />}
              </Stack.Screen>
              <Stack.Screen name='Preferencias' component={Preferencias} />
              <Stack.Screen name="FinalLogin" >
                {(props) => <FinalLogin {...props} setLoginFeito={setLoginFeito} />}
              </Stack.Screen>

            </>
          ) : (
            <Stack.Screen name='MeuApp' component={Routes} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

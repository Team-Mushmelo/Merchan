import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar, SafeAreaView, Image } from 'react-native';
import Logo from './assets/splash.png';
import { useFonts, OpenSans_400Regular, OpenSans_700Bold } from '@expo-google-fonts/open-sans';
import { Bungee_400Regular } from '@expo-google-fonts/bungee';
// Páginas principais
import PaginaLogar from './src/pages/PaginaLogar/'; // Importando apenas a página PaginaLogar

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
        <Stack.Navigator initialRouteName="BEM-VINDO AO MERCHAN">
          <Stack.Screen name="BEM-VINDO AO MERCHAN" component={PaginaLogar} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

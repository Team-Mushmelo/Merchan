import React, { useState } from 'react';
import Logo from './assets/splash.png';

import {
  useFonts,
  OpenSans_400Regular,
  OpenSans_700Bold,
} from '@expo-google-fonts/open-sans';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import PaginaLogar from './src/pages/PaginaLogar/'
import Modo from './src/pages/Modo';
import HomeScreen from './src/pages/Home';

import { Image, SafeAreaView, StatusBar, View } from 'react-native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MeuApp() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
    </Tab.Navigator>
  );
}

function App() {
  const [isLogado, setIsLogado] = useState(false);

  let [fontsLoaded] = useFonts({
    'OpenSansRegular': OpenSans_400Regular,
    'OpenSansBold': OpenSans_700Bold,
  });
  if (!fontsLoaded) {
    return <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItem: "center", backgroundColor: "#BE00B0" }}><Image source={Logo} style={{ width: '100%', height: "100%" }} /></SafeAreaView>
  } else {
    return (
      <>
        <StatusBar translucent backgroundColor={'#00000000'}/>
        <NavigationContainer >
          <Stack.Navigator screenOptions={{ headerShown: false }}>

            {!isLogado ? (
              <>
                <Stack.Screen name='Modo' component={Modo} />
                <Stack.Screen name="PaginaLogar">
                  {(props) => <PaginaLogar {...props} setIsLogado={setIsLogado} />}
                </Stack.Screen></>
            ) : (
              <Stack.Screen name="MeuApp" component={MeuApp} />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </>
    );
  }
}

export default App;

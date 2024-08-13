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


import { Image, SafeAreaView, StatusBar, View } from 'react-native';


import HomeScreen from './src/pages/Home';
import Comunidade from './src/pages/Comunidade';

import Ligações from './src/pages/Ligações';
import Lives from './src/pages/Lives';

import Perfil from './src/pages/Perfil';

import {Entypo, Feather, MaterialIcons, FontAwesome} from '@expo/vector-icons';












const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MeuApp() {







  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#fcfcfc',
          paddingBottom: 5,
          paddingTop: 5,
          borderTop: 'none',
        },
        tabBarActiveTintColor: '#40173d',
        tabBarInactiveTintColor: '#a481a1',
      }}
    >
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Entypo name='home' size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name='Comunidade'
        component={Comunidade}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Entypo name='users' size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name='Ligações'
        component={Ligações}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Entypo name='sound' size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name='Lives'
        component={Lives}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Entypo name='video' size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name='Perfil'
        component={Perfil}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Entypo name='user' size={size} color={color} />
          ),
        }}
      />
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

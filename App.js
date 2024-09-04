import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar, SafeAreaView, Image } from 'react-native';

import Logo from './assets/splash.png';
import { useFonts, OpenSans_400Regular, OpenSans_700Bold, } from '@expo-google-fonts/open-sans';

//paginas principais
import Routes from './src/pages/Routes';
import PaginaLogar from './src/pages/PaginaLogar/';
import Modo from './src/pages/Modo';
import Recuperacao from './src/pages/Recuperacao';
import Preferencias from './src/pages/Preferencias';
import FinalLogin from './src/pages/Final_Login';

const Stack = createStackNavigator();

export default function App() {
  const [isLogado, setIsLogado] = useState(false);

  let [fontsLoaded] = useFonts({
    'OpenSansRegular': OpenSans_400Regular,
    'OpenSansBold': OpenSans_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItem: "center", backgroundColor: "#BE00B0" }}>
        <Image source={Logo} style={{ width: '100%', height: "100%" }} />
      </SafeAreaView>
    );
  } else {
    return (
      <>
        <StatusBar translucent backgroundColor={'#00000000'} />
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {!isLogado ? (
              <>
            
                <Stack.Screen name="Preferencias" component={Preferencias} />
                <Stack.Screen name='Modo' component={Modo} />
                <Stack.Screen name="Recuperacao" component={Recuperacao} />
                <Stack.Screen name="PaginaLogar">
                  {(props) => <PaginaLogar {...props} setIsLogado={setIsLogado} />}
                </Stack.Screen>
                <Stack.Screen name="FinalLogin" component={FinalLogin}/>
              </>
            ) : (
              <Stack.Screen name="MeuApp" component={Routes} />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </>
    );
  }
}

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo } from '@expo/vector-icons'; // Importe apenas o ícone que você está usando
import { Text } from 'react-native'; // Importe o componente Text
import { useFonts, Bungee_400Regular } from '@expo-google-fonts/bungee';

import Home from './Home';
import Comunidade from './Comunidade';
import Ligações from './Ligações';
import Lives from './Lives';
import Perfil from './Perfil';
import chat from "./pesquisa";

const Tab = createBottomTabNavigator();

const CustomHeaderTitle = () => {
    // Carregue a fonte Bungee
    let [fontsLoaded] = useFonts({
        'BungeeRegular': Bungee_400Regular,
    });

    if (!fontsLoaded) {
        return null; // Ou um loader, se preferir
    }

    return (
        <Text style={{ fontFamily: 'BungeeRegular', fontSize: 40, color: '#bf0cb1' }}>
            MERCHAN
        </Text>
    );
};

export default function Routes() {
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
                headerTitle: () => <CustomHeaderTitle />, // Use o título customizado
            }}
        >
            <Tab.Screen
                name='Home'
                component={Home}
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
            {/* TEMPORARIAMENTE DESATIVADO  
            <Tab.Screen
                name='Ligações'
                component={Ligações}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Entypo name='sound' size={size} color={color} />
                    ),
                }}
            />*/}

            <Tab.Screen
                name='Pesquisa'
                component={chat}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Entypo name='magnifying-glass' size={size} color={color} />
                    ),
                }}
            />
            {/* TEMPORARIAMENTE DESATIVADO
            <Tab.Screen
                name='Lives'
                component={Lives}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Entypo name='video' size={size} color={color} />
                    ),
                }}
            />
            */}

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

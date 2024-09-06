import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo } from '@expo/vector-icons'; // Importe apenas o ícone que você está usando

import Home from './Home/foru'
import Comunidade from './Comunidade';
import Ligações from './Ligações';
import Lives from './Lives';
import Perfil from './Perfil';
import SearchBar from "./search";

const Tab = createBottomTabNavigator();

export default function Routes() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: '#fcfcfc',
                    paddingBottom: 5,
                    paddingTop: 5,
                    borderTop: 'none',
                    fontFamily: 'sarala',
                },
                tabBarActiveTintColor: '#40173d',
                tabBarInactiveTintColor: '#a481a1',
            }}
        >
            <Tab.Screen
                name='Home'
                component={Home}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Entypo name='home' size={size} color={color} />
                    ),
                    headerTitle: "MERCHAN",
                }}
            />
            <Tab.Screen
                name='Comunidade'
                component={Comunidade}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Entypo name='users' size={size} color={color} />
                    ),
                    headerTitle: "MERCHAN",
                }}
            />
            <Tab.Screen
                name='Ligações'
                component={Ligações}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Entypo name='sound' size={size} color={color} />
                    ),
                    headerTitle: "MERCHAN",
                }}
            />
              <Tab.Screen
                name='Pesquisa'
                component={SearchBar}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Entypo name='magnifying-glass' size={size} color={color} />
                    ),
                    headerTitle: "MERCHAN",
                }}
            />
            <Tab.Screen
                name='Lives'
                component={Lives}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Entypo name='video' size={size} color={color} />
                    ),
                    headerTitle: "MERCHAN",
                }}
            />
            <Tab.Screen
                name='Perfil'
                component={Perfil}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Entypo name='user' size={size} color={color} />
                    ),
                    headerTitle: "MERCHAN",
                }}
            />
        </Tab.Navigator>
    );
}

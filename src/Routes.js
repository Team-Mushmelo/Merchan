import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {Home} from './pages/Home';
import {Comunidade} from './pages/Comunidade';

import {Ligações} from './pages/Ligações';
import {Lives} from './pages/Lives';

import {Perfil} from './pages/Perfil';

const Tab = createBottomTabNavigator();

export default function Routes() {
return(
<Tab.Navigator>

<Tab.Screen nome='Home' component={Home} />
<Tab.Screen nome='Comunidade' component={Comunidade} />
<Tab.Screen nome='Ligações' component={Ligações} />
<Tab.Screen nome='Lives' component={Lives} />
<Tab.Screen nome='Perfil' component={Perfil} />
</Tab.Navigator>
)
}


import React from 'react';
import {} from '@react-navigation/bottom-tabs';

import Home from './pages/Home';
import Comunidade from './pages/Comunidade';
import Ligação from './pages/Ligação';
import Live from './pages/Live';
import Perfil from './pages/Perfil';

const Tab = createBottomTabNavigator();

export default function Routes(){
return(
<Tab.Navigator>

<Tab.Screen name="Inicio" component={Home}/>

<Tab.Screen name="Comunidade" component={Comunidade}/>

<Tab.Screen name="Ligação" component={Ligação}/>

<Tab.Screen name="Live" component={Live}/>

<Tab.Screen name="Perfil" component={Perfil}/>

</Tab.Navigator>
)
}


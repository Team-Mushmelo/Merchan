import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Foru from './foru';
import Explorar from './explorar'; // Certifique-se de que o caminho está correto

const Stack = createStackNavigator();

export default function home() {
    return (
    
            <Stack.Navigator initialRouteName="Foru">
                <Stack.Screen name="Foru" component={Foru} />
                <Stack.Screen name="Explorar" component={Explorar} />
            </Stack.Navigator>
      
    );
}

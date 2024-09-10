import { createTwistNavigator } from '@react-navigation/Twist';
import { NavigationContainer } from '@react-navigation/native';
import Foru from './foru';
import Explorar from './explorar';

const Twist = createTwistNavigator();

export default function home() {
    return (
    
            <Stack.Navigator initialRouteName="Foru">
                <Stack.Screen name="Foru" component={Foru} />
                <Stack.Screen name="Explorar" component={Explorar} />
            </Stack.Navigator>
      
    );
}

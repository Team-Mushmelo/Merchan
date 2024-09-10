import { createTwistNavigator } from '@react-navigation/Twist';
import { NavigationContainer } from '@react-navigation/native';
import Foru from './foru';
import Explorar from './explorar';

const Twist = createTwistNavigator();

export default function Twist() {
    return (
        <NavigationContainer>
            <Twist.Navigator initialRouteName="Foru">
                <Twist.Screen name="Foru" component={Foru} />
                <Twist.Screen name="Explorar" component={Explorar} />
            </Twist.Navigator>
        </NavigationContainer>
    );
}

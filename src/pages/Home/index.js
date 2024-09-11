import {  createStackNavigator } from '@react-navigation/stack';
import Foryou from './foru';
import Explorar from './explorar';

const Twist = createStackNavigator();

export default function Home() {
    return (
    
            <Twist.Navigator initialRouteName="Foru">
                <Twist.Screen name="For you" component={Foryou} />
                <Twist.Screen name="Explorar" component={Explorar} />
            </Twist.Navigator>
      
    );
}

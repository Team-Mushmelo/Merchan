import {  createStackNavigator } from '@react-navigation/stack';
import Foru from './foru';
import Explorar from './explorar';

const Twist = createStackNavigator();

export default function Home() {
    return (
    
            <Twist.Navigator initialRouteName="Foru">
                <Twist.Screen name="Foru" component={Foru} />
                <Twist.Screen name="Explorar" component={Explorar} />
            </Twist.Navigator>
      
    );
}

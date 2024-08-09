import React from 'react';
import { View, Text, StyleSheet} from 'react-native';

export default function Comunidade() {
return(
<View style={styles.container}>
<Text style={styles.text}>Página Comunidade</Text>
</View>
);

}

const styles = StyleSheet. create({
container: {
flex:1,
justifyContent: 'center',
alignItems: 'center',
},
text:{
FontSize: 25,
fontWeight: 'bold'
}
});
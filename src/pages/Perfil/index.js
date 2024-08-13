import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function Perfil() {
return(
<View style={styles.container}>
<Text style={styles.text}> Página Perfil </Text>
</View>
);
}


const styles = StyleSheet.create({
container:{
backgroundColor: '#fff',
flex: 1,
justifyContent: 'center',
alignItems: 'center',
},

text:{
fontSize: 25,
fontWeight: 'bold'
}
});
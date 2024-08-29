import React, { Component } from 'react';
import { View, Text, StyleSheet, } from 'react-native';
export default class App extends Component {
render(){
return (
 <View style={styles.container}>
 <Text style={styles.titulo}>------------Menu ------</Text>


</View>
 );
 }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  titulo: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold'
  },
  menu: {
    marginTop: 15,
    fontSize: 25,
    textAlign: 'center'
  },
  caixa: {
    padding: 10,
    margin: 10
  }
});
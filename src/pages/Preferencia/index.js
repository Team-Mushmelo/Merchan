import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Preferencia() {
  return (
    <View style={{ backgroundColor: '#fff', height: '100%' }}>
      <Text style={{ textAlign: 'left', margin: 10, fontSize: 25, color: '#BE00B0', fontFamily: 'Bungee',}}>MERCHAN</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    conteiner:{
        flex:1
    }
})

export default Preferencia;



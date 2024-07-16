import React from 'react';
import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native';

import Botao from '../../../Component/Botao';

export default function Criar({ setIsLogado, setIsCriarConta }) {
  return (
    <View style={styles.container}>


      <View style={styles.caixa1}>

        <View style={{ paddingBottom: 5, borderBottomWidth: 2, borderColor: '#40173D', height: '100%', marginRight: 40, justifyContent: 'flex-end' }}>
          <Text style={{ color: 'black', fontSize: 25, fontWeight: 'bold' }}>Seja Bem-Vindo! criar </Text>
        </View>

      </View>

      <View style={styles.caixa2}>

        <View>

          <Text style={{ color: '#A481A1', fontSize: 16, fontWeight: 'bold', }}>Faça seu Cadastro!</Text>
          <View style={{ margin: 10 }}>

            <Text style={styles.inpTitulo}>Nome</Text>
            <TextInput style={styles.input} placeholder='Digite o seu nome' keyboardType='default' autoComplete='name' placeholderTextColor='#A481A1' />

          </View>

          <View style={{ margin: 10 }}>

            <Text style={styles.inpTitulo}>Email</Text>
            <TextInput style={styles.input} placeholder='Digite o seu email' keyboardType='email-address' autoComplete='email' placeholderTextColor='#A481A1' />

          </View>

          <View style={{ margin: 10 }}>

            <Text style={styles.inpTitulo}>Senha</Text>
            <TextInput style={styles.input} placeholder='Digite o sua senha' secureTextEntry autoComplete='password' placeholderTextColor='#A481A1' />

          </View>

        </View>

      </View>

      <View style={styles.caixa3}>

        <Botao texto={'CONTINUAR'} tipo={1} onPress={() => setIsLogado(true)} />

        <Pressable onPress={() => setIsCriarConta(false)} style={{ flexDirection: "row", justifyContent: 'center',  }}>
          <Text style={{ fontSize: 17 }}>Já tem uma conta?</Text>
          <Text style={{ color: '#BE00B0', fontSize: 17 }}> Acesse!</Text>
        </Pressable>

        <Pressable style={{ alignItems: 'center', justifyContent: 'flex-end', flex: 1 }}>
          <Text>Não deixe de ler nossos</Text>
          <Text style={{ color: '#BE00B0' }}>Termos e políticas de privacidade</Text>
        </Pressable>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  caixa1: {
    flex: 1.0,
    paddingLeft: 20,
  },

  caixa2: {
    flex: 5,
    paddingTop: 10,
    padding: 20,

  },

  caixa3: {
    flex: 2.5,
    padding: 20
  },

  input: {
    height: 50,
    borderWidth: 0,
    backgroundColor: '#EBE8E2',
    alignItems: 'center',
    fontSize: 20,
    padding: 10,
    borderRadius: 20
  },

  botaoContinuar: {
    backgroundColor: '#BE00B0',
    width: '100%',
    height: 50,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },

  inpTitulo: {
    color: '#40173D',
    fontSize: 16,
    fontWeight: 'bold'
  },

});


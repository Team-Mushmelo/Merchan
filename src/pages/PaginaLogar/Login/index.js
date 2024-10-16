import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, TextInput, Alert } from 'react-native';
import Botao from '../../../Component/Botao';
import Hr from '../../../Component/Hr';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../services/firebaseConfig';

export default function Login({ setIsCriarConta, navigation, setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const ErroAlert = (error) => {
    let mensagem = "";
    switch (error.code) {
      case "auth/invalid-email":
        mensagem = "Email inválido.";
        break;
      case "auth/user-not-found":
        mensagem = "Usuário não encontrado.";
        break;
      case "auth/wrong-password":
        mensagem = "Senha incorreta.";
        break;
      case "auth/invalid-credential":
        mensagem = "Alguma informação está incorreta.";
        break;
      default:
        mensagem = "Ocorreu um erro desconhecido.";
    }
    Alert.alert('Erro', mensagem, [
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        navigation.navigate('FinalLogin');
      })
      .catch((error) => {
        console.log(error.message);
        ErroAlert(error);
        console.log(error.code);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.caixa1}>
        <View style={{ paddingBottom: 5, borderBottomWidth: 2, borderColor: '#40173D', height: '100%', marginRight: 40, justifyContent: 'flex-end' }}>
          <Text style={{ color: 'black', fontSize: 25, fontWeight: 'bold' }}>Seja Bem-Vindo!</Text>
        </View>
      </View>

      <View style={styles.caixa2}>
        <View>
          <Text style={{ color: '#A481A1', fontSize: 16, fontWeight: 'bold' }}>Faça seu login!</Text>

          <View style={{ margin: 10 }}>
            <Text style={styles.inpTitulo}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder='Digite o seu email'
              keyboardType='email-address'
              autoComplete='email'
              onChangeText={setEmail}
              placeholderTextColor='#A481A1'
            />
          </View>

          <View style={{ margin: 10 }}>
            <Text style={styles.inpTitulo}>Senha</Text>
            <TextInput
              style={styles.input}
              placeholder='Digite a sua senha'
              secureTextEntry
              autoComplete='password'
              onChangeText={setPassword}
              placeholderTextColor='#A481A1'
            />
       
          </View>
        </View>
      </View>

      <View style={styles.caixa2}>
        <Botao texto={'CONTINUAR'} tipo={1} onPress={handleLogin} />

        <Pressable onPress={() => setIsCriarConta(true)} style={{ flexDirection: "row", justifyContent: 'center' }}>
          <Text style={{ fontSize: 17 }}>Não tem uma conta?</Text>
          <Text style={{ color: '#BE00B0', fontSize: 17 }}> Cadastre-se</Text>
        </Pressable>

        <View style={styles.caixa3}>
          
        </View>
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
    flex: 0.6,
    paddingLeft: 20,
  },
  caixa2: {
    flex: 2,
    paddingTop: 10,
    padding: 20,
  },
  caixa3: {
    flex: 2,
    flexDirection: 'row',
  },
  input: {
    height: 50,
    borderWidth: 0,
    backgroundColor: '#EBE8E2',
    alignItems: 'center',
    fontSize: 20,
    padding: 10,
    borderRadius: 20,
    outlineWidth: 0,
  },
  continueButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: 300,
    height: 70,
    borderWidth: 1,
    borderColor: '#BE00B0',
    borderRadius: 25,
  },
  inpTitulo: {
    color: '#40173D',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

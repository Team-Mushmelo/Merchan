import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, TextInput, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, firestore } from '../../../services/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import Botao from '../../../Component/Botao';

export default function Criar({ setUser, setIsCriarConta, navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');

  const ErroAlert = (error) => {
    let mensagem = "";
    switch (error.code) {
      case "auth/invalid-email":
        mensagem = "Email inválido.";
        break;
      case "auth/weak-password":
        mensagem = "A senha é muito fraca. Por favor, escolha uma senha mais forte com pelo menos 6 caracteres.";
        break;
      case "auth/missing-password":
        mensagem = "Esqueceu de colocar uma senha";
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
    if (!nome.trim()) {
      Alert.alert('Erro', 'O campo Nick/Apelido não pode estar vazio.', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
      return; // Evita que a função prossiga
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setDoc(doc(firestore, 'user', user.uid), {
          email: email,
          nome: nome,
        });

        console.log(user);
        navigation.navigate('Preferencias', { email, nome });
      })
      .catch((error) => {
        ErroAlert(error);
        console.log(error.code);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.caixa1}>
        <View style={{ paddingBottom: 5, borderBottomWidth: 2, borderColor: '#40173D', height: '100%', marginRight: 40, justifyContent: 'flex-end' }}>
          <Text style={{ color: 'black', fontSize: 25, fontWeight: 'bold' }}>Seja Bem-Vindo! criar </Text>
        </View>
      </View>

      <View style={styles.caixa2}>
        <View>
          <Text style={{ color: '#A481A1', fontSize: 16, fontWeight: 'bold' }}>Faça seu Cadastro!</Text>
          <View style={{ margin: 10 }}>
            <Text style={styles.inpTitulo}>Nick/Apelido</Text>
            <TextInput
              style={styles.input}
              placeholder='Digite o seu nome'
              onChangeText={setNome}
              keyboardType='default'
              autoComplete='name'
              placeholderTextColor='#A481A1'
            />
          </View>

          <View style={{ margin: 10 }}>
            <Text style={styles.inpTitulo}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder='Digite o seu email'
              keyboardType='email-address'
              onChangeText={setEmail}
              autoComplete='email'
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
        <Botao texto={'CONTINUAR'} tipo={1} onPress={handleLogin} />
      </View>

      <View style={styles.caixa3}>
        <Pressable onPress={() => setIsCriarConta(false)} style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Text style={{ fontSize: 17 }}>Já tem uma conta?</Text>
          <Text style={{ color: '#BE00B0', fontSize: 17 }}> Acesse!</Text>
        </Pressable>

        <Pressable 
          style={{ alignItems: 'center', justifyContent: 'flex-end', flex: 1 }}
          onPress={() => navigation.navigate('Termos')} // Navega para a tela de termos
        >
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
    padding: 20,
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
  inpTitulo: {
    color: '#40173D',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

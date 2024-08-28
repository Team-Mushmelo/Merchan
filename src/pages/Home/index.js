import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Carousel from './Components/carrossel';
// Ajuste o caminho conforme necessário

export default function Home() {
    const [items1, setItems1] = useState([]);
    const [items2, setItems2] = useState([]);
    const [items3, setItems3] = useState([]);
    const [items4, setItems4] = useState([]);
    const [items5, setItems5] = useState([]);
    const [items6, setItems6] = useState([]);

    const pickImage = (setItems) => {
        launchImageLibrary({ mediaType: 'photo', quality: 1 }, response => {
            if (response.didCancel) {
                console.log('Usuário cancelou a seleção');
            } else if (response.errorCode) {
                Alert.alert('Erro', response.errorMessage);
            } else {
                const newItem = {
                    id: (new Date()).toISOString(), // Use um ID único
                    uri: response.assets[0].uri,
                };
                setItems(prevItems => [...prevItems, newItem]);
            }
        });
    };

    return (

        <View style={styles.container}>

             <View style={{
                  fontSize: 14,
                  paddingLeft: 10,
                  paddingRight: 10,
                  paddingTop: 10,
                  marginLeft: 10,
                  marginRight: 10,
                  marginTop: 10,
                  marginBottom: 0,
                  borderBottomWidth: 0.5,
                  borderBottomColor: '#000',
                  fontFamily: 'OpenSansRegular',
                 }}>Exemplo
            </View>


            <View style={styles.carouselContainer}> 
                
              
                <View style={{
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    height: 100,
                    margin: 10,
                    paddingLeft: 10,
                 }}>
           
                <TouchableOpacity
                    style={[styles.floatingButton, { top: 0 }]} // Ajuste a posição se necessário
                    onPress={() => pickImage(setItems1)}
                >
                    <Icon name="add" size={25} color="#fff" />
                </TouchableOpacity>
                </View>

             <View style={{ flex:5, }}> 
                <Carousel items={items1}></Carousel>
            </View>
            </View>


            <View style={{
                  fontSize: 14,
                  paddingLeft: 10,
                  paddingRight: 10,
                  paddingTop: 10,
                  marginLeft: 10,
                  marginRight: 10,
                  marginTop: 10,
                  marginBottom: 0,
                  borderBottomWidth: 0.5,
                  borderBottomColor: '#000',
                  fontFamily: 'OpenSansRegular',
                 }}>Exemplo
            </View>

            <View style={styles.carouselContainer}>
                <View style={{
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    height: 100,
                    margin: 10,
                    paddingLeft: 10,
                 }}>

                <TouchableOpacity
                    style={[styles.floatingButton, { top: 0 }]} // Ajuste a posição se necessário
                    onPress={() => pickImage(setItems2)}
                >
                    <Icon name="add" size={25} color="#fff" />
                </TouchableOpacity>
                </View>

             <View style={{ flex:5, }}> 
                <Carousel items={items2}></Carousel>
            </View>
            </View>


            <View style={{
                  fontSize: 14,
                  paddingLeft: 10,
                  paddingRight: 10,
                  paddingTop: 10,
                  marginLeft: 10,
                  marginRight: 10,
                  marginTop: 10,
                  marginBottom: 0,
                  borderBottomWidth: 0.5,
                  borderBottomColor: '#000',
                  fontFamily: 'OpenSansRegular',
                 }}>Exemplo
            </View>
            
            <View style={styles.carouselContainer}>
                <View style={{
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    height: 100,
                    margin: 10,
                    paddingLeft: 10,
                 }}>

                <TouchableOpacity
                    style={[styles.floatingButton, { top: 0 }]} // Ajuste a posição se necessário
                    onPress={() => pickImage(setItems3)}
                >
                    <Icon name="add" size={25} color="#fff" />
                </TouchableOpacity>
                </View>

             <View style={{ flex:5, }}> 
                <Carousel items={items3}></Carousel>
            </View>
            </View>

            <View style={{
                  fontSize: 14,
                  paddingLeft: 10,
                  paddingRight: 10,
                  paddingTop: 10,
                  marginLeft: 10,
                  marginRight: 10,
                  marginTop: 10,
                  marginBottom: 0,
                  borderBottomWidth: 0.5,
                  borderBottomColor: '#000',
                  fontFamily: 'OpenSansRegular',
                 }}>Exemplo
            </View>
            
            <View style={styles.carouselContainer}>
                <View style={{
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    height: 100,
                    margin: 10,
                    paddingLeft: 10,
                 }}>

                <TouchableOpacity
                    style={[styles.floatingButton, { top: 0 }]} // Ajuste a posição se necessário
                    onPress={() => pickImage(setItems4)}
                >
                    <Icon name="add" size={25} color="#fff" />
                </TouchableOpacity>
                </View>

             <View style={{ flex:5, }}> 
                <Carousel items={items4}></Carousel>
            </View>
            </View>
        </View>

        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
    carouselContainer: {

        flexDirection: 'row',
        
    },
    floatingButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 60,
        backgroundColor: '#bf0cb1',
        borderRadius: 50,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 3,

     
    },
});

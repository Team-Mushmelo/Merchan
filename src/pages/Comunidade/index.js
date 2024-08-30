import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Carousel from '../Home/Components/carrossel';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Comunidade() {
    const [items1, setItems1] = useState([]);
    const [feed, setFeed] = useState([
        {nome: 'xxxxx',},
        {nome: 'xxxxx',},
        {nome: 'xxxxx',},
        {nome: 'xxxxx',},
        {nome: 'xxxxx',},
    ]);

    return (
<View style={{backgroundColor: '#fff', height: 'auto', flex: 1,}}>
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
      
        <View style={styles.container}>
                



            <FlatList
                data={feed}
                keyExtractor={(item) => item.nome}
                renderItem={({ item }) => <Dados data={item} />}
            />
        </View>
        
        </View>
    );
}

function Dados({ data }) {
    return (
        <View style={styles.areaDados}>
            <Text style={styles.textoDados}>nome: {data.nome}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
   
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#fff'
    },
    areaDados: {
        marginTop: 15,
        backgroundColor: '#ebe8e2',
        height: 100,
        marginBottom: 5,
        borderRadius:25,
        padding: 10,
        width: 400,
        borderWidth: 1,
        borderColor: '#40173d',
    },
    textoDados: {
        color: '#40173d',
        fontSize: 20,
        padding: 5,
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

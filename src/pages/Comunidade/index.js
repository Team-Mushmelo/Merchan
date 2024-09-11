import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, FlatList, Text, ScrollView, Button, Image } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
export default function Comunidade() {
    const [items1, setItems1] = useState([])

    const [items2, setItems2] = useState([
      { id: '1', color: '#bf0cb1' },
      { id: '2', color: '#bf0cb1' },
      { id: '3', color: '#bf0cb1' },
      { id: '4', color: '#bf0cb1' },
      { id: '5', color: '#bf0cb1' },
  ]);

    const [feed, setFeed] = useState([
        { id: 1, nome: 'xxxxx', },
        { id: 2, nome: 'xxxxx', },
        { id: 3, nome: 'xxxxx', },
        { id: 4, nome: 'xxxxx', },
        { id: 5, nome: 'xxxxx', },
        { id: 6, nome: 'xxxxx', },
        { id: 7, nome: 'xxxxx', },
        { id: 8, nome: 'xxxxx', },
        { id: 9, nome: 'xxxxx', },
        { id: 10, nome: 'xxxxx', },
    ]);

    return (
        <View style={{ backgroundColor: '#fff', height: 'auto', flex: 1, }}>

<Text style={styles.title}>Suspense</Text>
            <View style={styles.carouselContainer}>
                <View style={styles.carouselWrapper}>
                    <FlatList
                        data={items2}
                        keyExtractor={(item) => item.id}
                        horizontal
                        renderItem={renderItem}
                        contentContainerStyle={styles.flatListContent}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            </View>


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
                    borderBottomColor: '#40173d',
                    fontFamily: 'OpenSansRegular',
                }}>
                </View>



                <FlatList
                    data={feed}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <Dados data={item} />}
                />
            </View>

        </View>
    );
}

function Dados({ data }) {
    return (
        <View style={styles.areaDados}>
            <Text style={styles.textoDados}>{data.nome}</Text>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    areaDados: {
        marginTop: 15,
        backgroundColor: '#ebe8e2',
        height: 100,
        marginBottom: 5,
        borderRadius: 25,
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

    title: {
      fontSize: 14,
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 10,
      marginLeft: 10,
      marginRight: 10,
      marginTop: 10,
      marginBottom: 0,
      borderBottomWidth: 0.5,
      borderBottomColor: '#ebe8e2',
      fontFamily: 'OpenSansRegular',
  },
  carouselContainer: {
      flexDirection: 'row',
      marginBottom: 20,
  },
  carouselWrapper: {
    flex: 1,
    margin: 10,
    paddingHorizontal: 0,
    width: '100%',
},
flatListContent: {
    alignItems: 'center',
},
});

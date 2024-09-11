import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Text, ScrollView } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Carousel from '../Components/Feed';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';



export default function Foru({ navigation }) {
    const [items2, setItems2] = useState([]);

    // Função para selecionar uma imagem
    const pickImage = (setItems) => {
        launchImageLibrary({ mediaType: 'photo', quality: 1 }, response => {
            if (response.didCancel) {
                console.log('Usuário cancelou a seleção');
            } else if (response.errorCode) {
                Alert.alert('Erro', response.errorMessage);
            } else {
                const newItem = {
                    id: (new Date()).toISOString(),
                    uri: response.assets[0].uri,
                };
                setItems(prevItems => [...prevItems, newItem]);
            }
        });
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>

            <View style={{flexDirection: 'row', display:'flex', alignItems: 'center', marginLeft: 15,}}>
            <View style={styles.exploreButton}>
              <Text style={styles.exploreButtonText}>For you</Text>
   </View>
   <TouchableOpacity
                  style={styles.exploreButton}
                  onPress={() => navigation.navigate('Explorar')}
              >
                
   
                  <Text style={styles.exploreButtonText}>Explorar</Text>
              </TouchableOpacity>
             
  </View>
                {/* Seção 2 */}
                
                <View style={styles.carouselContainer}>
                    <View style={styles.carouselWrapper}>
                        <Carousel items={items2} />
                    </View>
                </View>
                <View style={styles.carouselContainer}>
                    {items2.length > 0 ? (
                        <View style={styles.carouselWrapper}>
                           
                        </View>
                    ) : (
                        <View style={styles.noPostsContainer}>
                            <Icon name="ghost" size={50} color="#40173d" />
                            <Text style={styles.noPostsText}>Não há posts ainda.</Text>
                        </View>
                    )}
                </View>
            </ScrollView>

            {/* Botão flutuante */}
            <TouchableOpacity
                style={styles.floatingButton}
                onPress={() => pickImage(setItems2)}
            >
                <Icon name="plus" size={25} color="#fff" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    exploreButton: {
        backgroundColor: '#fff',
        padding: 15,
        borderWidth: 1,
        borderColor: '#40173d',
        borderRadius: 27,
        alignItems: 'right',
        marginBottom: 20,
        marginRight: 10,
        width: '25%'
    },
    exploreButtonText: {
        color: '#40173d',
        fontSize: 12,
    },

    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollViewContent: {
        flexGrow: 1,
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
        alignItems: 'center',
        justifyContent: 'center',
    },
    carouselWrapper: {
        flex: 1,
        margin: 10,
        paddingHorizontal: 0,
        width: '100%',
    },
    floatingButton: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        width: 50,
        height: 50,
        backgroundColor: '#bf0cb1',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },

    noPostsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    noPostsText: {
        fontSize: 18,
        color: '#40173d',
    },
});

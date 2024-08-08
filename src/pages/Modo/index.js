import { View, Text, StyleSheet } from 'react-native';

import Botao from '../../Component/Botao';

import { Ponto, GrupoBotoes, Topo } from './Components/ModoComponents';
import Hr from '../../Component/Hr';

function Modo({ navigation }) {
    return (
        <View style={styles.container}>

            <Topo txtEstilo={styles.subtitulos} />

            <Hr/>
            <GrupoBotoes />
            <Hr/>
            <View style={styles.Bottom}>

                <Text style={styles.subtitulos}>Feel The Game</Text>

                <View style={styles.BotoesInferiores}>
                    <Botao texto={'CONTINUAR'} tipo={1} onPress={() => navigation.navigate('PaginaLogar')} />
                    <Botao texto={'PULAR'} tipo={2} onPress={() => navigation.navigate('PaginaLogar')} />
                </View>

                <Ponto estado={0} />
            </View>
        </View>

    );

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white',
    },

    Bottom: {
        //backgroundColor: 'red',
        flex: 7,
        paddingTop: 10,
    },

    BotoesInferiores: {
        flex: 1,
        margin: 25,
    },

    subtitulos: {
        alignSelf: 'center',
        margin: 10,
        marginBottom: 25,
        color: '#40173D',
        fontSize: 20,
        lineHeight: 25,
        fontWeight: 'normal',
        fontFamily: 'OpenSansBold'
    }

})

export default Modo;
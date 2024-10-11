import { View, Text, StyleSheet } from 'react-native';

import Botao from '../../Component/Botao';

import { Ponto, GrupoBotoes, Topo } from './Components/ModoComponents';
import Hr from '../../Component/Hr';

function Modo({ navigation, ModoDL, modoEscuro }) {
    return (
        <View style={styles.container}>

            <Topo txtEstilo={styles.subtitulos} />


                <View style={styles.BotoesInferiores}>
                    <Botao texto={'CONTINUAR'} tipo={1} onPress={() => {navigation.navigate('PaginaLogar')} }/>
                    <Botao texto={'PULAR'} tipo={2} />
                </View>

                <Ponto estado={0} />
            </View>

    );

}

const styles = (modoEscuro) => StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: modoEscuro ? '#170215' :  'white',
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
import { View, StyleSheet } from 'react-native';
import Botao from '../../Component/Botao';
import { Ponto, Topo } from './Components/ModoComponents';

function Modo({ navigation, modoEscuro }) {
    return (
        <View style={styles.container}>
            <Topo txtEstilo={styles.subtitulos} />
            <View style={styles.BotoesInferiores}>
                <Botao texto={'CONTINUAR'} tipo={1} onPress={() => { navigation.navigate('PaginaLogar') }} />
                <Ponto estado={0} />
            </View>
        </View>
    );
}

const styles = (modoEscuro) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: modoEscuro ? '#170215' : 'white',
        alignItems: 'center', // Centraliza horizontalmente
        justifyContent: 'center', // Centraliza verticalmente
        paddingTop: 50, // Espaçamento do topo
    },
    BotoesInferiores: {
        alignItems: 'center', // Centraliza o botão e o ponto
        marginTop: 20, // Espaço acima dos botões
    },
    subtitulos: {
        margin: 10,
        marginBottom: 25,
        color: '#40173D',
        fontSize: 20,
        lineHeight: 25,
        fontWeight: 'normal',
        fontFamily: 'OpenSansBold',
        textAlign: 'center', // Centraliza o texto
    }
});

export default Modo;

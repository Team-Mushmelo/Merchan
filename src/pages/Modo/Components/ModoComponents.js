import { StyleSheet, View, Image, Text, Pressable, Dimensions } from 'react-native';

//Ponto
export function Ponto({ estado }) {
    if (estado == 0) {
        return (

            <View style={{ flex: 0.2, justifyContent: "center", flexDirection: "row" }}>

                <View style={[estilosPontos.pontos, { backgroundColor: '#BE00B0', marginRight: 10 }]}></View>
                <View style={[estilosPontos.pontos, { backgroundColor: "#00000000", borderColor: '#BE00B0', borderWidth: 1.5 }]}></View>

            </View>
        );
    } else {
        return (<View style={{ flex: 0.2, justifyContent: "center", flexDirection: "row" }}>

            <View style={[estilosPontos.pontos, { backgroundColor: "#00000000", borderColor: '#BE00B0', borderWidth: 1.5 }]}></View>
            <View style={[estilosPontos.pontos, { backgroundColor: '#BE00B0', marginRight: 10 }]}></View>
            <LogoImagem ></LogoImagem>
        </View>
        );
    }
}
const estilosPontos = StyleSheet.create({
    pontos: {
        borderRadius: 100,
        width: 30,
        height: 30,
    },

})

//Topo
import Logo from '../../../imgs/Logo.png';
export function Topo({ txtEstilo }) {
    return (
        <View style={estiloTopo.caixa1}>
            <Image style={estiloTopo.img} source={Logo} />
            <Text style={txtEstilo}>Escolha seu tema</Text>

        </View>
    );
}
const estiloTopo = StyleSheet.create({
    caixa1: {
        //backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 40,
        flex: 3,
        padding: 10,
    },

    img: {
        margin: 10,
        width: 150,
        height: 95,
    },

})


//Grupo de Botões
import LogoBranco from '../../../imgs/LogoB.png';

const { width } = Dimensions.get('window'); // Obtém a largura da tela

    export function GrupoBotoes({onPressDark, onPressLight}) {
    return (
        <View style={styles.Fundo}>
            <Pressable onPress={onPressLight} style={[styles.card, { backgroundColor: '#BE00B0', width:'50%', }]}>
                <Image style={styles.cardImg} source={LogoBranco} />
                <Text style={styles.TextBotao}>LIGHT MODE</Text>
            </Pressable>

            <Pressable onPress={onPressDark} style={[styles.card, { backgroundColor: '#40173D', width:'50%' }]}>
                <Image style={styles.cardImg} source={LogoBranco} />
                <Text style={styles.TextBotao}>DARK MODE</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    Fundo: {
        flex: 1.5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 5,
    },
    card: {
        width: width * 0.48, // 45% da largura da tela
        borderRadius: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    cardImg: {
        width: width * 0.17, // 10% da largura da tela
        height: width * 0.11, // Mantendo proporção 1:1
        marginRight: 1,
    },
    TextBotao: {
        marginleft: 10,
        fontSize: 18,
        width: width * 0.15,
        fontWeight: 'bold',
        flexWrap: 'wrap',
        color: '#fff', // Adicione cor branca para contraste
    },
});

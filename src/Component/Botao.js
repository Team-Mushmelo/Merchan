import { useState } from 'react';
import { StyleSheet, Pressable, Text } from 'react-native';

export default function Botao({ texto, onPress, style, textStyle, tipo }) {
    const [isPressed, setIsPressed] = useState(false);

    const BotaoStyle = tipo === 2 ? estilos.botaoTipo2 : estilos.botaoTipo1;
    textStyle = tipo === 2 ? estilos.textoTipo2 : estilos.textoTipo1;

    return (
        <Pressable
            style={[estilos.botao, style, BotaoStyle, { opacity: isPressed ? 0.5 : 1 }]}
            onPress={onPress}
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
        >
            <Text style={[estilos.textoBotao, textStyle]}>{texto}</Text>
        </Pressable>
    );
}

const estilos = StyleSheet.create({
    botao: {
        paddingVertical: 10,
        margin: 15,
        borderRadius: 50,
        justifyContent: "center",
    },
    textoBotao: {
        textAlign: 'center',
        fontSize: 18,
        lineHeight: 59,
        fontWeight: 'bold',
        flexWrap: 'wrap'
    },
    botaoTipo1: {
        backgroundColor: '#BE00B0',
    },
    botaoTipo2: {
        backgroundColor: '#EBE8E2',
    },
    textoTipo1: {
        color: 'white',
    },
    textoTipo2: {
        color: '#A481A1',
    }
});

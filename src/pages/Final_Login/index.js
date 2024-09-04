import React, { useEffect } from "react";
import { View, StyleSheet, Image, Dimensions } from "react-native";

const windowWidth = Dimensions.get('window').width;

export default function FinalLogin({navigation}) {
    useEffect(() => {
        // Redireciona após 5 segundos
        const timer = setTimeout(() => {
            navigation.navigate('Modo'); // Nome da tela de destino
        }, 1400);

        // Limpa o timer quando o componente for desmontado
        return () => clearTimeout(timer);
    }, []);
    return (
        <View style={estilo.container}>
            <Image style={estilo.login} source={require("../../imgs/final_login.png")} />
        </View>
    )
}
const estilo = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: "#FFFF",
    },
    login: {
        alignSelf: 'center',
        width: (windowWidth * .8),
        height: (windowWidth * .8),
    }
}
)
import React, { useEffect } from "react";
import { View, StyleSheet, Image, Dimensions } from "react-native";

const windowWidth = Dimensions.get('window').width;

export default function FinalLogin({ navigation, setLoginFeito }) {

    useEffect(() => {
        // Aguarda 3 segundos antes de redirecionar para a tela principal
        const timer = setTimeout(() => {
           setLoginFeito(true)
        }, 1000); // 3000 milissegundos = 3 segundos

        // Limpa o timer caso o componente seja desmontado
        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={estilo.container}>
            <Image style={estilo.login} source={require("../../imgs/final_login.png")} />
        </View>
    );
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
});

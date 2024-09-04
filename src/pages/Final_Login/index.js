import React from "react";
import { View, StyleSheet, Image, Dimensions } from "react-native";

const windowWidth = Dimensions.get('window').width;

export default function FinalLogin() {
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
        alignSelf:'center',
        width: (windowWidth * .8),
        height:(windowWidth * .8),
    }
}
)
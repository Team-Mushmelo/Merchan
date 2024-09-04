import { View } from "react-native";

export default function Hr({ posicao }) {
    const commonStyle = {
        borderWidth: 1,
        backgroundColor: '#40173D',
        borderColor: '#40173D',
        marginHorizontal: 10,
        marginVertical: 10,
    };

    const verticalStyle = posicao === "Vertical" 
        ? { ...commonStyle, flex: 1, height: 1, borderRadius: 100 } 
        : { ...commonStyle, marginHorizontal: 40 };

    return <View style={verticalStyle} />;
}

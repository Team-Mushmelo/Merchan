import { View } from "react-native";

export default function Hr({ posicao }) {
    if (!(posicao == "Vertical")) {
        return (
            <View style={
                {
                    borderWidth: 1,
                    backgroundColor: '#40173D',
                    borderColor: '#40173D',
                    marginHorizontal: 40,
                    marginVertical: 10,
                }}>

            </View>
        );
    } else {
        return (
            <View style={
                {
                    flex: 1,
                    height: 1,
                    borderWidth: 1,
                    backgroundColor: '#40173D',
                    borderRadius: 100,
                    borderColor: '#40173D',
                    marginHorizontal: 10,
                    marginVertical: 10,
                }}>

            </View>
        );
    }
}
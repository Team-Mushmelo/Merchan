import react from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

export default function SearchBar(){
return (
<View style={style.asembler}>
<View style={styke .Main}>
<TextInput placeholder='pesquisar' style={style.Input}> </TextInput>


</View>

<View style={style.buttomP}>

</View>

</View>
)
}


const style = StyleSheet.create({
asembler:{
flexDirection: 'row'
},

Main:{
backgroundColor: '#fff',
width: 250,
height: 50,
borderWidth: 1,
borderColor: '#C0C0C0',
borderTopLeftRadius: 40,
},

Input:{
marginLeft: 10,
marginTop: 5,
},

buttonP:{
heitght: 50,
width: 60,
backgroundColor: '#fff',
borderWidth: 1,
borderBottomRightRadius: 30,
borderTopRightRadius: 30,
borderColor: '#C0C0C0'
}

})
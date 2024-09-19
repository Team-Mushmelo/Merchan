import React, { useState } from 'react';
import { View, Text, Switch } from 'react-native';



export default function Switch() {

  const [isDarkMode, setlsDarkMode] = useState(false);
  const alternarSwitch = () => setlsDarkMode(anteriorState => !anteriorState);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? "#333" : "#fff",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  };

  const textStyle = {
    color: isDarkMode ? "#fff" : "#000",
    fontSize: 18,
    marginBottom: 20,
  };



  return (
    <View style={backgroundStyle}>
      <Text style={textStyle}>
        {isDarkMode ? "Modo Escuro" : "Modo Claro"}
      </Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
      />
    </View>
  );
}
import React from "react";
import { StyleSheet, TextInput, View, Keyboard, Button } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";

const SearchBar = ({ clicked, searchPhrase, setSearchPhrase, setClicked }) => {
  return (
    <View style={styles.container}>
      <View
        style={
          clicked
            ? styles.searchBar__clicked
            : styles.searchBar__unclicked
        }
      >
        {/* search Icon */}
        <Feather
          name="search"
          size={20}
          color="black"
          style={{ marginLeft: 1 }}
        />
        {/* Input field */}
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          onFocus={() => {
            setClicked(true);
          }}
          underlineColorAndroid="transparent" // Remove underline decoration
          selectionColor="transparent" // Remove linha amarela
          blurOnSubmit={false} // Não fecha o teclado ao enviar
        />
        {/* Cross Icon */}
        {clicked && (
          <Entypo
            name="cross"
            size={20}
            color="black"
            style={{ padding: 1 }}
            onPress={() => {
              setSearchPhrase("");
            }}
          />
        )}
      </View>
      {/* Cancel button */}
      {clicked && (
        <View>
          <Button
            title="Cancel"
            onPress={() => {
              Keyboard.dismiss();
              setClicked(false);
            }}
          />
        </View>
      )}
    </View>
  );
};

export default SearchBar;

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  searchBar__unclicked: {
    padding: 10,
    flexDirection: "row",
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#40173d", // Borda roxa
  },
  searchBar__clicked: {
    padding: 10,
    flexDirection: "row",
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
    borderWidth: 1,
    borderColor: "#6A0DAD", // Borda roxa
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: "90%",
    textDecorationLine: "none", // Remove text decoration
    outlineWidth: 0, // Remove outline
  },
});

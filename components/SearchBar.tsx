import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

const CustomSearchBar = ({ searchText, onSearchChange }: any) => {
  return (
    <View style={styles.searchBar}>
      <TextInput
        placeholder="Search services..."
        onChangeText={onSearchChange}
        value={searchText}
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  input: {
    height: 40,
  },
});

export default CustomSearchBar;

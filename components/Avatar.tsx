import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CustomAvatar = () => {
  // Your custom avatar implementation
  return (
    <View style={styles.avatar}>
      <Text>Avatar</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CustomAvatar;

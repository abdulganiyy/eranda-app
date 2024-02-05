import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { useAppSelector } from "@/redux/hooks";

const CustomCard = ({ title, description, price, currency, user }: any) => {
  const currentUser = useAppSelector((state) => state.auth.user);

  return (
    <View style={styles.card}>
      <View style={styles.userContainer}>
        <TouchableOpacity
          style={styles.userDefaultImage}
          onPress={() => {
            if (currentUser?.id == user?.id) {
              router.push("/(tabs)/profile");
            } else {
              router.push({ pathname: `/user`, params: { id: user?.id } });
            }
          }}
        >
          <Text>
            {user?.firstName?.toUpperCase().slice(0, 1) +
              user?.lastName?.toUpperCase().slice(0, 1)}
          </Text>
        </TouchableOpacity>
        <Text>{user?.firstName + " " + user?.lastName}</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <View style={styles.cardFooter}>
        <Text>
          Price: {currency}
          {price}/hr
        </Text>
        {/* Your custom avatar implementation */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    marginBottom: 8,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginBottom: 10,
  },
  userDefaultImage: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ACEECE",
    borderRadius: 20,
  },
});

export default CustomCard;

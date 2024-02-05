import { useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

// import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/slices/auth";
import { useColorScheme } from "react-native";
import Colors from "@/constants/Colors";
import Button from "@/components/inputs/Button";
import { router, useLocalSearchParams } from "expo-router";
import { useAppSelector } from "@/redux/hooks";
import { useQuery } from "react-query";
import userService from "@/services/user";

export default function UserDetailsScreen() {
  //   const dispatch = useAppDispatch();
  //   const user = useAppSelector((state) => state.auth.user);
  const params = useLocalSearchParams();

  console.log(params);

  const { data, isLoading, error } = useQuery(
    ["user", params?.id],
    userService.getUser
  );

  // return <View></View>;

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <TouchableOpacity
          onPress={() => {
            router.push("/(tabs)/home");
          }}
        >
          <Text>Go back</Text>
        </TouchableOpacity>
        <View style={styles.userContainer}>
          <View style={styles.userDefaultImage}>
            <Text>
              {data?.firstName?.toUpperCase().slice(0, 1) +
                data?.lastName?.toUpperCase().slice(0, 1)}
            </Text>
          </View>
          <Text>{data?.firstName + " " + data?.lastName}</Text>
        </View>
        <View style={styles.paragraphWrapper}>
          <Text>First Name</Text>
          <Text>{data?.firstName}</Text>
        </View>
        <View style={styles.paragraphWrapper}>
          <Text>Last Name</Text>
          <Text>{data?.lastName}</Text>
        </View>
        <View style={styles.paragraphWrapper}>
          <Text>Email</Text>
          <Text>{data?.email}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.chatBtn}
        onPress={() => {
          router.push({
            pathname: `/conversation`,
            params: {
              id: data?.id,
              firstName: data?.firstName,
              lastName: data?.lastName,
            },
          });
        }}
      >
        <Text style={styles.chatBtnText}>Start conversation</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    paddingTop: 40,
  },
  wrapper: {
    width: "90%",
    rowGap: 20,
  },
  paragraphWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userDefaultImage: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ACEECE",
    borderRadius: 20,
  },
  userContainer: {
    // flexDirection: "row",
    alignItems: "center",
    gap: 5,
    margin: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  chatBtn: {
    backgroundColor: "green",
    width: 200,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  chatBtnText: { color: "white" },
});

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
import { router } from "expo-router";
import { useAppSelector } from "@/redux/hooks";

export default function TabTwoScreen() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const logOut = async () => {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");
      dispatch(logout());
      router.push("/login");
    } catch (e) {
      // error reading value
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.userContainer}>
          <View style={styles.userDefaultImage}>
            <Text>
              {user?.firstName?.toUpperCase().slice(0, 1) +
                user?.lastName?.toUpperCase().slice(0, 1)}
            </Text>
          </View>
          <Text>{user?.firstName + " " + user?.lastName}</Text>
        </View>
        <View style={styles.paragraphWrapper}>
          <Text>First Name</Text>
          <Text>{user?.firstName}</Text>
        </View>
        <View style={styles.paragraphWrapper}>
          <Text>Last Name</Text>
          <Text>{user?.lastName}</Text>
        </View>
        <View style={styles.paragraphWrapper}>
          <Text>Email</Text>
          <Text>{user?.email}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.logoutBtn} onPress={logOut}>
        <Text style={styles.logoutBtnText}>Log out</Text>
      </TouchableOpacity>
      {/* <Button onPress={logOut}>
        <Text>Log out</Text>
      </Button> */}
      {/* <Text style={styles.title}>Tab Two</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="app/(tabs)/two.tsx" /> */}
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
  logoutBtn: {
    backgroundColor: "green",
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  logoutBtnText: { color: "#7F1D1D" },
});

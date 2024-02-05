import { StyleSheet } from "react-native";
import { View } from "@/components/Themed";
import { Image } from "react-native";
import { useEffect } from "react";
import { router } from "expo-router";
import { useAppSelector } from "@/redux/hooks";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppDispatch } from "@/redux/hooks";
import { loginSuccess } from "@/redux/slices/auth";
import { useColorScheme } from "react-native";

export default function SplashScreen() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const dispatch = useAppDispatch();
  const theme = useColorScheme();

  useEffect(() => {
    const getToken = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("user");
        const token = await AsyncStorage.getItem("token");

        const user = jsonValue != null ? JSON.parse(jsonValue) : null;
        console.log(user);

        if (user) {
          dispatch(loginSuccess(user));
        }
      } catch (e) {
        // error reading value
      }
    };
    getToken();
  }, []);

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (isAuthenticated) {
        router.push("/(tabs)/home");
      } else {
        router.push("/login");
      }
    }, 5000);

    return () => {
      clearTimeout(timerId);
    };
  });
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={
          theme === "light"
            ? require("@/assets/images/logo.jpg")
            : require("@/assets/images/logo-dark.jpg")
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: "100%",
    resizeMode: "contain",
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
});

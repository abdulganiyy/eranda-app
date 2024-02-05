import { StyleSheet } from "react-native";
import { View, Text } from "@/components/Themed";
import { TextInput, Button as RNButton } from "react-native";
import EmailInput from "@/components/inputs/EmailInput";
import PasswordInput from "@/components/inputs/PasswordInput";
import Button from "@/components/inputs/Button";
import { Link } from "expo-router";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import { SignInSchema } from "@/schema/authSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppDispatch } from "@/redux/hooks";
import authService from "@/services/auth";
import { loginSuccess } from "@/redux/slices/auth";
import { useColorScheme } from "react-native";
import Colors from "@/constants/Colors";
import Toast from "react-native-root-toast";

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const theme = useColorScheme() ?? "dark";

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(SignInSchema),
  });

  useEffect(() => {
    if (methods.formState.isSubmitSuccessful) {
      methods.reset();
    }
  }, [methods, methods.formState.isSubmitSuccessful]);

  const onSubmit = async (data: any) => {
    // console.log(data);
    // router.push("/home");

    try {
      const response = await authService.login({
        email: data?.email,
        password: data?.password,
      });
      // console.log(response);
      dispatch(loginSuccess(response.user));
      await AsyncStorage.setItem("token", response.token);
      await AsyncStorage.setItem("user", JSON.stringify(response.user));

      router.push("/home");
    } catch (error: any) {
      console.error("Login failed:", error);
      // toast.error("Invalid credentials");
      Toast.show(error?.message, {
        duration: Toast.durations.SHORT,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text
        style={styles.headerText}
        lightColor="rgba(0,0,0,0.8)"
        darkColor="rgba(255,255,255,0.8)"
      >
        Welcome Back
      </Text>
      <Text
        style={styles.subText}
        lightColor="rgba(0,0,0,0.8)"
        darkColor="rgba(255,255,255,0.8)"
      >
        Dont sleep on making hourly cash with small errands running
      </Text>
      <View style={styles.wrapper}>
        <Controller
          control={methods.control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={[styles.input, { color: Colors[theme]["text"] }]}
                placeholderTextColor={Colors[theme]["text"]}
                placeholder="xyz@gmail.com"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value?.toLowerCase()}
              />
            </View>
          )}
          name="email"
        />
        {methods.formState.errors.email?.message && (
          <Text style={styles.error}>
            {methods?.formState?.errors?.email.message}
          </Text>
        )}
        <Controller
          control={methods.control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                secureTextEntry={!showPassword}
                style={[styles.input, { color: Colors[theme]["text"] }]}
                placeholderTextColor={Colors[theme]["text"]}
                placeholder="******"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              <View style={styles.icon}>
                {!showPassword ? (
                  <FontAwesome
                    name="eye"
                    size={20}
                    onPress={() => setShowPassword(true)}
                  />
                ) : (
                  <FontAwesome
                    name="eye-slash"
                    size={20}
                    onPress={() => setShowPassword(false)}
                  />
                )}
              </View>
            </View>
          )}
          name="password"
        />
        {methods.formState.errors.password?.message && (
          <Text style={styles.error}>
            {methods?.formState?.errors?.password.message}
          </Text>
        )}
        <View style={styles.footerText}>
          <Text>You dont have an account yet?</Text>
          <Link href="/register">
            {" "}
            <Text style={{ color: "#FF9228" }}>Sign up</Text>
          </Link>
        </View>

        <Button onPress={methods.handleSubmit(onSubmit)}>
          {methods.formState.isSubmitting ? (
            <Text>Loading...</Text>
          ) : (
            <Text>LOGIN</Text>
          )}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    paddingHorizontal: 30,
  },
  wrapper: {
    paddingTop: 40,
    rowGap: 10,
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 40,
  },
  subText: {
    fontSize: 15,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 10,
  },
  footerText: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputContainer: {
    rowGap: 10,
    position: "relative",
  },
  label: {
    fontWeight: "bold",
    fontSize: 12,
  },
  input: {
    borderRadius: 10,
    height: 50,
    padding: 16,
    borderWidth: 2,
    borderColor: "green",
  },
  error: {
    color: "red",
  },
  icon: {
    position: "absolute",
    right: 10,
    top: 37,
  },
});

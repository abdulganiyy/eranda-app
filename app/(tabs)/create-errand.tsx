import { StyleSheet } from "react-native";
import { View, Text } from "@/components/Themed";
import { TextInput, Button as RNButton } from "react-native";
import Button from "@/components/inputs/Button";
import { Link } from "expo-router";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
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
import { CreateErrandSchema } from "@/schema/errandSchema";
import errandService from "@/services/errand";
// import Picker from "react-native-picker-select";
import { Picker } from "@react-native-picker/picker";

const currencies = [
  { label: "NGN", value: "₦" },
  { label: "USD", value: "$" },
  { label: "EUR", value: "€" },
  { label: "GBP", value: "£" },
  { label: "JPY", value: "¥" },
  { label: "CAD", value: "C$" },
  { label: "AUD", value: "A$" },
  { label: "CHF", value: "CHF" },
  { label: "CNY", value: "CNY" },
  { label: "SEK", value: "SEK" },
  { label: "NZD", value: "NZD" },
];

export default function CreateErrandScreen() {
  const dispatch = useAppDispatch();
  const theme = useColorScheme() ?? "dark";

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(CreateErrandSchema),
  });

  useEffect(() => {
    if (methods.formState.isSubmitSuccessful) {
      methods.reset();
    }
  }, [methods, methods.formState.isSubmitSuccessful]);

  const onSubmit = async (data: any) => {
    console.log(data);
    // router.push("/home");

    try {
      await errandService.add(data);

      router.push("/home");
    } catch (error: any) {
      console.error(error?.message);
      Toast.show(error?.message, {
        duration: Toast.durations.SHORT,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Add Errand</Text>
      <View style={styles.wrapper}>
        <Controller
          control={methods.control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Title</Text>
              <TextInput
                style={[styles.input, { color: Colors[theme]["text"] }]}
                placeholderTextColor={Colors[theme]["text"]}
                placeholder=""
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            </View>
          )}
          name="title"
        />
        {methods.formState.errors.title?.message && (
          <Text style={styles.error}>
            {methods?.formState?.errors?.title.message}
          </Text>
        )}
        <Controller
          control={methods.control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                multiline
                numberOfLines={10}
                style={[styles.textBox, { color: Colors[theme]["text"] }]}
                placeholderTextColor={Colors[theme]["text"]}
                placeholder=""
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            </View>
          )}
          name="description"
        />
        {methods.formState.errors.description?.message && (
          <Text style={styles.error}>
            {methods?.formState?.errors?.description.message}
          </Text>
        )}
        <Controller
          control={methods.control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Price/hr</Text>
              <TextInput
                style={[styles.input, { color: Colors[theme]["text"] }]}
                placeholderTextColor={Colors[theme]["text"]}
                placeholder=""
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            </View>
          )}
          name="price"
        />
        {methods.formState.errors.price?.message && (
          <Text style={styles.error}>
            {methods?.formState?.errors?.price.message}
          </Text>
        )}
        <Controller
          control={methods.control}
          render={({ field: { onChange, value } }) => (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Currency</Text>
              <View
                style={{
                  borderColor: "green",
                  borderWidth: 2,
                  borderRadius: 10,
                }}
              >
                {/* <Picker
                  value={value}
                  items={currencies}
                  onValueChange={(itemValue) => onChange(itemValue)}
                  style={pickerSelectStyles}
                /> */}
                <Picker
                  // ref={pickerRef}
                  // style={pickerSelectStyles}
                  style={{ color: "white" }}
                  selectedValue={value}
                  onValueChange={(itemValue, itemIndex) => onChange(itemValue)}
                >
                  {currencies.map((item: any) => (
                    <Picker.Item
                      key={item?.label}
                      label={item?.label}
                      value={item?.value}
                    />
                  ))}
                  {/* <Picker.Item label="Java" value="java" />
                  <Picker.Item label="JavaScript" value="js" /> */}
                </Picker>
              </View>
            </View>
          )}
          name="currency"
          defaultValue="₦"
        />
        {/* <Controller
          control={methods.control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Currency</Text>
              <TextInput
                style={[styles.input, { color: Colors[theme]["text"] }]}
                placeholderTextColor={Colors[theme]["text"]}
                placeholder=""
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            </View>
          )}
          name="currency"
        /> */}
        {methods.formState.errors.currency?.message && (
          <Text style={styles.error}>
            {methods?.formState?.errors?.currency.message}
          </Text>
        )}
        <Button onPress={methods.handleSubmit(onSubmit)}>
          {methods.formState.isSubmitting ? (
            <Text>Loading...</Text>
          ) : (
            <Text>PUBLISH</Text>
          )}
        </Button>
      </View>
    </View>
  );
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: "green",
    borderRadius: 10,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 2,
    borderColor: "green",
    borderRadius: 10,
    color: "white",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

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
  textBox: {
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: "green",
    textAlignVertical: "center",
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

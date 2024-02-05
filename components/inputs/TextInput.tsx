import { FC, useEffect } from "react";
import {
  View,
  StyleSheet,
  TextInput as Input,
  TextInputProps,
  Text,
} from "react-native";
import { useFormContext } from "react-hook-form";

interface InputProps extends TextInputProps {
  name?: string;
  label?: string;
}

const TextInput: FC<InputProps> = ({ name = "", label, ...props }) => {
  const { register, formState } = useFormContext(); // retrieve all hook methods

  // useEffect(() => {
  //   setValue(name, { shouldValidate: true });
  // }, [setValue, selected]);

  if (!register || !name) {
    const msg = !register
      ? "TextInput must be wrapped by the FormProvider"
      : "Name must be defined";
    console.error(msg);
    return null;
  }

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <Input style={styles.input} {...props} {...register(name)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    rowGap: 10,
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
});

export default TextInput;

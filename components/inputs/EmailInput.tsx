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

const EmailInput: FC<InputProps> = ({ name = "", label, ...props }) => {
  const { register } = useFormContext(); // retrieve all hook methods

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

export default EmailInput;

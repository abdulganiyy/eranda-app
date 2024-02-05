import { FC, ReactNode } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
// import { GeneralObject } from "~/types"

interface ButtonProps {
  isSubmitting?: boolean;
  variant?: string;
  size?: string;
  onPress?(): void;
  children: ReactNode;
}

const Button: FC<ButtonProps> = ({
  isSubmitting,
  size = "sm",
  variant = "default",
  onPress,
  children,
}) => {
  const variants: any = {
    primary: "rounded-[34px] bg-[#FF785B]",
    secondary: "rounded-[6px] bg-[#FF785B]",
  };

  const sizes: any = {
    sm: "px-[3px] py-[7px]",
    md: "px-[10px]",
    lg: "px-[40px] py-[12px]",
  };

  return (
    <TouchableOpacity style={[styles.button]} onPress={onPress}>
      {
        <Text style={styles.text}>
          {isSubmitting ? <Text>Loading...</Text> : children}
        </Text>
      }
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 6,
    height: 50,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
  },
  sm: { paddingHorizontal: 3, paddingVertical: 7 },
  md: { paddingHorizontal: 10, paddingVertical: 10 },
  lg: { paddingHorizontal: 40, paddingVertical: 12 },
  primary: { borderRadius: 34, backgroundColor: "#FF785B" },
  secondary: { borderRadius: 6, backgroundColor: "#FF785B" },
  text: { color: "white", fontSize: 14, fontWeight: "bold" },
});

export default Button;

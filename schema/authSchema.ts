import * as yup from "yup";

type SignInSchemas = {
  email: string;
  password: string;
};


export const SignInSchema = yup
  .object({
    email: yup
      .string()
      .email("Kindly provide a valid email address")
      .required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be atleast 6 character long"),
  })
  .required();


  export const SignUpSchema = yup
  .object({
    firstName: yup
      .string()
      .required("First Name is required"),
      lastName: yup
      .string()    
      .required("Last Name is required"),
    email: yup
      .string()
      .email("Kindly provide a valid email address")
      .required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be atleast 6 character long"),
  })
  .required();



import * as yup from "yup";

// type SignInSchemas = {
//   email: string;
//   password: string;
// };

  export const CreateErrandSchema = yup
  .object({
    title: yup
      .string()
      .required("Title is required"),
      description: yup
      .string()    
      .required("Description is required").min(6, "Description must be atleast 15 characters long"),
    price: yup
      .string()
      .required("Price is required").trim()
      .matches(/^[0-9]*$/ , 'Strings are not allowed for price value'),
      currency: yup
      .string()
      .required("Choose a currency")
  })
  .required();



import * as yup from "yup";

export const defaultFormValues = {
  Username: "",
  Password: "",
};

export const formValidationSchema = yup.object().shape({
  Username: yup.string().required("Username is required"),
  Password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be greater than 6 characters"),
});

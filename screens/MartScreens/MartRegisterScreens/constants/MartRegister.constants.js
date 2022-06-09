import * as yup from "yup";

export const defaultValues = {
  Username: "",
  Password: "",
  ConfirmPassword: "",
  MartName: "",
  MartAddress: "",
  MartEmail: "",
  MartCell: "",
};

export const formValidationSchema = yup.object().shape({
  Username: yup.string().required("Username is required"),
  Password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be greater than 6 characters"),
  ConfirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("Password")], "Passwords do not match"),
  MartName: yup.string().required("Mart Name is required"),
  MartAddress: yup.string().required("Mart Address is required"),
  MartEmail: yup.string().required("Mart Email is required"),
  MartCell: yup.string().required("Mart Cell is required"),
});

import { useFormik } from "formik";
import { View, Text, StyleSheet } from "react-native";
import {
  Container,
  Button,
  Input,
  Select,
  AvoidKeyboardLayout,
} from "../../../../components";
import { useCompanyScreenContext } from "../context/ManageCompany.context";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  CompanyName: yup.string().required("Company Name is required"),
  CompanyDescr: yup.string().required("Company Description is required"),
});

export function AddEditCompanyScreen() {
  const { isEditMode, loading, saveCompany } = useCompanyScreenContext();

  const { handleSubmit, handleChange, values, errors, touched } = useFormik({
    initialValues: {
      CompanyName: "",
      CompanyDescr: "",
    },
    validationSchema: validationSchema,
    onSubmit: saveCompany,
  });

  return (
    <AvoidKeyboardLayout>
      <Container>
        <View style={styles.root}>
          <Text style={styles.heading}>
            {isEditMode ? "Edit" : "Add"} Company
          </Text>
          <View style={styles.form}>
            <Input
              label="Company Name"
              value={values.CompanyName}
              onChange={handleChange("CompanyName")}
              isError={errors.CompanyName && touched.CompanyName}
              errorText={errors.CompanyName}
            />

            <Input
              label="Company Description"
              multiLine
              numberOfLines={4}
              value={values.CompanyDescr}
              onChange={handleChange("CompanyDescr")}
              isError={errors.CompanyDescr && touched.CompanyDescr}
              errorText={errors.CompanyDescr}
            />

            <View style={{ marginVertical: 10 }} />

            <Button
              title="Add Company"
              onClick={handleSubmit}
              isLoading={loading}
              primary
            />
          </View>
        </View>
      </Container>
    </AvoidKeyboardLayout>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingTop: 20,
  },

  heading: {
    fontFamily: "BOLD",
    fontSize: 30,
  },
});

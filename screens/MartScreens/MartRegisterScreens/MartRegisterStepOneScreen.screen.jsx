import { useFormikContext } from "formik";
import { View, Text, StyleSheet } from "react-native";
import {
  Container,
  Input,
  Button,
  AvoidKeyboardLayout,
  useToast,
  Toast,
} from "../../../components";
import { ToastTypes } from "../../../components/utils/Toast/Toast";

function MartRegisterStepOne({ setCurrentScreen }) {
  const {
    handleChange,
    values,
    errors,
    validateForm,
    touched,
    setFieldTouched,
  } = useFormikContext();

  const [toast, showToast] = useToast();

  return (
    <AvoidKeyboardLayout>
      <Toast
        msg={toast.msg}
        secondMsg={toast.secondMsg}
        show={toast.show}
        type={toast.type}
      />
      <Container>
        <View style={styles.circleRight}></View>

        <View style={styles.container}>
          <View style={styles.heading}>
            <Text style={styles.mainHeading}>Step 01</Text>
            <Text style={styles.secondHeading}>Enter your basic details</Text>
          </View>

          <View style={styles.inputs}>
            <Input
              label="Username"
              value={values.Username}
              onChange={handleChange("Username")}
              isError={errors.Username && touched.Username}
              errorText={errors.Username}
              required
            />
            <Input
              label="Password"
              value={values.Password}
              onChange={handleChange("Password")}
              isError={errors.Password && touched.Password}
              errorText={errors.Password}
              required
              secureTextEntry
            />
            <Input
              label="Confirm Password"
              value={values.ConfirmPassword}
              onChange={handleChange("ConfirmPassword")}
              isError={errors.ConfirmPassword && touched.ConfirmPassword}
              errorText={errors.ConfirmPassword}
              secureTextEntry
              required
            />
          </View>

          <View style={styles.buttons}>
            <Button
              title="NEXT"
              onClick={async () => {
                const validate = await validateForm();
                if (
                  validate.Username ||
                  validate.Password ||
                  validate.ConfirmPassword
                ) {
                  setFieldTouched("Username");
                  setFieldTouched("Password");
                  setFieldTouched("ConfirmPassword");
                  showToast("Remove Errors to proceed", "", ToastTypes.ERROR);
                } else {
                  setCurrentScreen("2");
                }
              }}
              primary
            />
          </View>
        </View>
      </Container>
    </AvoidKeyboardLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
  },

  circleRight: {
    width: 400,
    height: 400,
    backgroundColor: "#77B6EA",
    borderRadius: 400 / 2,
    position: "absolute",
    left: -200,
    bottom: 200,
    opacity: 0.7,
  },

  mainHeading: {
    fontSize: 30,
    fontFamily: "BOLD",
    marginBottom: -10,
  },

  secondHeading: {
    fontSize: 14,
    fontFamily: "REGULAR",
  },

  inputs: {
    flex: 1,
    justifyContent: "flex-start",
    marginTop: 30,
  },

  buttons: {
    flex: 1,
    justifyContent: "flex-end",
  },
});

export default MartRegisterStepOne;

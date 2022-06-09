import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  Container,
  Input,
  Button,
  AvoidKeyboardLayout,
  Toast,
} from "../../../components";
import * as ImagePicker from "expo-image-picker";
import { useFormikContext } from "formik";
import { AntDesign } from "@expo/vector-icons";
import { COLORS } from "../../../constants/Theme";
import { useMartRegisterContext } from "./context/MartRegister.context";
import { useLoadingContext } from "../../../contexts/LoadingContext";

function MartRegisterStepTwo({ setCurrentScreen }) {
  const { loading } = useLoadingContext();

  const { toast } = useMartRegisterContext();

  const { submitForm, handleChange, values, errors, touched } =
    useFormikContext();

  async function openImageLibrary() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });
  }

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
          <TouchableOpacity onPress={() => setCurrentScreen("1")}>
            <View
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: COLORS.PRIMARY,
                width: 35,
                height: 35,
                borderRadius: 50,
              }}
            >
              <AntDesign name="left" size={20} color={COLORS.WHITE} />
            </View>
          </TouchableOpacity>

          <View style={styles.heading}>
            <Text style={styles.mainHeading}>Step 02</Text>
            <Text style={styles.secondHeading}>Enter your Mart details</Text>
          </View>

          <View style={styles.inputs}>
            <Input
              label="Mart Name"
              value={values.MartName}
              onChange={handleChange("MartName")}
              isError={errors.MartName && touched.MartName}
              errorText={errors.MartName}
              required
            />
            <Input
              label="Mart Address"
              value={values.MartAddress}
              onChange={handleChange("MartAddress")}
              isError={errors.MartAddress && touched.MartAddress}
              errorText={errors.MartAddress}
              required
            />
            <Input
              label="Email"
              value={values.MartEmail}
              onChange={handleChange("MartEmail")}
              isError={errors.MartEmail && touched.MartEmail}
              errorText={errors.MartEmail}
              required
            />
            <Input
              label="Mart Cell #"
              value={values.MartCell}
              onChange={handleChange("MartCell")}
              isError={errors.MartCell && touched.MartCell}
              errorText={errors.MartCell}
              required
            />

            <Button title="UPLOAD LOGO" size="sm" onClick={openImageLibrary} />
          </View>

          <View style={styles.buttons}>
            <Button
              title="REGISTER"
              onClick={submitForm}
              primary
              isLoading={loading}
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
    marginTop: 20,
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
    marginTop: 10,
  },
});

export default MartRegisterStepTwo;

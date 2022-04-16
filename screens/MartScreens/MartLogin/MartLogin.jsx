import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  AvoidKeyboardLayout,
  Button,
  Container,
  Input,
  Toast,
  useToast,
} from "../../../components";
import { ToastTypes } from "../../../components/utils/Toast/Toast";

function MartLogin({ route }) {
  const [toast, showToast] = useToast();
  const navigation = useNavigation();

  useEffect(() => {
    if (route.params) {
      if (route.params.loggedIn) {
        showToast(
          "You have registered successfully",
          "Now you can login",
          ToastTypes.SUCCESS
        );
      }
      if (route.params.passwordChanged) {
        showToast(
          "Password successfully changed",
          "Now you can login with the new password",
          ToastTypes.SUCCESS
        );
      }
    }
  }, [route.params]);

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
          <View>
            <Input label="Username" required />
            <Input label="Password" required />
          </View>
          <View>
            <Button
              title="LOGIN"
              primary
              onClick={() => navigation.navigate("MartDashboard")}
            />
            <TouchableOpacity
              style={{ marginBottom: 50 }}
              onPress={() => navigation.navigate("ForgotPasswordStepOne")}
            >
              <Text style={{ textAlign: "right" }}>Forgot Password?</Text>
            </TouchableOpacity>
            <Button
              title="REGISTER"
              onClick={() => navigation.navigate("MartRegisterStepOne")}
            />
          </View>
        </View>
      </Container>
    </AvoidKeyboardLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    flex: 1,
    justifyContent: "flex-end",
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
});

export default MartLogin;

import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet } from "react-native";
import {
  AvoidKeyboardLayout,
  Button,
  Container,
  Input,
} from "../../../components";

function ForgotPasswordStepTwo() {
  const navigation = useNavigation();

  return (
    <AvoidKeyboardLayout>
      <Container>
        <View style={styles.circleRight}></View>

        <View style={styles.container}>
          <View style={styles.inputs}>
            <Input label="Code" required />
          </View>

          <View style={styles.buttons}>
            <Button
              title="NEXT"
              onClick={() => navigation.navigate("ForgotPasswordStepThree")}
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

  inputs: {
    flex: 1,
    justifyContent: "flex-start",
    marginTop: 200,
  },

  text: {
    textAlign: "center",
  },

  buttons: {
    flex: 1,
    justifyContent: "flex-end",
    marginTop: 10,
  },
});

export default ForgotPasswordStepTwo;

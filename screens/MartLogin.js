import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { AvoidKeyboardLayout, Button, Container, Input } from "../components";

function MartLogin() {
  const navigation = useNavigation();

  return (
    <AvoidKeyboardLayout>
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
            <TouchableOpacity style={{ marginBottom: 50 }}>
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

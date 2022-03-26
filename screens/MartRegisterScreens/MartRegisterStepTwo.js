import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet } from "react-native";
import {
  Container,
  Input,
  Button,
  AvoidKeyboardLayout,
} from "../../components";
import * as ImagePicker from "expo-image-picker";

function MartRegisterStepTwo() {
  const navigation = useNavigation();

  async function openImageLibrary() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    console.log("CBM", { result });
  }

  return (
    <AvoidKeyboardLayout>
      <Container>
        <View style={styles.circleRight}></View>

        <View style={styles.container}>
          <View style={styles.heading}>
            <Text style={styles.mainHeading}>Step 02</Text>
            <Text style={styles.secondHeading}>Enter your Mart details</Text>
          </View>

          <View style={styles.inputs}>
            <Input label="Mart Name" required />
            <Input label="Mart Address" required />
            <Input label="Email" required />
            <Input label="Mart Cell #" required />

            <Button title="UPLOAD LOGO" size="sm" onClick={openImageLibrary} />
          </View>

          <View style={styles.buttons}>
            <Button
              title="REGISTER"
              onClick={() => navigation.navigate("MartLogin")}
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

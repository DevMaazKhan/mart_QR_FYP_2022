import { View, Text } from "react-native";
import { AvoidKeyboardLayout, Button } from "../../components";

function ForgotPasswordStepOne() {
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
              onClick={() =>
                navigation.navigate("MartLogin", { loggedIn: true })
              }
              primary
            />
          </View>
        </View>
      </Container>
    </AvoidKeyboardLayout>
  );
}

export default ForgotPasswordStepOne;

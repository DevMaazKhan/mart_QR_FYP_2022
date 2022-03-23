import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet } from "react-native";
import { Container, Input, Button } from "../../components";

function MartRegisterStepOne() {
  const navigation = useNavigation();

  return (
    <Container>
      <View style={styles.circleRight}></View>

      <View style={styles.container}>
        <View style={styles.heading}>
          <Text style={styles.mainHeading}>Step 01</Text>
          <Text style={styles.secondHeading}>Enter your basic details</Text>
        </View>

        <View style={styles.inputs}>
          <Input label="Username" required />
          <Input label="Password" required />
          <Input label="Confirm Password" required />
        </View>

        <View style={styles.buttons}>
          <Button
            title="NEXT"
            onClick={() => navigation.navigate("MartRegisterStepTwo")}
            primary
          />
        </View>
      </View>
    </Container>
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

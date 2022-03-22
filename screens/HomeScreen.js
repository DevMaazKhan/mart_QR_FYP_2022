import { View, StatusBar, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Button from "../components/utils/Button/Button";
import Container from "../components/layout/Container";

function HomeScreen() {
  const navigation = useNavigation();

  return (
    <Container>
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="dark-content"
      />
      <View style={styles.containerHeader}>
        <View style={styles.circleLeft}></View>
        <View style={styles.circleRight}></View>
        <View style={styles.logo}>
          <Text style={styles.logoText}>Customer{"\n"} Service</Text>
        </View>
      </View>
      <View style={styles.containerFooter}>
        <Button
          title="Customer"
          marginBottom={10}
          primary
          onClick={() => navigation.navigate("CustomerDashboard")}
        />
        <Button title="Mart" onClick={() => navigation.navigate("MartLogin")} />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  containerHeader: {
    flex: 4,
  },
  circleLeft: {
    width: 400,
    height: 400,
    backgroundColor: "#77B6EA",
    borderRadius: 400 / 2,
    position: "absolute",
    right: -200,
    top: -50,
    opacity: 0.7,
  },
  circleRight: {
    width: 400,
    height: 400,
    backgroundColor: "#77B6EA",
    borderRadius: 400 / 2,
    position: "absolute",
    left: -100,
    top: -200,
    opacity: 0.7,
  },
  logo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: {
    fontSize: 36,
    textTransform: "uppercase",
    fontFamily: "BOLD",
    textAlign: "center",
    lineHeight: 40,
  },
  containerFooter: {
    flex: 1,
  },
});

export default HomeScreen;

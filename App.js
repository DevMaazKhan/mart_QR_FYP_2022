import { StyleSheet, View, Text, StatusBar } from "react-native";
import Button from "./components/utils/Button/Button.jsx";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="dark-content"
      />
      <View style={styles.containerHeader}>
        <View style={styles.circleLeft}></View>
        <View style={styles.circleRight}></View>
        <View style={styles.logo}>
          <Text style={styles.logoText}>Customer Service</Text>
        </View>
      </View>
      <View style={styles.containerFooter}>
        <Button title="Customer" marginBottom={10} primary />
        <Button title="Mart" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EEF2",
  },
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
    fontSize: 30,
    textTransform: "uppercase",
  },
  containerFooter: {
    flex: 1,
    padding: 30,
  },
});

import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import Container from "../../../components/layout/Container";
import Input from "../../../components/utils/Input/Input";
import MartList from "./MartList";

function CustomerDashboardScreen() {
  const [query, setQuery] = useState("");

  return (
    <Container>
      <View style={styles.circleRight}></View>
      <View style={styles.container}>
        <Input
          placeholder="Search Mart ..."
          onChange={(text) => setQuery(text)}
        />

        <MartList query={query} />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
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
  container: {
    marginTop: 100,
  },
});

export default CustomerDashboardScreen;

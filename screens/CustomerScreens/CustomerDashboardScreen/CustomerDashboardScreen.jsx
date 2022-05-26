import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { COLORS } from "../../../constants/Theme";
import { useState } from "react";
import Container from "../../../components/layout/Container";
import Input from "../../../components/utils/Input/Input";
import MartList from "./MartList";

function CustomerDashboardScreen() {
  const [query, setQuery] = useState("");

  const navigation = useNavigation();

  return (
    <Container>
      <View style={styles.circleRight}></View>
      <TouchableOpacity onPress={() => navigation.navigate("ScannerScreen")}>
        <View
          style={{
            width: 50,
            height: 50,
            backgroundColor: COLORS.WHITE,
            borderRadius: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            elevation: 10,
            marginLeft: "auto",
          }}
        >
          <AntDesign name="scan1" size={24} color="black" />
        </View>
      </TouchableOpacity>
      <View style={styles.container}>
        <Text style={styles.heading}>Mart List</Text>
        <Text style={styles.subHeading}>Select Your mart to explore more.</Text>

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
    marginTop: 30,
  },

  heading: {
    fontFamily: "BOLD",
    fontSize: 30,
  },

  subHeading: {
    fontFamily: "MEDIUM",
    fontSize: 14,
    marginTop: -11,
    opacity: 0.4,
  },
});

export default CustomerDashboardScreen;

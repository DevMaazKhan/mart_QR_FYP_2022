import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Container from "../../../components/layout/Container";
import Input from "../../../components/utils/Input/Input";
import { COLORS } from "../../../constants/Theme";
import ProductList from "./components/ProductList";
import { useNavigation } from "@react-navigation/native";

export function SelectedMartScreen() {
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
        <Text style={styles.heading}>Baig Mart</Text>
        <Text style={styles.subHeading}>
          Select a product from the list or scan a products QR Code.
        </Text>

        <Input
          placeholder="Search Product ..."
          onChange={(text) => setQuery(text)}
        />

        <ProductList query={query} />
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

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Container from "../../../components/layout/Container";
import Input from "../../../components/utils/Input/Input";
import { ProductList } from "../../../components/Products/ProductList";
import { Select } from "../../../components";

const mockData = [
  { id: "7013ae92-1fe9-41c9-82e2-fd1f5d220fe9", martName: "Thoughtstorm" },
  { id: "d27c3afb-14a4-476c-b4d3-ff9f906696e8", martName: "Fliptune" },
  { id: "29b459b6-1494-44b5-9a73-dc978beed82d", martName: "Katz" },
  { id: "0e04a2f5-914d-4c4f-bbbc-4577d998995a", martName: "Avavee" },
  { id: "149064a5-186b-4468-8d58-58e90b59c8b7", martName: "Yabox" },
  { id: "41514b25-078c-40d3-9408-b22c395d4f2d", martName: "Devcast" },
  { id: "7503d7e0-5992-468f-9175-43ae8ea8f7cc", martName: "Twitterwire" },
  { id: "7cf670b1-5b49-42c0-b932-b4906410a0cf", martName: "Photofeed" },
  { id: "ef4caf3a-2519-459d-b75f-28e1d65573f5", martName: "Devpoint" },
  { id: "a753ccf6-b81d-48c6-bb72-389940e96f4f", martName: "Kwideo" },
  { id: "e248bc6f-afeb-427a-9c16-29fa05087c95", martName: "Plambee" },
  { id: "f02f86ab-7c62-4faf-a6d1-eddb1d6e139e", martName: "Roodel" },
  { id: "3b2da12d-910a-4790-8500-7a1d848e4d85", martName: "Kamba" },
  { id: "6555d917-078e-41fc-a54c-94f65c7ba2b1", martName: "Cogilith" },
  { id: "6555d917-078e-41fc-a54c-94f65c7ba2b1231", martName: "Cogilith" },
  { id: "6555d917-078e-41fc-a54c-12394f65c7ba2b1231", martName: "Cogilith" },
];

export function CompareProductsScreen() {
  return (
    <Container>
      <View style={styles.circleRight}></View>

      <View style={styles.container}>
        <Text style={styles.heading}>Compare Products</Text>
        <Text style={styles.subHeading}>
          There is the list of all the products in the current shelf, you can
          compare them however you want.
        </Text>

        <View>
          <Select
            options={[
              { firstName: "Hight To Low", id: "1" },
              { firstName: "Low To High", id: "2" },
            ]}
            labelKey="firstName"
            valueKey="id"
            label="Price"
          />
        </View>

        <ProductList products={mockData} query="" />
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

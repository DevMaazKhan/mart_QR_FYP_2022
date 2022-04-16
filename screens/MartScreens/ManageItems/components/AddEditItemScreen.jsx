import { View, Text, StyleSheet } from "react-native";
import { Container, Button, Input } from "../../../../components";
import { useItemScreenContext } from "../context/ManageItems.context";

export function AddEditItemScreen() {
  const { isEditMode } = useItemScreenContext();

  return (
    <Container>
      <View style={styles.root}>
        <Text style={styles.heading}>{isEditMode ? "Edit" : "Add"} Item</Text>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingTop: 20,
  },

  heading: {
    fontFamily: "BOLD",
    fontSize: 30,
  },
});

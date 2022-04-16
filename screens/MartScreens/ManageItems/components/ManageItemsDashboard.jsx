import { View, Text, StyleSheet } from "react-native";
import { Container, Button } from "../../../../components";
import { ItemsTable } from "./ItemsTable";
import { useItemScreenContext } from "../context/ManageItems.context";

export function ManageItemsDashboard() {
  const { goToAddItemScreen } = useItemScreenContext();

  return (
    <Container>
      <View style={styles.root}>
        <Text style={styles.heading}>Manage Items</Text>
        <Text style={styles.subHeading}>Add/Edit/Delete Items</Text>

        <View style={styles.addNewItemBtn}>
          <Button
            title="Add New Item"
            width={150}
            primary
            onClick={goToAddItemScreen}
          />
        </View>

        <ItemsTable />
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

  subHeading: {
    fontFamily: "MEDIUM",
    fontSize: 14,
    marginTop: -11,
    opacity: 0.4,
  },

  addNewItemBtn: {
    display: "flex",
    alignItems: "flex-end",
    marginTop: 10,
  },
});

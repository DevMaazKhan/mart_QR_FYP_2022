import { View, Text, StyleSheet } from "react-native";
import { Container, Button } from "../../../../components";
import { ItemList } from "./ItemList";
import { useNavigation } from "@react-navigation/native";
import { useItemScreenContext } from "../ManageItem.context";

export function ManageItemDashboard() {
  const { pageMethods } = useItemScreenContext();
  const navigation = useNavigation();

  return (
    <Container>
      <View style={styles.root}>
        <Text style={styles.heading}>Manage Item</Text>
        <Text style={styles.subHeading}>Add/Edit/Delete Item</Text>

        <View style={styles.addNewFloorBtn}>
          <Button
            title="Add New Item"
            width={200}
            primary
            onClick={pageMethods.onNewItemAdd}
          />
        </View>

        <View style={{ marginVertical: 10 }} />

        <ItemList />
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

  addNewFloorBtn: {
    display: "flex",
    alignItems: "flex-end",
    marginTop: 10,
  },
});

import { View, Text, StyleSheet } from "react-native";
import { Container, Button } from "../../../../components";
import { ShelvesTable } from "./ShelvesTable";
import { useShelveScreenContext } from "../context/ManageShelves.context";

export function ManageShelvesDashboard() {
  const { goToAddShelveScreen } = useShelveScreenContext();

  return (
    <Container>
      <View style={styles.root}>
        <Text style={styles.heading}>Manage Shelves</Text>
        <Text style={styles.subHeading}>Add/Edit/Delete Shelves</Text>

        <View style={styles.addNewShelveBtn}>
          <Button
            title="Add New Shelve"
            width={150}
            primary
            onClick={goToAddShelveScreen}
          />
        </View>

        <ShelvesTable />
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

  addNewShelveBtn: {
    display: "flex",
    alignShelves: "flex-end",
    marginTop: 10,
  },
});

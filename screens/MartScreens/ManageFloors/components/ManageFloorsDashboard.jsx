import { View, Text, StyleSheet } from "react-native";
import { Container, Button } from "../../../../components";
import { FloorTable } from "./FloorsTable";
import { useFloorScreenContext } from "../context/ManageFloors.context";

export function ManageFloorsDashboard() {
  const { goToAddFloorScreen } = useFloorScreenContext();

  return (
    <Container>
      <View style={styles.root}>
        <Text style={styles.heading}>Manage Floors</Text>
        <Text style={styles.subHeading}>Add/Edit/Delete Floors</Text>

        <View style={styles.addNewFloorBtn}>
          <Button
            title="Add New Floor"
            width={150}
            primary
            onClick={goToAddFloorScreen}
          />
        </View>

        <FloorTable />
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

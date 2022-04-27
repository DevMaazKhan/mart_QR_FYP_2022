import { View, Text, StyleSheet } from "react-native";
import { Container, Button } from "../../../../components";
import { FloorTable } from "./CategoryTable";
import { useCategoryScreenContext } from "../context/ManageCategory.context";

export function ManageCategoryDashboard() {
  const { goToAddCategoryScreen } = useCategoryScreenContext();

  return (
    <Container>
      <View style={styles.root}>
        <Text style={styles.heading}>Manage Category</Text>
        <Text style={styles.subHeading}>Add/Edit/Delete Category</Text>

        <View style={styles.addNewFloorBtn}>
          <Button
            title="Add New Category"
            width={200}
            primary
            onClick={goToAddCategoryScreen}
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

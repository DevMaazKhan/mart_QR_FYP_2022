import { View, Text, StyleSheet } from "react-native";
import { Container, Button } from "../../../../components";
import { CategoryList } from "./CategoryTable";
import { useNavigation } from "@react-navigation/native";

export function ManageCategoryDashboard() {
  const navigation = useNavigation();

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
            onClick={() => {
              navigation.navigate("AddEditCategory");
            }}
          />
        </View>

        <View style={{ marginVertical: 10 }} />

        <CategoryList />
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

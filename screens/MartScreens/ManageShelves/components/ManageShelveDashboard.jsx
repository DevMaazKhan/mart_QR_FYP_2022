import { View, Text, StyleSheet } from "react-native";
import { Container, Button } from "../../../../components";
import { ShelveList } from "./ShelveList";
import { useShelveScreenContext } from "../ManageShelve.context";

export function ManageShelveDashboard() {
  const { pageMethods } = useShelveScreenContext();

  return (
    <Container>
      <View style={styles.root}>
        <Text style={styles.heading}>Manage Shelve</Text>
        <Text style={styles.subHeading}>Add/Edit/Delete Shelve</Text>

        <View style={styles.addNewFloorBtn}>
          <Button
            title="Add New Shelve"
            width={200}
            primary
            onClick={pageMethods.onNewItemAdd}
          />
        </View>

        <View style={{ marginVertical: 10 }} />

        <ShelveList />
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

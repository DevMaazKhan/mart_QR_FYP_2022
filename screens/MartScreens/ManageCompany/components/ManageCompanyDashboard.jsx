import { View, Text, StyleSheet } from "react-native";
import { Container, Button } from "../../../../components";
import { FloorTable } from "./CompanyTable";
import { useCompanyScreenContext } from "../context/ManageCompany.context";

export function ManageCompanyDashboard() {
  const { goToAddCompanyScreen } = useCompanyScreenContext();

  return (
    <Container>
      <View style={styles.root}>
        <Text style={styles.heading}>Manage Company</Text>
        <Text style={styles.subHeading}>Add/Edit/Delete Company</Text>

        <View style={styles.addNewFloorBtn}>
          <Button
            title="Add New Company"
            width={200}
            primary
            onClick={goToAddCompanyScreen}
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

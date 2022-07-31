import { View, Text, StyleSheet } from "react-native";
import { Container, Button } from "../../../../components";
import { CompanyList } from "./CompanyList";
import { useNavigation } from "@react-navigation/native";

export function ManageCompanyDashboard() {
  const navigation = useNavigation();

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
            onClick={() => {
              navigation.navigate("AddEditCompany");
            }}
          />
        </View>

        <View style={{ marginVertical: 10 }} />

        <CompanyList />
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

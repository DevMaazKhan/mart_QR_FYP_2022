import { View, Text, StyleSheet } from "react-native";
import {
  Container,
  Button,
  Input,
  Select,
  AvoidKeyboardLayout,
} from "../../../../components";
import { useCompanyScreenContext } from "../context/ManageCompany.context";
import * as ImagePicker from "expo-image-picker";

export function AddEditCompanyScreen() {
  const { isEditMode } = useCompanyScreenContext();

  async function openImageLibrary() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });
  }

  return (
    <AvoidKeyboardLayout>
      <Container>
        <View style={styles.root}>
          <Text style={styles.heading}>
            {isEditMode ? "Edit" : "Add"} Company
          </Text>
          <View style={styles.form}>
            <Input label="Company Name" />

            <Input label="Company Description" multiLine numberOfLines={4} />

            <Button
              title="Add Company"
              onClick={() => navigation.navigate("ManageCompanys")}
              primary
            />
          </View>
        </View>
      </Container>
    </AvoidKeyboardLayout>
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

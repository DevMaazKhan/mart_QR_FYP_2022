import { View, Text, StyleSheet } from "react-native";
import {
  Container,
  Button,
  Input,
  Select,
  AvoidKeyboardLayout,
} from "../../../../components";
import { useShelveScreenContext } from "../context/ManageShelves.context";
import * as ImagePicker from "expo-image-picker";

export function AddEditShelveScreen() {
  const { isEditMode } = useShelveScreenContext();

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
            {isEditMode ? "Edit" : "Add"} Shelve
          </Text>
          <View style={styles.form}>
            <Input label="Shelve Name" required />

            <Select
              options={[
                { firstName: "123", id: "1" },
                { firstName: "1234", id: "2" },
              ]}
              labelKey="firstName"
              valueKey="id"
              label="Floor"
              required
            />

            <Select
              options={[
                { firstName: "123", id: "1" },
                { firstName: "1234", id: "2" },
              ]}
              labelKey="firstName"
              valueKey="id"
              label="Category"
              required
            />

            <Button
              title="Add Shelve"
              onClick={() => navigation.navigate("ManageShelves")}
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

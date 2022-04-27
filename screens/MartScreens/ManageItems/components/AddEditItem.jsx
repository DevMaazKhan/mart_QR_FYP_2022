import { View, Text, StyleSheet } from "react-native";
import {
  Container,
  Button,
  Input,
  Select,
  AvoidKeyboardLayout,
} from "../../../../components";
import { useItemScreenContext } from "../context/ManageItems.context";
import * as ImagePicker from "expo-image-picker";

export function AddEditItemScreen() {
  const { isEditMode } = useItemScreenContext();

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
          <Text style={styles.heading}>{isEditMode ? "Edit" : "Add"} Item</Text>
          <View style={styles.form}>
            <Input label="Item Name" />
            <Input label="Item Spec" />
            <Input label="Item Description" multiLine numberOfLines={4} />
            <Input label="Price" />
            <Input label="Discount Price" />

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

            <Select
              options={[
                { firstName: "123", id: "1" },
                { firstName: "1234", id: "2" },
              ]}
              labelKey="firstName"
              valueKey="id"
              label="Company"
              required
            />

            <Button title="UPLOAD LOGO" size="sm" onClick={openImageLibrary} />

            <View style={{ marginVertical: 5 }} />

            <Button
              title="Add Item"
              onClick={() => navigation.navigate("ManageItems")}
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

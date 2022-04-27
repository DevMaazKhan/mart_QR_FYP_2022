import { View, Text, StyleSheet } from "react-native";
import {
  Container,
  Button,
  Input,
  Select,
  AvoidKeyboardLayout,
} from "../../../../components";
import { useCategoryScreenContext } from "../context/ManageCategory.context";
import * as ImagePicker from "expo-image-picker";

export function AddEditCategoryScreen() {
  const { isEditMode } = useCategoryScreenContext();

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
            {isEditMode ? "Edit" : "Add"} Category
          </Text>
          <View style={styles.form}>
            <Input label="Category Name" />

            <Input label="Category Description" multiLine numberOfLines={4} />

            <Button
              title="Add Category"
              onClick={() => navigation.navigate("ManageCategorys")}
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

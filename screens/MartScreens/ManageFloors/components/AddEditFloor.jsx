import { View, Text, StyleSheet } from "react-native";
import {
  Container,
  Button,
  Input,
  Select,
  AvoidKeyboardLayout,
} from "../../../../components";
import { useFloorScreenContext } from "../context/ManageFloors.context";
import * as ImagePicker from "expo-image-picker";

export function AddEditFloorScreen() {
  const { isEditMode } = useFloorScreenContext();

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
            {isEditMode ? "Edit" : "Add"} Floor
          </Text>
          <View style={styles.form}>
            <Input label="Floor Name" />

            <Input label="Floor Description" multiLine numberOfLines={4} />

            <Button
              title="Add Floor"
              onClick={() => navigation.navigate("ManageFloors")}
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

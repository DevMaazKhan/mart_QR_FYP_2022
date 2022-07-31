import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  Container,
  Button,
  Input,
  AvoidKeyboardLayout,
  Toast,
  Select,
} from "../../../../components";
import { useFormContext, Controller } from "react-hook-form";
import { useShelveScreenContext } from "../ManageShelve.context";
import { AntDesign } from "@expo/vector-icons";
import { COLORS } from "../../../../constants/Theme";

export function AddEditShelveScreen() {
  const { pageState, pageMethods, pageDataSets } = useShelveScreenContext();

  const formMethods = useFormContext();

  return (
    <>
      <Toast
        msg={pageState.toast.msg}
        secondMsg={pageState.toast.secondMsg}
        show={pageState.toast.show}
        type={pageState.toast.type}
      />
      <AvoidKeyboardLayout>
        <Container>
          <View style={styles.root}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.heading}>
                {formMethods.getValues("ID") ? "Edit" : "Add"} Shelve
              </Text>

              {pageState.loading && <ActivityIndicator color={COLORS.BLACK} />}
            </View>

            {formMethods.getValues("ID") && (
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={pageMethods.deleteItem}
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                }}
              >
                <View
                  style={{
                    backgroundColor: COLORS.ERROR,
                    width: 60,
                    height: 60,
                    borderRadius: 100,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <AntDesign name="delete" size={24} color={COLORS.WHITE} />
                </View>
              </TouchableOpacity>
            )}

            <View style={styles.form}>
              <Controller
                control={formMethods.control}
                name="ShelveName"
                render={({ field }) => (
                  <Input
                    label="Shelve Name"
                    value={field.value}
                    onChange={(e) => field.onChange(e)}
                    isError={
                      formMethods.formState.errors["ShelveName"]?.message
                    }
                    errorText={
                      formMethods.formState.errors["ShelveName"]?.message
                    }
                  />
                )}
              />

              <Controller
                control={formMethods.control}
                name="FloorID"
                render={({ field }) => (
                  <Select
                    options={[
                      { CategoryName: "", ID: "" },
                      ...pageDataSets.floors,
                    ]}
                    labelKey="FloorName"
                    valueKey="ID"
                    label="Floor"
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
                    required
                  />
                )}
              />

              <Controller
                control={formMethods.control}
                name="CategoryID"
                render={({ field }) => (
                  <Select
                    options={[
                      { CategoryName: "", ID: "" },
                      ...pageDataSets.categories,
                    ]}
                    labelKey="CategoryName"
                    valueKey="ID"
                    label="Category"
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
                    required
                  />
                )}
              />

              <Button
                title={`${formMethods.getValues("ID") ? "Edit" : "Add"} Shelve`}
                onClick={pageMethods.save}
                primary
              />
            </View>
          </View>
        </Container>
      </AvoidKeyboardLayout>
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingTop: 20,
    flex: 1,
  },

  heading: {
    fontFamily: "BOLD",
    fontSize: 30,
  },
});

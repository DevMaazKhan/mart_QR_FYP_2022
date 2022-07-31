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
} from "../../../../components";
import { useFormContext, Controller } from "react-hook-form";
import { useCategoryScreenContext } from "../ManageCategory.context";
import { AntDesign } from "@expo/vector-icons";
import { COLORS } from "../../../../constants/Theme";

export function AddEditCategoryScreen() {
  const { pageMethods, pageState } = useCategoryScreenContext();

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
                {formMethods.getValues("ID") ? "Edit" : "Add"} Category
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
                name="CategoryName"
                render={({ field }) => (
                  <Input
                    label="Category Name"
                    value={field.value}
                    onChange={(e) => field.onChange(e)}
                    isError={
                      formMethods.formState.errors["CategoryName"]?.message
                    }
                    errorText={
                      formMethods.formState.errors["CategoryName"]?.message
                    }
                  />
                )}
              />

              <Controller
                control={formMethods.control}
                name="CategoryDesc"
                render={({ field }) => (
                  <Input
                    label="Category Description"
                    multiLine
                    numberOfLines={4}
                    value={field.value}
                    onChange={(e) => field.onChange(e)}
                  />
                )}
              />

              <View style={{ marginVertical: 10 }} />

              <Button
                title={`${
                  formMethods.getValues("ID") ? "Edit" : "Add"
                } Category`}
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

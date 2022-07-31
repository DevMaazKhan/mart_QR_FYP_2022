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
import { useItemScreenContext } from "../ManageItem.context";
import { AntDesign } from "@expo/vector-icons";
import { COLORS } from "../../../../constants/Theme";

export function AddEditItemScreen() {
  const formMethods = useFormContext();

  const { pageMethods, pageState, pageDataSets } = useItemScreenContext();

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
                {formMethods.getValues("ID") ? "Edit" : "Add"} Item
              </Text>

              {pageState.loading && <ActivityIndicator color={COLORS.BLACK} />}
            </View>

            {formMethods.getValues("ID") && (
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={pageMethods.deleteItem}
                style={{
                  position: "absolute",
                  bottom: -30,
                  right: 0,
                  elevation: 10,
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
                name="ItemName"
                render={({ field }) => (
                  <Input
                    label="Item Name"
                    value={field.value}
                    onChange={(e) => field.onChange(e)}
                    isError={formMethods.formState.errors["ItemName"]?.message}
                    errorText={
                      formMethods.formState.errors["ItemName"]?.message
                    }
                  />
                )}
              />

              <Controller
                control={formMethods.control}
                name="ItemSpec"
                render={({ field }) => (
                  <Input
                    label="Item Spec"
                    value={field.value}
                    onChange={(e) => field.onChange(e)}
                  />
                )}
              />

              <Controller
                control={formMethods.control}
                name="ItemDesc"
                render={({ field }) => (
                  <Input
                    label="Item Description"
                    multiLine
                    numberOfLines={4}
                    value={field.value}
                    onChange={(e) => field.onChange(e)}
                  />
                )}
              />

              <Controller
                control={formMethods.control}
                name="TPrice"
                render={({ field }) => (
                  <Input
                    label="Price"
                    value={field.value}
                    onChange={(e) => field.onChange(e)}
                    isError={formMethods.formState.errors["TPrice"]?.message}
                    errorText={formMethods.formState.errors["TPrice"]?.message}
                  />
                )}
              />

              <Controller
                control={formMethods.control}
                name="DPrice"
                render={({ field }) => (
                  <Input
                    label="Discount Price"
                    value={field.value}
                    onChange={(e) => field.onChange(e)}
                  />
                )}
              />

              <Controller
                control={formMethods.control}
                name="ShelveID"
                render={({ field }) => (
                  <Select
                    options={[
                      { CategoryName: "", ID: "" },
                      ...pageDataSets.shelves,
                    ]}
                    labelKey="ShelveName"
                    valueKey="ID"
                    label="Shelve"
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
                    required
                  />
                )}
              />

              <Controller
                control={formMethods.control}
                name="CompanyID"
                render={({ field }) => (
                  <Select
                    options={[
                      { CategoryName: "", ID: "" },
                      ...pageDataSets.companies,
                    ]}
                    labelKey="CompanyName"
                    valueKey="ID"
                    label="Company"
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
                    required
                  />
                )}
              />

              {/* <Button title="UPLOAD LOGO" size="sm" onClick={openImageLibrary} /> */}

              <View style={{ marginVertical: 10 }} />

              <Button
                title={`${formMethods.getValues("ID") ? "Edit" : "Add"} Item`}
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
  },

  heading: {
    fontFamily: "BOLD",
    fontSize: 30,
  },
});

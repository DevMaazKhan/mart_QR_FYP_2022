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
import { useCompanyScreenContext } from "../ManageCompany.context";
import * as yup from "yup";
import { AntDesign } from "@expo/vector-icons";
import { COLORS } from "../../../../constants/Theme";

export function AddEditCompanyScreen() {
  const { pageMethods, pageState } = useCompanyScreenContext();

  const formMethods = useFormContext();

  console.log("CBM", formMethods.formState.touchedFields);

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
                {formMethods.getValues("ID") ? "Edit" : "Add"} Company
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
                name="CompanyName"
                render={({ field }) => (
                  <Input
                    label="Company Name"
                    value={field.value}
                    onChange={(e) => field.onChange(e)}
                    isError={
                      formMethods.formState.errors["CompanyName"]?.message
                    }
                    errorText={
                      formMethods.formState.errors["CompanyName"]?.message
                    }
                  />
                )}
              />

              <Controller
                control={formMethods.control}
                name="CompanyDesc"
                render={({ field }) => (
                  <Input
                    label="Company Description"
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
                } Company`}
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

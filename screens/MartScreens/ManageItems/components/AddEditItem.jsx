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
import QrCode from "react-native-qrcode-svg";
import { useRef, useState } from "react";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

export function AddEditItemScreen() {
  const formMethods = useFormContext();
  const [showQRCode, setShowQRCode] = useState(false);
  const ref = useRef();

  const { pageMethods, pageState, pageDataSets } = useItemScreenContext();

  function saveToMedia() {
    if (ref.current) {
      ref.current.toDataURL(async (e) => {
        const filename = FileSystem.documentDirectory + "martQRCode.png";

        await FileSystem.writeAsStringAsync(filename, e, {
          encoding: FileSystem.EncodingType.Base64,
        });

        const permission = await MediaLibrary.getPermissionsAsync();

        let permissionGranted = permission.granted;

        if (permissionGranted === false) {
          const againPermission = await MediaLibrary.requestPermissionsAsync();

          permissionGranted = againPermission.granted;
        }

        if (permissionGranted) {
          await MediaLibrary.saveToLibraryAsync(filename);

          setShowQRCode(false);
        }
      });
    }
  }

  async function openImageLibrary() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dcbwrkyux/image/upload?upload_preset=q2yuodxb&api-key=589789488741426",
        {
          file: `data:image/png;base64,${result.base64}`,
        }
      );

      formMethods.reset({
        ...formMethods.getValues(),
        ImgUrl: res.data.url,
      });
    } catch (error) {
      console.log("CBM", { error });
    }
  }

  return (
    <>
      {showQRCode && (
        <>
          <View
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backgroundColor: COLORS.BLACK,
              opacity: 0.5,
              zIndex: 10,
              top: 0,
              left: 0,
              alignItems: "center",
              justifyContent: "center",
            }}
          ></View>

          <View
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              zIndex: 11,
              top: 0,
              left: 0,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View style={{ position: "absolute", top: 50, right: 50 }}>
              <AntDesign
                name="closecircle"
                size={34}
                color={COLORS.WHITE}
                onPress={() => {
                  setShowQRCode(false);
                }}
              />
            </View>
            <QrCode
              value={formMethods.getValues("ID")}
              size={250}
              getRef={(e) => (ref.current = e)}
            />
            <View style={{ marginVertical: 10 }} />
            <Button
              title="Download"
              width={200}
              onClick={saveToMedia}
              primary
            />
          </View>
        </>
      )}

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
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.heading}>
                  {formMethods.getValues("ID") ? "Edit" : "Add"} Item
                </Text>
                {formMethods.getValues("ID") && (
                  <TouchableOpacity
                    activeOpacity={0.4}
                    onPress={() => {
                      setShowQRCode(true);
                    }}
                    style={{ marginLeft: 20 }}
                  >
                    <View>
                      <QrCode
                        value={formMethods.getValues("ID")}
                        size={30}
                        getRef={(e) => (ref.current = e)}
                      />
                    </View>
                  </TouchableOpacity>
                )}
              </View>

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

              <Button
                title="UPLOAD LOGO"
                size="sm"
                onClick={openImageLibrary}
              />

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

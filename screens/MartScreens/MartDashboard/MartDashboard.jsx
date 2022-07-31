import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Button, Container } from "../../../components";
import { COLORS } from "../../../constants/Theme";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useUserContext } from "../../../contexts/UserContext";
import QrCode from "react-native-qrcode-svg";
import { useEffect, useRef, useState } from "react";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { AntDesign } from "@expo/vector-icons";

// const data = "data:image/png;base64,ASDFASDFASDf........"
// const base64Code = data.split("data:image/png;base64,")[1];

// const filename = FileSystem.documentDirectory + "some_unique_file_name.png";
// await FileSystem.writeAsStringAsync(filename, base64Code, {
//   encoding: FileSystem.EncodingType.Base64,
// });

// const mediaResult = await MediaLibrary.saveToLibraryAsync(filename);

function MartDashboard() {
  const navigation = useNavigation();
  const { user } = useUserContext();
  const ref = useRef();
  const [showQRCode, setShowQRCode] = useState(false);

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
              value={user.martID}
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

      <Container>
        <TouchableOpacity
          activeOpacity={0.4}
          onPress={() => {
            setShowQRCode(true);
          }}
          style={{
            position: "absolute",
            bottom: 50,
            right: 50,
          }}
        >
          <View>
            <QrCode
              value={user.martID}
              size={50}
              getRef={(e) => (ref.current = e)}
            />
          </View>
        </TouchableOpacity>

        <View style={styles.root}>
          <View style={styles.circleRight}></View>

          <Text style={styles.heading}>{user.martName}</Text>

          <View style={styles.boxes}>
            <TouchableOpacity
              style={styles.box}
              activeOpacity={1}
              onPress={() => navigation.navigate("ManageItemNavigator")}
            >
              <View style={styles.boxInner}>
                <Feather
                  name="shopping-cart"
                  size={20}
                  style={{ marginBottom: 10 }}
                />
                <Text style={styles.boxSubHeading}>{user.itemsCount}</Text>
                <Text style={styles.boxHeading}>Items</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.box}
              activeOpacity={1}
              onPress={() => navigation.navigate("ManageShelveNavigator")}
            >
              <View style={styles.boxInner}>
                <MaterialCommunityIcons
                  name="library-shelves"
                  size={20}
                  style={{ marginBottom: 10 }}
                />
                <Text style={styles.boxSubHeading}>{user.shelvesCount}</Text>
                <Text style={styles.boxHeading}>Shelves</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.box}
              activeOpacity={1}
              onPress={() => navigation.navigate("ManageFloorNavigator")}
            >
              <View style={styles.boxInner}>
                <MaterialCommunityIcons
                  name="layers-outline"
                  size={20}
                  style={{ marginBottom: 10 }}
                />
                <Text style={styles.boxSubHeading}>{user.floorsCount}</Text>
                <Text style={styles.boxHeading}>Floors</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.box}
              activeOpacity={1}
              onPress={() => navigation.navigate("ManageCategoryNavigator")}
            >
              <View style={styles.boxInner}>
                <MaterialCommunityIcons
                  name="layers-outline"
                  size={20}
                  style={{ marginBottom: 10 }}
                />
                <Text style={styles.boxSubHeading}>{user.categoriesCount}</Text>
                <Text style={styles.boxHeading}>Categories</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.box}
              activeOpacity={1}
              onPress={() => navigation.navigate("ManageCompanyNavigation")}
            >
              <View style={styles.boxInner}>
                <MaterialCommunityIcons
                  name="layers-outline"
                  size={20}
                  style={{ marginBottom: 10 }}
                />
                <Text style={styles.boxSubHeading}>{user.companiesCount}</Text>
                <Text style={styles.boxHeading}>Companies</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.box}
              activeOpacity={1}
              onPress={() => navigation.navigate("MartSettings")}
            >
              <View style={styles.boxInner}>
                <MaterialIcons name="settings" size={20} />
                <Text style={styles.boxHeading}>Settings</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={1}
              style={styles.box}
              onPress={() => navigation.navigate("MartLogin")}
            >
              <View style={styles.boxInner}>
                <MaterialIcons name="logout" size={20} />
                <Text style={styles.boxHeading}>Logout</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Container>
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 60,
  },

  circleRight: {
    width: 400,
    height: 400,
    backgroundColor: "#77B6EA",
    borderRadius: 400 / 2,
    position: "absolute",
    right: -200,
    top: -200,
    opacity: 0.7,
  },

  heading: {
    fontSize: 30,
    fontFamily: "BOLD",
    color: COLORS.BLACK,
  },

  boxes: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },

  box: {
    flexBasis: "50%",
    padding: 4,
  },

  boxInner: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: COLORS.PRIMARY,
    minHeight: 100,
    justifyContent: "flex-end",
  },

  boxHeading: {
    fontSize: 20,
    fontFamily: "MEDIUM",
  },

  boxSubHeading: {
    fontSize: 14,
    fontFamily: "MEDIUM",
    marginBottom: -10,
    color: COLORS.PRIMARY,
  },
});

export default MartDashboard;

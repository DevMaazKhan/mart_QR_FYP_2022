import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Container } from "../../../components";
import { COLORS } from "../../../constants/Theme";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useUserContext } from "../../../contexts/UserContext";

function MartDashboard() {
  const navigation = useNavigation();
  const { user } = useUserContext();

  return (
    <Container>
      <View style={styles.root}>
        <View style={styles.circleRight}></View>

        <Text style={styles.heading}>{user.martName}</Text>

        <View style={styles.boxes}>
          <TouchableOpacity
            style={styles.box}
            activeOpacity={1}
            onPress={() => navigation.navigate("ManageItems")}
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
            onPress={() => navigation.navigate("ManageShelves")}
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
            onPress={() => navigation.navigate("ManageFloors")}
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
            onPress={() => navigation.navigate("ManageCategory")}
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
            onPress={() => navigation.navigate("ManageCompany")}
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

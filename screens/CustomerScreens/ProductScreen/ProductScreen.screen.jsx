import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { AvoidKeyboardLayout } from "../../../components";
import { COLORS } from "../../../constants/Theme";

function ProductScreen() {
  const navigation = useNavigation();

  return (
    <AvoidKeyboardLayout>
      <View style={styles.productContainer}>
        <Image
          style={{
            width: "100%",
            height: 250,
            resizeMode: "center",
            backgroundColor: COLORS.WHITE,
          }}
          source={require("../../../assets/images/productImg.png")}
        />

        <View style={styles.productHeading}>
          <View
            style={{
              marginBottom: 5,
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
            }}
          >
            <View
              style={{
                backgroundColor: COLORS.PRIMARY,
                paddingHorizontal: 10,
                paddingVertical: 2,
                borderRadius: 10,
              }}
            >
              <Text style={{ color: COLORS.WHITE, fontSize: 10 }}>Nestle</Text>
            </View>

            <View
              style={{
                borderWidth: 1,
                borderColor: COLORS.PRIMARY,
                paddingHorizontal: 10,
                paddingVertical: 2,
                borderRadius: 10,
              }}
            >
              <Text style={{ color: COLORS.BLACK, fontSize: 8 }}>Shampoo</Text>
            </View>
          </View>
          <Text style={styles.productHeadingText}>This is a fruit</Text>
          <View style={styles.productPriceContainer}>
            <Text style={styles.productPriceHeading}>Price:</Text>
            <Text style={styles.productPriceText}>100</Text>
          </View>
          <Text style={styles.productDescription}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum id
            voluptate a deserunt possimus sequi, maxime fugit ex harum incidunt.
          </Text>

          <View style={styles.divider}></View>

          <View style={styles.infoItemContainer}>
            <Text style={styles.infoItemHeading}>Floor:</Text>
            <Text style={styles.infoItemText}>01</Text>
          </View>

          <View style={styles.infoItemContainer}>
            <Text style={styles.infoItemHeading}>Shelf:</Text>
            <Text style={styles.infoItemText}>324</Text>
          </View>
        </View>
      </View>
      <View style={styles.floatingButton}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={{ width: "100%", height: "100%" }}
          onPress={() => navigation.navigate("CompareProductScreen")}
        >
          <View style={{ alignItems: "center" }}>
            <Text style={styles.heading}>Compare Products</Text>
            <Text style={styles.para}>
              Tap to compare all the products in current shelve
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </AvoidKeyboardLayout>
  );
}

const styles = StyleSheet.create({
  productContainer: {
    flex: 1,
  },
  productHeading: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  productHeadingText: {
    fontSize: 30,
    fontFamily: "BOLD",
  },
  productDescription: {
    fontFamily: "LIGHT",
  },
  productPriceContainer: {
    flexDirection: "row",
    marginTop: -15,
  },
  productPriceHeading: {
    fontSize: 20,
    fontFamily: "MEDIUM",
    color: COLORS.BLACK,
    marginRight: 10,
  },
  productPriceText: {
    fontSize: 20,
    fontFamily: "MEDIUM",
    color: COLORS.BLACK,
  },

  productInfo: {
    marginTop: 20,
    flexDirection: "row",
    minHeight: 200,
  },

  productInfoLeft: {
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },

  divider: {
    height: 0.5,
    width: "100%",
    backgroundColor: COLORS.BLACK,
    opacity: 0.3,
    marginTop: 10,
    marginBottom: 20,
  },

  productInfoRight: {
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },

  infoItemContainer: {
    flexDirection: "row",
  },
  infoItemHeading: {
    fontSize: 16,
    fontFamily: "LIGHT",
    color: COLORS.BLACK,
    marginRight: 10,
  },
  infoItemText: {
    fontSize: 16,
    fontFamily: "LIGHT",
    color: COLORS.BLACK,
  },

  floatingButton: {
    position: "absolute",
    bottom: 0,
    width: "90%",
    backgroundColor: COLORS.PRIMARY,
    elevation: 10,
    margin: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
  },

  heading: {
    fontSize: 20,
    fontFamily: "BOLD",
  },

  para: {
    fontSize: 12,
    color: COLORS.BLACK,
    marginTop: -7,
    opacity: 0.6,
  },
});

export default ProductScreen;

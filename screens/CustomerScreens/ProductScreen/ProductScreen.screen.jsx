import { useNavigation, useRoute } from "@react-navigation/native";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { AvoidKeyboardLayout } from "../../../components";
import { COLORS } from "../../../constants/Theme";
import { db } from "../../../firebase.config";
import { useLoadingContext } from "../../../contexts/LoadingContext";

function ProductScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [pageData, setPageData] = useState({});
  const { startLoading, endLoading, loading } = useLoadingContext();

  useEffect(() => {
    const getData = async () => {
      if (route.params) {
        startLoading();
        let company = undefined;
        let shelve = undefined;
        let category = undefined;
        let floor = undefined;

        const itemRef = doc(db, "Item", route.params.itemID);

        const item = await getDoc(itemRef);

        if (item.data().CompanyID) {
          const companyRef = doc(db, "Company", item.data().CompanyID);
          company = (await getDoc(companyRef)).data();
        }

        if (item.data().ShelveID) {
          const shelveRef = doc(db, "Shelve", item.data().ShelveID);
          shelve = (await getDoc(shelveRef)).data();

          if (shelve) {
            if (shelve?.FloorID) {
              const floorRef = doc(db, "Floor", shelve?.FloorID);
              floor = (await getDoc(floorRef)).data();
            }

            if (shelve?.CategoryID) {
              const categoryRef = doc(db, "Category", shelve?.CategoryID);
              category = (await getDoc(categoryRef)).data();
            }
          }
        }

        setPageData({
          ...item.data(),
          company: company,
          category: category,
          floor: floor,
          shelve: shelve,
        });

        endLoading();
      }
    };

    getData();
  }, [route]);

  console.log("CBM", { pageData });

  return (
    <AvoidKeyboardLayout>
      <View style={styles.productContainer}>
        {loading && (
          <View style={{ position: "absolute", top: 40, zIndex: 1, right: 20 }}>
            <ActivityIndicator color={COLORS.BLACK} />
          </View>
        )}

        <Image
          style={{
            width: "100%",
            height: 250,
            resizeMode: "center",
            backgroundColor: COLORS.WHITE,
          }}
          // source={require("../../../assets/images/productImg.png")}
          source={{ uri: pageData.ImgUrl }}
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
            {pageData?.company?.CompanyName && (
              <View
                style={{
                  backgroundColor: COLORS.PRIMARY,
                  paddingHorizontal: 10,
                  paddingVertical: 2,
                  borderRadius: 10,
                }}
              >
                <Text style={{ color: COLORS.WHITE, fontSize: 10 }}>
                  {pageData?.company?.CompanyName}
                </Text>
              </View>
            )}

            {pageData?.category?.CategoryName && (
              <View
                style={{
                  borderWidth: 1,
                  borderColor: COLORS.PRIMARY,
                  paddingHorizontal: 10,
                  paddingVertical: 2,
                  borderRadius: 10,
                }}
              >
                <Text style={{ color: COLORS.BLACK, fontSize: 8 }}>
                  {pageData?.category?.CategoryName}
                </Text>
              </View>
            )}
          </View>
          <Text style={styles.productHeadingText}>{pageData.ItemName}</Text>
          <View style={styles.productPriceContainer}>
            <Text style={styles.productPriceHeading}>Price:</Text>
            {pageData.DPrice && +pageData.DPrice > 0 ? (
              <>
                <Text
                  style={{
                    fontFamily: "BOLD",
                    color: COLORS.ERROR,
                    textDecorationLine: "line-through",
                    fontSize: 20,
                  }}
                >
                  {pageData.TPrice} RS
                </Text>
                <Text
                  style={{
                    fontFamily: "BOLD",
                    color: COLORS.SUCCESS,
                    marginLeft: 10,
                    fontSize: 20,
                  }}
                >
                  {pageData.DPrice} RS
                </Text>
              </>
            ) : (
              <Text
                style={{
                  fontFamily: "BOLD",
                  color: COLORS.BLACK,
                  fontSize: 20,
                }}
              >
                {pageData.TPrice} RS
              </Text>
            )}
          </View>
          <Text style={styles.productDescription}>{pageData.ItemDesc}</Text>

          <View style={styles.divider}></View>

          {pageData.floor?.FloorName && (
            <View style={styles.infoItemContainer}>
              <Text style={styles.infoItemHeading}>Floor:</Text>
              <Text style={styles.infoItemText}>
                {pageData.floor?.FloorName}
              </Text>
            </View>
          )}

          {pageData.shelve?.ShelveName && (
            <View style={styles.infoItemContainer}>
              <Text style={styles.infoItemHeading}>Shelve:</Text>
              <Text style={styles.infoItemText}>
                {pageData.shelve?.ShelveName}
              </Text>
            </View>
          )}
        </View>
      </View>
      <View style={styles.floatingButton}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={{
            width: "100%",
            height: "100%",
          }}
          onPress={() =>
            navigation.navigate("CompareProductScreen", {
              shelveID: pageData.ShelveID,
            })
          }
          disabled={!pageData.shelve}
        >
          <View
            style={{
              alignItems: "center",
              opacity: !pageData.shelve ? 0.3 : 1,
            }}
          >
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

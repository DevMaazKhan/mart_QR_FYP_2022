import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Container from "../../../components/layout/Container";
import Input from "../../../components/utils/Input/Input";
import { ProductList } from "../../../components/Products/ProductList";
import { Select } from "../../../components";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db, ItemCollection } from "../../../firebase.config";
import lodash from "lodash";

export function CompareProductsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [pageData, setPageData] = useState({});
  const [sortType, setSortType] = useState("1");

  useEffect(() => {
    const getData = async () => {
      const shelveRef = doc(db, "Shelve", route.params.shelveID);

      const shelve = await getDoc(shelveRef);

      const q = query(ItemCollection, where("ShelveID", "==", shelve.id));

      const querySnapshot = await getDocs(q);

      let items = [];

      await new Promise((resolve, reject) => {
        querySnapshot.forEach(async (item) => {
          let company = undefined;
          let shelve = undefined;
          let category = undefined;
          if (item.data().CompanyID) {
            const companyRef = doc(db, "Company", item.data().CompanyID);
            company = (await getDoc(companyRef)).data();
          }

          if (item.data().ShelveID) {
            const shelveRef = doc(db, "Shelve", item.data().ShelveID);

            shelve = (await getDoc(shelveRef)).data();

            if (shelve?.CategoryID) {
              const categoryRef = doc(db, "Category", shelve?.CategoryID);
              category = await getDoc(categoryRef);
            }
          }

          items.push({
            ...item.data(),
            id: item.id,
            company: company,
            category: category,
          });

          if (querySnapshot.size === items.length) {
            resolve();
          }
        });
      });

      setPageData({
        items,
        ...shelve.data(),
      });
    };

    getData();
  }, [route]);

  return (
    <Container>
      <View style={styles.circleRight}></View>

      <View style={styles.container}>
        <Text style={styles.heading}>Compare Products</Text>
        <Text style={styles.subHeading}>
          There is the list of all the products in the current shelf, you can
          compare them however you want.
        </Text>

        <View>
          <Select
            options={[
              { firstName: "Hight To Low", id: "1" },
              { firstName: "Low To High", id: "2" },
            ]}
            labelKey="firstName"
            valueKey="id"
            label="Price"
            value={sortType}
            onChange={(value) => {
              console.log("CBM", { value });

              setSortType(value);
            }}
          />
        </View>

        <ProductList
          products={
            sortType === "1"
              ? lodash.orderBy(pageData.items, ["TPrice"], ["desc"])
              : lodash.orderBy(pageData.items, ["TPrice"], ["asc"])
          }
          onProductPress={(itemID) => {
            navigation.navigate("ProductScreen", { itemID });
          }}
          query=""
        />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  circleRight: {
    width: 400,
    height: 400,
    backgroundColor: "#77B6EA",
    borderRadius: 400 / 2,
    position: "absolute",
    left: -100,
    top: -200,
    opacity: 0.7,
  },

  container: {
    marginTop: 30,
  },

  heading: {
    fontFamily: "BOLD",
    fontSize: 30,
  },

  subHeading: {
    fontFamily: "MEDIUM",
    fontSize: 14,
    marginTop: -11,
    opacity: 0.4,
  },
});

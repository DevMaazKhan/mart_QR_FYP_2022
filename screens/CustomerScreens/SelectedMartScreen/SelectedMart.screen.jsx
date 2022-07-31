import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Container from "../../../components/layout/Container";
import Input from "../../../components/utils/Input/Input";
import { COLORS } from "../../../constants/Theme";
import { doc, getDoc, getDocs, query as que, where } from "firebase/firestore";
import { ProductList } from "../../../components/Products/ProductList";
import { useNavigation, useRoute } from "@react-navigation/native";
import { db, ItemCollection } from "../../../firebase.config";
import { useLoadingContext } from "../../../contexts/LoadingContext";

const mockData = [
  { id: "7013ae92-1fe9-41c9-82e2-fd1f5d220fe9", martName: "Thoughtstorm" },
  { id: "d27c3afb-14a4-476c-b4d3-ff9f906696e8", martName: "Fliptune" },
  { id: "29b459b6-1494-44b5-9a73-dc978beed82d", martName: "Katz" },
  { id: "0e04a2f5-914d-4c4f-bbbc-4577d998995a", martName: "Avavee" },
  { id: "149064a5-186b-4468-8d58-58e90b59c8b7", martName: "Yabox" },
  { id: "41514b25-078c-40d3-9408-b22c395d4f2d", martName: "Devcast" },
  { id: "7503d7e0-5992-468f-9175-43ae8ea8f7cc", martName: "Twitterwire" },
  { id: "7cf670b1-5b49-42c0-b932-b4906410a0cf", martName: "Photofeed" },
  { id: "ef4caf3a-2519-459d-b75f-28e1d65573f5", martName: "Devpoint" },
  { id: "a753ccf6-b81d-48c6-bb72-389940e96f4f", martName: "Kwideo" },
  { id: "e248bc6f-afeb-427a-9c16-29fa05087c95", martName: "Plambee" },
  { id: "f02f86ab-7c62-4faf-a6d1-eddb1d6e139e", martName: "Roodel" },
  { id: "3b2da12d-910a-4790-8500-7a1d848e4d85", martName: "Kamba" },
  { id: "6555d917-078e-41fc-a54c-94f65c7ba2b1", martName: "Cogilith" },
  { id: "6555d917-078e-41fc-a54c-94f65c7ba2b1231", martName: "Cogilith" },
  { id: "6555d917-078e-41fc-a54c-12394f65c7ba2b1231", martName: "Cogilith" },
];

export function SelectedMartScreen() {
  const [query, setQuery] = useState("");
  const { startLoading, endLoading, loading } = useLoadingContext();

  const [pageData, setPageData] = useState({
    martName: "",
    items: [],
  });

  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    const getData = async () => {
      startLoading();
      const martRef = doc(db, "Mart", route.params.martID);

      const mart = await getDoc(martRef);

      console.log("CBM", mart.data());

      const q = que(ItemCollection, where("MartID", "==", mart.id));

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
        martName: mart.data().MartName,
        items: items,
      });

      endLoading();
    };

    if (route.params) {
      getData();
    }
  }, [route]);

  console.log("CBM", { pageData });

  return (
    <Container>
      <View style={styles.circleRight}></View>
      <TouchableOpacity onPress={() => navigation.navigate("ProductScanner")}>
        <View
          style={{
            width: 50,
            height: 50,
            backgroundColor: COLORS.WHITE,
            borderRadius: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            elevation: 10,
            marginLeft: "auto",
          }}
        >
          <AntDesign name="scan1" size={24} color="black" />
        </View>
      </TouchableOpacity>
      <View style={styles.container}>
        <Text style={styles.heading}>{pageData.martName}</Text>
        <Text style={styles.subHeading}>
          Select a product from the list or scan a products QR Code.
        </Text>

        {loading && <ActivityIndicator color={COLORS.BLACK} />}

        <Input
          placeholder="Search Product ..."
          onChange={(text) => setQuery(text)}
        />

        <ProductList
          products={
            pageData.items.filter((o) =>
              Object.keys(o).some((k) =>
                String(o[k]).toLowerCase().includes(query.toLowerCase())
              )
            ) || []
          }
          onProductPress={(itemID) => {
            navigation.navigate("ProductScreen", { itemID });
          }}
          query={query}
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

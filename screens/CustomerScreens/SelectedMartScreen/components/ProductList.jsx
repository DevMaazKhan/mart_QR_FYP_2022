import { useRef } from "react";
import {
  View,
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "../../../../constants/Theme";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

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

function ProductList({ query }) {
  const scrollY = useRef(new Animated.Value(0)).current;

  const navigation = useNavigation();

  return (
    <View
      style={{
        backgroundColor: "transparent",
        height: 420,
      }}
    >
      <Animated.FlatList
        bounces={false}
        showsVerticalScrollIndicator={false}
        data={mockData.filter((data) => data.martName.includes(query))}
        renderItem={({ item, index }) => {
          const scale = scrollY.interpolate({
            inputRange: [-1, 0, 153 * index, 153 * (index + 1)],
            outputRange: [1, 1, 1, 0],
          });

          const opacity = scrollY.interpolate({
            inputRange: [-1, 0, 153 * index, 153 * (index + 0.6)],
            outputRange: [1, 1, 1, 0],
          });

          return (
            <Animated.View style={[{ transform: [{ scale }], opacity }]}>
              <TouchableOpacity
                style={styles.container}
                activeOpacity={0.7}
                onPress={() => navigation.navigate("ProductScreen")}
              >
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
                    <Text style={{ color: COLORS.WHITE, fontSize: 10 }}>
                      Nestle
                    </Text>
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
                    <Text style={{ color: COLORS.BLACK, fontSize: 8 }}>
                      Shampoo
                    </Text>
                  </View>
                </View>

                <Text style={styles.martName}>{item.martName}</Text>
                <Text style={styles.martDesc}>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero
                  dolore
                </Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-start",
                  }}
                >
                  <Text
                    style={{
                      color: COLORS.BLACK,
                      opacity: 0.8,
                      marginRight: 10,
                    }}
                  >
                    Price:
                  </Text>
                  <Text style={{ fontFamily: "BOLD", color: COLORS.BLACK }}>
                    123 RS
                  </Text>
                </View>
                <View
                  style={{
                    alignItems: "flex-end",
                    width: "100%",
                    marginTop: "auto",
                  }}
                >
                  <AntDesign name="right" size={20} color={COLORS.PRIMARY} />
                </View>
              </TouchableOpacity>
            </Animated.View>
          );
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          {
            useNativeDriver: true,
          }
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 140,
    maxHeight: 140,
    backgroundColor: COLORS.WHITE,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: "flex-start",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  martNameHeading: {
    fontSize: 10,
    fontFamily: "MEDIUM",
  },
  martName: {
    marginTop: -7,
    fontSize: 24,
    fontFamily: "BOLD",
    textAlign: "center",
    color: COLORS.PRIMARY,
  },
  martDesc: {
    marginTop: -12,
    fontSize: 12,
    fontFamily: "LIGHT",
    color: COLORS.BLACK,
    opacity: 0.5,
  },
});

export default ProductList;

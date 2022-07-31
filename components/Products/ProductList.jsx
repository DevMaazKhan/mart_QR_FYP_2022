import { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "../../constants/Theme";
import { AntDesign } from "@expo/vector-icons";

export function ProductList({ products, onProductPress, query }) {
  const scrollY = useRef(new Animated.Value(0)).current;

  console.log("CBM", { products });

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
        data={products}
        keyExtractor={(e) => e.id}
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
                onPress={() => onProductPress(item.id)}
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
                  {item?.company?.CompanyName && (
                    <View
                      style={{
                        backgroundColor: COLORS.PRIMARY,
                        paddingHorizontal: 10,
                        paddingVertical: 2,
                        borderRadius: 10,
                      }}
                    >
                      <Text style={{ color: COLORS.WHITE, fontSize: 10 }}>
                        {item?.company?.CompanyName}
                      </Text>
                    </View>
                  )}

                  {item.category?.CategoryName && (
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
                        {item.category?.CategoryName}
                      </Text>
                    </View>
                  )}
                </View>

                <Text style={styles.martName}>{item.ItemName}</Text>
                <Text style={styles.martDesc}>{item.ItemDesc}</Text>
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
                  {item.DPrice && +item.DPrice > 0 ? (
                    <>
                      <Text
                        style={{
                          fontFamily: "BOLD",
                          color: COLORS.ERROR,
                          textDecorationLine: "line-through",
                        }}
                      >
                        {item.TPrice} RS
                      </Text>
                      <Text
                        style={{
                          fontFamily: "BOLD",
                          color: COLORS.SUCCESS,
                          marginLeft: 10,
                        }}
                      >
                        {item.DPrice} RS
                      </Text>
                    </>
                  ) : (
                    <Text style={{ fontFamily: "BOLD", color: COLORS.BLACK }}>
                      {item.TPrice} RS
                    </Text>
                  )}
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

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
        data={
          products
            ? products.filter((data) => data.martName.includes(query))
            : []
        }
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
                onPress={onProductPress}
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

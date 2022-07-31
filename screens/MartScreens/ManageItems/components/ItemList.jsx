import { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "../../../../constants/Theme";
import { AntDesign } from "@expo/vector-icons";
import { useItemScreenContext } from "../ManageItem.context";

export function ItemList() {
  const scrollY = useRef(new Animated.Value(0)).current;

  const { pageState, pageMethods } = useItemScreenContext();

  return (
    <View
      style={{
        backgroundColor: "transparent",
        height: 600,
      }}
    >
      <Animated.FlatList
        bounces={false}
        showsVerticalScrollIndicator={false}
        data={pageState.items}
        keyExtractor={(item) => item.ID}
        renderItem={({ item, index }) => {
          const scale = scrollY.interpolate({
            inputRange: [-1, 0, 100 * index, 100 * (index + 1)],
            outputRange: [1, 1, 1, 0],
          });

          const opacity = scrollY.interpolate({
            inputRange: [-1, 0, 100 * index, 100 * (index + 0.6)],
            outputRange: [1, 1, 1, 0],
          });

          return (
            <Animated.View style={[{ transform: [{ scale }], opacity }]}>
              <TouchableOpacity
                style={styles.container}
                activeOpacity={0.7}
                onPress={() => pageMethods.onItemClick(item)}
              >
                <Text style={styles.ItemName}>{item.ItemName}</Text>
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
    minHeight: 90,
    maxHeight: 90,
    backgroundColor: COLORS.WHITE,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: "flex-start",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  ItemNameHeading: {
    fontSize: 10,
    fontFamily: "MEDIUM",
  },
  ItemName: {
    marginTop: -7,
    fontSize: 24,
    fontFamily: "BOLD",
    textAlign: "center",
    color: COLORS.PRIMARY,
  },
  ItemDesc: {
    fontSize: 10,
    color: COLORS.BLACK,
    marginTop: -10,
  },
});

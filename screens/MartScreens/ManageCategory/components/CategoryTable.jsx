import { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "../../../../constants/Theme";
import { useCategoryScreenContext } from "../ManageCategory.context";

export function CategoryList() {
  const scrollY = useRef(new Animated.Value(0)).current;

  const { pageState, pageMethods } = useCategoryScreenContext();

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
        data={pageState.categories}
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
                <Text style={styles.name}>{item.CategoryName}</Text>
                <Text style={styles.desc}>{item.CategoryDesc}</Text>
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
  name: {
    marginTop: -7,
    fontSize: 24,
    fontFamily: "BOLD",
    textAlign: "center",
    color: COLORS.PRIMARY,
  },
  desc: {
    fontSize: 10,
    color: COLORS.BLACK,
    marginTop: -10,
  },
});

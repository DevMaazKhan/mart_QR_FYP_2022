import { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "../../../../constants/Theme";
import { useFloorScreenContext } from "../ManageFloors.context";

export function FloorList() {
  const scrollY = useRef(new Animated.Value(0)).current;

  const { pageState, pageMethods } = useFloorScreenContext();

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
        data={pageState.floors}
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
                <Text style={styles.FloorName}>{item.FloorName}</Text>
                <Text style={styles.FloorDesc}>{item.FloorDesc}</Text>
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
  FloorNameHeading: {
    fontSize: 10,
    fontFamily: "MEDIUM",
  },
  FloorName: {
    marginTop: -7,
    fontSize: 24,
    fontFamily: "BOLD",
    textAlign: "center",
    color: COLORS.PRIMARY,
  },
  FloorDesc: {
    fontSize: 10,
    color: COLORS.BLACK,
    marginTop: -10,
  },
});

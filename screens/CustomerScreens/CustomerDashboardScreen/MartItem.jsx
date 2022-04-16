import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS } from "../../../constants/Theme";

function MartItem({ item }) {
  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.container}>
      <Text style={styles.martName}>{item.martName}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 100,
    borderColor: COLORS.PRIMARY,
    borderWidth: 1,
    backgroundColor: COLORS.WHITE,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    padding: 20,
    borderRadius: 10,
  },
  martName: {
    fontSize: 20,
    textTransform: "uppercase",
    fontFamily: "MEDIUM",
    textAlign: "center",
  },
});

export default MartItem;

import { StyleSheet, View } from "react-native";
import { COLORS } from "../../constants/Theme";

function Container({ children }) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.SECONDARY,
    padding: 30,
  },
});

export default Container;

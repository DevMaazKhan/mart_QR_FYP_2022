import { TextInput, StyleSheet } from "react-native";
import { COLORS } from "../../../constants/Theme";

function Input({
  placeholder,
  onChange,
  value,
  keyType = "default",
  type = "name",
}) {
  return (
    <TextInput
      placeholder={placeholder}
      onChangeText={onChange}
      value={value}
      keyboardType={keyType}
      textContentType={type}
      style={styles.input}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: COLORS.WHITE,
    borderWidth: 2,
    borderColor: COLORS.PRIMARY,
    borderRadius: 7,
    padding: 10,
    paddingLeft: 15,
    fontFamily: "BOLD",
  },
});

export default Input;

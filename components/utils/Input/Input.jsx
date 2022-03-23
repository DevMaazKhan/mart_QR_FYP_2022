import { TextInput, StyleSheet, View, Text } from "react-native";
import { COLORS } from "../../../constants/Theme";
import { FontAwesome5 } from "@expo/vector-icons";

function Input({
  placeholder,
  onChange,
  value,
  keyType = "default",
  type = "name",
  label,
  required,
}) {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.labelContainer}>
        <Text style={styles.inputLabel}>{label}</Text>
        {required && <FontAwesome5 name="asterisk" size={5} color="red" />}
      </View>
      <TextInput
        placeholder={placeholder}
        onChangeText={onChange}
        value={value}
        keyboardType={keyType}
        textContentType={type}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  labelContainer: {
    display: "flex",
    flexDirection: "row",
  },
  inputLabel: {
    fontFamily: "MEDIUM",
    marginLeft: 10,
    fontSize: 14,
  },
  input: {
    backgroundColor: COLORS.WHITE,
    borderWidth: 2,
    borderColor: COLORS.PRIMARY,
    borderRadius: 7,
    padding: 10,
    paddingLeft: 15,
    fontFamily: "BOLD",
    marginTop: -2,
  },
});

export default Input;

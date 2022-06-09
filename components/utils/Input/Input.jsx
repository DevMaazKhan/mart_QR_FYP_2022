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
  multiLine,
  numberOfLines,
  secureTextEntry = false,
  isError = false,
  errorText = "",
  disabled = false,
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
        multiline={multiLine}
        numberOfLines={numberOfLines}
        secureTextEntry={secureTextEntry}
        editable={!disabled}
      />
      {isError && <Text style={styles.error}>{errorText}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    maxHeight: 80,
  },
  labelContainer: {
    display: "flex",
    flexDirection: "row",
  },
  inputLabel: {
    fontFamily: "MEDIUM",
    marginLeft: 10,
    fontSize: 12,
  },
  input: {
    backgroundColor: COLORS.WHITE,
    borderWidth: 1,
    borderColor: "#CBE3F6",
    borderRadius: 5,
    padding: 3,
    paddingLeft: 15,
    fontFamily: "BOLD",
    marginTop: -2,
    fontSize: 14,
  },
  error: {
    color: COLORS.ERROR,
    fontSize: 10,
    marginLeft: 5,
  },
});

export default Input;

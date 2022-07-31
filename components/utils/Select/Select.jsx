import { StyleSheet, View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { COLORS } from "../../../constants/Theme";
import { FontAwesome5 } from "@expo/vector-icons";

export function Select({
  options,
  valueKey,
  labelKey,
  required,
  label,
  value,
  onChange,
}) {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.labelContainer}>
        <Text style={styles.inputLabel}>{label}</Text>
        {required && <FontAwesome5 name="asterisk" size={5} color="red" />}
      </View>
      <View style={styles.input}>
        <Picker
          mode="dropdown"
          selectedValue={value}
          onValueChange={(value) => {
            onChange(value);
          }}
        >
          {options.map((el) => (
            <Picker.Item
              key={el[valueKey]}
              label={el[labelKey]}
              value={el[valueKey]}
            />
          ))}
        </Picker>
      </View>
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
    fontSize: 12,
  },
  input: {
    backgroundColor: COLORS.WHITE,
    borderWidth: 1,
    borderColor: "#CBE3F6",
    borderRadius: 5,
    paddingLeft: 1,
    marginTop: -2,
  },
});

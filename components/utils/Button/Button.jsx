import { Text, View } from "react-native";

function Button({ title, width, marginBottom, primary }) {
  return (
    <View
      style={{
        width: width || "100%",
        marginBottom: marginBottom || 0,
        alignItems: "center",
        backgroundColor: primary ? "#77B6EA" : "transparent",
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#77B6EA",
      }}
    >
      <Text
        style={{
          color: primary ? "#fff" : "#333",
          fontWeight: "800",
          fontSize: 16,
        }}
      >
        {title}
      </Text>
    </View>
  );
}

export default Button;

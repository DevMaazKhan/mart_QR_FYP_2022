import { Text, TouchableOpacity } from "react-native";

function Button({ title, width, marginBottom, primary, onClick, size }) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={{
        width: width || "100%",
        marginBottom: marginBottom || 0,
        alignItems: "center",
        backgroundColor: primary ? "#77B6EA" : "transparent",
        padding: size === "lg" ? 15 : size === "md" ? 10 : 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#77B6EA",
      }}
      onPress={onClick}
    >
      <Text
        style={{
          color: primary ? "#fff" : "#333",
          fontWeight: "800",
          fontSize: 16,
          fontFamily: "BOLD",
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export default Button;

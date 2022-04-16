import { useState, useEffect } from "react";
import { Text } from "react-native";
import { useFonts } from "expo-font";
import { FONTS } from "./constants/Theme.js";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./screens/routes";

export default function App() {
  const [loaded] = useFonts(FONTS);
  const [hasMediaPermission, setHasMediaPermission] = useState();

  if (!loaded) return <Text>Loading...</Text>;

  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}

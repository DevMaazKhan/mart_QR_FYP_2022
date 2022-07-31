import { useState, useEffect } from "react";
import { Text } from "react-native";
import { useFonts } from "expo-font";
import { FONTS } from "./constants/Theme.js";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./screens/routes";
import { LoadingContextProvider } from "./contexts/LoadingContext.jsx";
import { UserContextProvider } from "./contexts/UserContext";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Setting a timer"]);

export default function App() {
  const [loaded] = useFonts(FONTS);

  if (!loaded) return <Text>Loading...</Text>;

  return (
    <LoadingContextProvider>
      <UserContextProvider>
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </UserContextProvider>
    </LoadingContextProvider>
  );
}

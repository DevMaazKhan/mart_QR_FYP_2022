import { Text } from "react-native";
import { useFonts } from "expo-font";
import { FONTS } from "./constants/Theme.js";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./screens/routes.js";

export default function App() {
  const [loaded] = useFonts(FONTS);

  if (!loaded) return <Text>Loading...</Text>;

  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}

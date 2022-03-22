import HomeScreen from "./HomeScreen";
import CustomerDashboardScreen from "./CustomerDashboardScreen/CustomerDashboardScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MartLogin from "./MartLogin";

const Stack = createNativeStackNavigator();

function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={HomeScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="CustomerDashboard"
        component={CustomerDashboardScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="MartLogin"
        component={MartLogin}
      />
    </Stack.Navigator>
  );
}

export default Routes;

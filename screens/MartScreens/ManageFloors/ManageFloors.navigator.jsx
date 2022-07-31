import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ManageFloorScreenProvider } from "./ManageFloors.context";
import { ManageFloorDashboard } from "./components/ManageFloorsDashboard";
import { AddEditFloorScreen } from "./components/AddEditFloor";

const Stack = createNativeStackNavigator();

export function ManageFloorNavigator() {
  return (
    <ManageFloorScreenProvider>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="ManageFloorDashboard"
          component={ManageFloorDashboard}
        />
        <Stack.Screen name="AddEditFloor" component={AddEditFloorScreen} />
      </Stack.Navigator>
    </ManageFloorScreenProvider>
  );
}

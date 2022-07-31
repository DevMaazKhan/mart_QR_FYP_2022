import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ManageShelveScreenProvider } from "./ManageShelve.context";
import { ManageShelveDashboard } from "./components/ManageShelveDashboard";
import { AddEditShelveScreen } from "./components/AddEditShelve";

const Stack = createNativeStackNavigator();

export function ManageShelveNavigator() {
  return (
    <ManageShelveScreenProvider>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="ManageShelveDashboard"
          component={ManageShelveDashboard}
        />
        <Stack.Screen name="AddEditShelve" component={AddEditShelveScreen} />
      </Stack.Navigator>
    </ManageShelveScreenProvider>
  );
}

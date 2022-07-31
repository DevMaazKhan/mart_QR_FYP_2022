import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ManageItemScreenProvider } from "./ManageItem.context";
import { ManageItemDashboard } from "./components/ManageItemDashboard";
import { AddEditItemScreen } from "./components/AddEditItem";

const Stack = createNativeStackNavigator();

export function ManageItemNavigator() {
  return (
    <ManageItemScreenProvider>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="ManageItemDashboard"
          component={ManageItemDashboard}
        />
        <Stack.Screen name="AddEditItem" component={AddEditItemScreen} />
      </Stack.Navigator>
    </ManageItemScreenProvider>
  );
}

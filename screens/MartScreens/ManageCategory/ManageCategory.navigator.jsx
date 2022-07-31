import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ManageCategoryScreenProvider } from "./ManageCategory.context";
import { ManageCategoryDashboard } from "./components/ManageCategoryDashboard";
import { AddEditCategoryScreen } from "./components/AddEditCategory";

const Stack = createNativeStackNavigator();

export function ManageCategoryNavigator() {
  return (
    <ManageCategoryScreenProvider>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="ManageCategoryDashboard"
          component={ManageCategoryDashboard}
        />

        <Stack.Screen
          name="AddEditCategory"
          component={AddEditCategoryScreen}
        />
      </Stack.Navigator>
    </ManageCategoryScreenProvider>
  );
}

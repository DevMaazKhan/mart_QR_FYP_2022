import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ManageCompanyScreenProvider } from "./ManageCompany.context";
import { ManageCompanyDashboard } from "./components/ManageCompanyDashboard";
import { AddEditCompanyScreen } from "./components/AddEditCompany";

const Stack = createNativeStackNavigator();

export function ManageCompanyNavigator() {
  return (
    <ManageCompanyScreenProvider>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="ManageCompanyDashboard"
          component={ManageCompanyDashboard}
        />
        <Stack.Screen name="AddEditCompany" component={AddEditCompanyScreen} />
      </Stack.Navigator>
    </ManageCompanyScreenProvider>
  );
}

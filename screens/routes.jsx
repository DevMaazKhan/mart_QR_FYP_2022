import HomeScreen from "./GeneralScreens/HomeScreen/HomeScreen";
import CustomerDashboardScreen from "./CustomerScreens/CustomerDashboardScreen/CustomerDashboardScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MartLogin from "./MartScreens/MartLogin/MartLogin";
import MartDashboard from "./MartScreens/MartDashboard/MartDashboard";
import {
  MartRegisterStepOne,
  MartRegisterStepTwo,
} from "./MartScreens/MartRegisterScreens";
import {
  ForgotPasswordStepOne,
  ForgotPasswordStepThree,
  ForgotPasswordStepTwo,
} from "./GeneralScreens/ForgotPasswordScreens";
import { ManageItemsScreen } from "./MartScreens/ManageItems/ManageItems.screen";
import { AddEditItemScreen } from "./MartScreens/ManageItems/components/AddEditItem";
import { ManageShelvesScreen } from "./MartScreens/ManageShelves/ManageShelves.screen";
import { AddEditShelveScreen } from "./MartScreens/ManageShelves/components/AddEditShelves";
import { ManageFloorsScreen } from "./MartScreens/ManageFloors/ManageFloors.screen";
import { AddEditFloorScreen } from "./MartScreens/ManageFloors/components/AddEditFloor";
import { ManageCategoryScreen } from "./MartScreens/ManageCategory/ManageCategory.screen";
import { AddEditCategoryScreen } from "./MartScreens/ManageCategory/components/AddEditCategory";
import { ManageCompanyScreen } from "./MartScreens/ManageCompany/ManageCompany.screen";
import { AddEditCompanyScreen } from "./MartScreens/ManageCompany/components/AddEditCompany";
import { ManageProfileSettingsScreen } from "./MartScreens/MartProfileSettings/MartProfileSettings.screen";
import { ScannerScreen } from "./CustomerScreens/ScannerScreen/ScannerScreen.screen";
import { SelectedMartScreen } from "./CustomerScreens/SelectedMartScreen/SelectedMart.screen";
import ProductScreen from "./CustomerScreens/ProductScreen/ProductScreen.screen";

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
        name="SelectedMart"
        component={SelectedMartScreen}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="ScannerScreen"
        component={ScannerScreen}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="ProductScreen"
        component={ProductScreen}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="MartLogin"
        component={MartLogin}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="MartDashboard"
        component={MartDashboard}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="MartRegisterStepOne"
        component={MartRegisterStepOne}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="MartRegisterStepTwo"
        component={MartRegisterStepTwo}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="ForgotPasswordStepOne"
        component={ForgotPasswordStepOne}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="ForgotPasswordStepTwo"
        component={ForgotPasswordStepTwo}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="ForgotPasswordStepThree"
        component={ForgotPasswordStepThree}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="ManageItems"
        component={ManageItemsScreen}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="AddEditItemScreen"
        component={AddEditItemScreen}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="ManageShelves"
        component={ManageShelvesScreen}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="AddEditShelveScreen"
        component={AddEditShelveScreen}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="ManageFloors"
        component={ManageFloorsScreen}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="AddEditFloorScreen"
        component={AddEditFloorScreen}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="ManageCategory"
        component={ManageCategoryScreen}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="AddEditCategory"
        component={AddEditCategoryScreen}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="ManageCompany"
        component={ManageCompanyScreen}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="AddEditCompany"
        component={AddEditCompanyScreen}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="MartSettings"
        component={ManageProfileSettingsScreen}
      />
    </Stack.Navigator>
  );
}

export default Routes;

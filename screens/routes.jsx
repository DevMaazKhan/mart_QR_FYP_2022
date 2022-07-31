import HomeScreen from "./GeneralScreens/HomeScreen/HomeScreen";
import CustomerDashboardScreen from "./CustomerScreens/CustomerDashboardScreen/CustomerDashboardScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MartLogin from "./MartScreens/MartLogin/MartLogin";
import MartDashboard from "./MartScreens/MartDashboard/MartDashboard";
import { MartRegisterScreen } from "./MartScreens/MartRegisterScreens/MartRegister.screen";
import {
  ForgotPasswordStepOne,
  ForgotPasswordStepThree,
  ForgotPasswordStepTwo,
} from "./GeneralScreens/ForgotPasswordScreens";
import { ManageCompanyNavigator } from "./MartScreens/ManageCompany/ManageCompany.navigator";
import { ManageProfileSettingsScreen } from "./MartScreens/MartProfileSettings/MartProfileSettings.screen";
import { ScannerScreen } from "./CustomerScreens/ScannerScreen/ScannerScreen.screen";
import { SelectedMartScreen } from "./CustomerScreens/SelectedMartScreen/SelectedMart.screen";
import ProductScreen from "./CustomerScreens/ProductScreen/ProductScreen.screen";
import { CompareProductsScreen } from "./CustomerScreens/CompareProducts/CompareProducts.screen";
import { ManageCategoryNavigator } from "./MartScreens/ManageCategory/ManageCategory.navigator";
import { ManageFloorNavigator } from "./MartScreens/ManageFloors/ManageFloors.navigator";
import { ManageShelveNavigator } from "./MartScreens/ManageShelves/ManageShelve.navigator";
import { ManageItemNavigator } from "./MartScreens/ManageItems/ManageItem.navigator";
import { ProductScanner } from "./CustomerScreens/ProductScanner/ProductScanner.screen";

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
        name="ProductScanner"
        component={ProductScanner}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="ProductScreen"
        component={ProductScreen}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="CompareProductScreen"
        component={CompareProductsScreen}
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
        name="MartRegister"
        component={MartRegisterScreen}
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
        name="ManageItemNavigator"
        component={ManageItemNavigator}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="ManageShelveNavigator"
        component={ManageShelveNavigator}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="ManageFloorNavigator"
        component={ManageFloorNavigator}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="ManageCategoryNavigator"
        component={ManageCategoryNavigator}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="ManageCompanyNavigation"
        component={ManageCompanyNavigator}
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

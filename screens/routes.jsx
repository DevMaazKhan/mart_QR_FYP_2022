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
import { AddEditItemScreen } from "./MartScreens/ManageItems/components/AddEditItemScreen";

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
    </Stack.Navigator>
  );
}

export default Routes;

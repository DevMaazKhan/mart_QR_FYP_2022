import HomeScreen from "./HomeScreen";
import CustomerDashboardScreen from "./CustomerDashboardScreen/CustomerDashboardScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MartLogin from "./MartLogin";
import MartDashboard from "./MartDashboard/MartDashboard";
import {
  MartRegisterStepOne,
  MartRegisterStepTwo,
} from "./MartRegisterScreens";
import {
  ForgotPasswordStepOne,
  ForgotPasswordStepThree,
  ForgotPasswordStepTwo,
} from "./ForgotPasswordScreens";

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
    </Stack.Navigator>
  );
}

export default Routes;

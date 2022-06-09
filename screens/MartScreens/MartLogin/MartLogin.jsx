import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  AvoidKeyboardLayout,
  Button,
  Container,
  Input,
  Toast,
  useToast,
} from "../../../components";
import {
  defaultFormValues,
  formValidationSchema,
} from "./constants/MartLogin.constants";
import {
  auth,
  MartCollection,
  MartInfoCollection,
  UserCollection,
} from "../../../firebase.config";
import { ToastTypes } from "../../../components/utils/Toast/Toast";
import { useFormik } from "formik";
import { useLoadingContext } from "../../../contexts/LoadingContext";
import { useUserContext } from "../../../contexts/UserContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { FirebaseErrors } from "../../../constants/FirebaseErrors";

function MartLogin({ route }) {
  const [toast, showToast] = useToast();
  const navigation = useNavigation();
  const { loginUser } = useUserContext();

  // Showing toast if the route is opened with any param
  useEffect(() => {
    if (route.params) {
      if (route.params.registered) {
        showToast(
          "You have registered successfully",
          "Now you can login",
          ToastTypes.SUCCESS
        );
      }
      if (route.params.passwordChanged) {
        showToast(
          "Password successfully changed",
          "Now you can login with the new password",
          ToastTypes.SUCCESS
        );
      }
    }
  }, [route.params]);

  const { startLoading, endLoading, loading } = useLoadingContext();

  async function login(values, actions) {
    try {
      startLoading();

      const getUserByUsername = query(
        UserCollection,
        where("MartUsername", "==", values.Username.toLowerCase().trim())
      );

      let user = await getDocs(getUserByUsername);

      if (user.size > 0) {
        user = user.docs[0].data();

        try {
          await signInWithEmailAndPassword(
            auth,
            user.MartEmail,
            values.Password
          );
        } catch (error) {
          console.log("CBM", { error });
        }

        if (user.IsMartUser) {
          const getMart = query(
            MartCollection,
            where("UserID", "==", user.UserID)
          );

          let mart = [];
          try {
            mart = await getDocs(getMart);
          } catch (error) {
            console.log("CBM", { error });
          }

          if (mart.size > 0) {
            mart = { ...mart.docs[0].data(), id: mart.docs[0].id };

            const getMartInfo = query(
              MartInfoCollection,
              where("MartID", "==", mart.id)
            );

            let martInfo = [];

            try {
              martInfo = await getDocs(getMartInfo);
            } catch (error) {
              console.log("CBM", { error });
            }

            if (martInfo.size > 0) {
              martInfo = {
                ...martInfo.docs[0].data(),
                id: martInfo.docs[0].id,
              };

              loginUser({
                isMartUser: true,
                isLoggedIn: true,
                username: user.MartUsername,
                userID: user.UserID,
                martName: mart.MartName,
                martAddress: mart.MartAddress,
                martCell: mart.MartCell,
                martEmail: user.MartEmail,
                itemsCount: martInfo.ItemsCount,
                shelvesCount: martInfo.ShelvesCount,
                floorsCount: martInfo.FloorsCount,
                companiesCount: martInfo.CompaniesCount,
                categoriesCount: martInfo.CategoriesCount,
                martID: mart.id,
                martInfoID: martInfo.id,
              });
            }
          }

          navigation.navigate("MartDashboard");
        }
      } else {
        showToast("Invalid Username", "", ToastTypes.ERROR);
      }
    } catch (error) {
      if (error.message === FirebaseErrors.WRONG_PASSWORD) {
        showToast("Invalid Password", "", ToastTypes.ERROR);
      }
    }

    endLoading();
  }

  const { values, handleChange, errors, touched, handleSubmit } = useFormik({
    validationSchema: formValidationSchema,
    initialValues: defaultFormValues,
    onSubmit: login,
  });

  return (
    <AvoidKeyboardLayout>
      <Toast
        msg={toast.msg}
        secondMsg={toast.secondMsg}
        show={toast.show}
        type={toast.type}
      />
      <Container>
        <View style={styles.circleRight}></View>
        <View style={styles.container}>
          <View>
            <Input
              label="Username"
              value={values.Username}
              onChange={handleChange("Username")}
              isError={errors.Username && touched.Username}
              errorText={errors.Username}
              required
            />
            <Input
              label="Password"
              value={values.Password}
              onChange={handleChange("Password")}
              isError={errors.Password && touched.Password}
              errorText={errors.Password}
              secureTextEntry
              required
            />
          </View>
          <View>
            <Button
              title="LOGIN"
              primary
              onClick={handleSubmit}
              isLoading={loading}
            />
            <TouchableOpacity
              style={{ marginBottom: 50 }}
              onPress={() => navigation.navigate("ForgotPasswordStepOne")}
            >
              <Text style={{ textAlign: "right" }}>Forgot Password?</Text>
            </TouchableOpacity>
            <Button
              title="REGISTER"
              onClick={() => navigation.navigate("MartRegister")}
            />
          </View>
        </View>
      </Container>
    </AvoidKeyboardLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    flex: 1,
    justifyContent: "flex-end",
  },
  circleRight: {
    width: 400,
    height: 400,
    backgroundColor: "#77B6EA",
    borderRadius: 400 / 2,
    position: "absolute",
    left: -200,
    bottom: 200,
    opacity: 0.7,
  },
});

export default MartLogin;

import { Formik } from "formik";
import { createContext, useContext, useMemo } from "react";
import {
  defaultValues,
  formValidationSchema,
} from "../constants/MartRegister.constants";
import { addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  auth,
  MartCollection,
  MartInfoCollection,
  UserCollection,
} from "../../../../firebase.config";
import { FirebaseErrors } from "../../../../constants/FirebaseErrors";
import { ToastTypes } from "../../../../components/utils/Toast/Toast";
import { useToast } from "../../../../components";
import { useLoadingContext } from "../../../../contexts/LoadingContext";
import { useNavigation } from "@react-navigation/native";

const MartRegisterContext = createContext(null);

export const useMartRegisterContext = () => useContext(MartRegisterContext);

export function MartRegisterContextProvider({ children }) {
  const navigation = useNavigation();

  const [toast, showToast] = useToast();

  const { startLoading, endLoading } = useLoadingContext();

  async function save(values, actions) {
    try {
      startLoading();
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        `${values.MartEmail.trim()}`,
        values.Password
      );

      console.log("CBM", { userCredentials });

      await addDoc(UserCollection, {
        UserID: userCredentials.user.uid,
        IsMartUser: true,
        MartEmail: values.MartEmail.trim(),
        MartUsername: values.Username.trim().toLowerCase(),
      });

      const mart = await addDoc(MartCollection, {
        MartName: values.MartName.trim(),
        MartAddress: values.MartAddress.trim(),
        MartCell: values.MartCell.trim(),
        UserID: userCredentials.user.uid,
      });

      await addDoc(MartInfoCollection, {
        ItemsCount: 0,
        ShelvesCount: 0,
        FloorsCount: 0,
        CategoriesCount: 0,
        CompaniesCount: 0,
        MartID: mart.id,
      });

      actions.resetForm(defaultValues);
      navigation.navigate("MartLogin", { registered: true });
    } catch (error) {
      if (error.message === FirebaseErrors.EMAIL_IN_USE) {
        showToast(
          "Email Already in use",
          "Please use another email",
          ToastTypes.ERROR
        );
      }

      console.log("CBM", { error });
    } finally {
      endLoading();
    }
  }

  const values = useMemo(() => ({ toast }), [toast]);

  return (
    <Formik
      initialValues={defaultValues}
      onSubmit={save}
      validationSchema={formValidationSchema}
    >
      <MartRegisterContext.Provider value={values}>
        {children}
      </MartRegisterContext.Provider>
    </Formik>
  );
}

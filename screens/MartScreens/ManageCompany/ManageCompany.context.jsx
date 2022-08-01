import { createContext, useContext, useMemo, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useLoadingContext } from "../../../contexts/LoadingContext";
import { useUserContext } from "../../../contexts/UserContext";
import {
  CompanyCollection,
  db,
  ShelveCollection,
} from "../../../firebase.config";
import {
  addDoc,
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useToast } from "../../../components";
import { ToastTypes } from "../../../components/utils/Toast/Toast";

const CompanyScreenContext = createContext({});

const validationSchema = yup.object().shape({
  CompanyName: yup.string().required("Company Name is required"),
});

export const useCompanyScreenContext = () => useContext(CompanyScreenContext);

export const ManageCompanyScreenProvider = ({ children }) => {
  const [pageState, setPageState] = useState({
    companies: [],
  });
  const { user, setUser } = useUserContext();
  const [toast, showToast] = useToast();
  const { startLoading, endLoading, loading } = useLoadingContext();
  const navigation = useNavigation();

  const formMethods = useForm({
    resolver: yupResolver(validationSchema),
  });

  function onItemClick(item) {
    console.log("CBM", { item });

    formMethods.reset({
      ...item,
      ID: item.id,
    });

    navigation.navigate("AddEditCompany");
  }

  async function save() {
    startLoading();

    const isValidValues = await formMethods.trigger();

    if (!isValidValues) {
      endLoading();
      return;
    }

    const values = formMethods.getValues();

    if (values.ID) {
      try {
        const companyByID = doc(db, "Company", values.ID);

        await updateDoc(companyByID, {
          ...values,
          CompanyDesc: formMethods.getValues("CompanyDesc") || "",
        });

        setPageState({
          ...pageState,
          companies: pageState.companies.map((el) =>
            el.ID === values.ID ? { ...values } : el
          ),
        });

        formMethods.reset({
          CompanyName: "",
          CompanyDesc: "",
        });
        navigation.navigate("ManageCompanyDashboard");
      } catch (error) {
        console.log("CBM", { error });
        showToast("Error Occurred", "", ToastTypes.ERROR);
      } finally {
        endLoading();
      }
    } else {
      try {
        const comp = await addDoc(CompanyCollection, {
          ...formMethods.getValues(),
          CompanyDesc: formMethods.getValues("CompanyDesc") || "",
          MartID: user.martID,
        });

        setPageState({
          ...pageState,
          companies: [
            ...pageState.companies,
            {
              ID: comp.id,
              CompanyName: values.CompanyName,
              CompanyDesc: values.CompanyDesc,
            },
          ],
        });

        const collectionById = doc(db, "MartInfo", user.martInfoID);

        await updateDoc(collectionById, {
          CompaniesCount: user.companiesCount + 1,
        });

        setUser((prev) => ({
          ...prev,
          companiesCount: prev.companiesCount + 1,
        }));

        showToast("Company created successfully", "", ToastTypes.SUCCESS);
        formMethods.reset({
          CompanyName: "",
          CompanyDesc: "",
        });
      } catch (error) {
        console.log("CBM", { error });
        showToast("Error Occurred", "", ToastTypes.ERROR);
      } finally {
        endLoading();
      }
    }
  }

  async function deleteItem() {
    startLoading();
    const companyRef = doc(db, "Company", formMethods.getValues("ID"));

    await deleteDoc(companyRef);

    setPageState({
      ...pageState,
      companies: pageState.companies.filter(
        (el) => el.ID !== formMethods.getValues("ID")
      ),
    });

    const collectionById = doc(db, "MartInfo", user.martInfoID);

    await updateDoc(collectionById, {
      CompaniesCount: user.companiesCount - 1,
    });

    setUser((prev) => ({
      ...prev,
      companiesCount: prev.companiesCount - 1,
    }));

    endLoading();

    navigation.navigate("ManageCompanyDashboard");
  }

  useEffect(() => {
    const getData = async () => {
      startLoading();

      const companyQuery = query(
        CompanyCollection,
        where("MartID", "==", user.martID)
      );

      const companies = await getDocs(companyQuery);

      setPageState({
        ...pageState,
        companies: companies.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          ID: doc.id,
        })),
      });

      endLoading();
    };

    getData();
  }, []);

  const values = useMemo(
    () => ({
      pageMethods: {
        onItemClick,
        save,
        deleteItem,
      },
      pageState: {
        ...pageState,
        loading,
        toast,
      },
    }),
    [pageState, loading, toast]
  );

  return (
    <FormProvider {...formMethods}>
      <CompanyScreenContext.Provider value={values}>
        {children}
      </CompanyScreenContext.Provider>
    </FormProvider>
  );
};

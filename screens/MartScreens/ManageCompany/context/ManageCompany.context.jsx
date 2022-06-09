import { createContext, useContext, useMemo, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useLoadingContext } from "../../../../contexts/LoadingContext";
import { useUserContext } from "../../../../contexts/UserContext";
import { CompanyCollection, db } from "../../../../firebase.config";
import { addDoc, doc, getDocs, updateDoc } from "firebase/firestore";

const CompanyScreenContext = createContext({});

export const useCompanyScreenContext = () => useContext(CompanyScreenContext);

export const CompanyScreenProvider = ({ children }) => {
  const [companies, setCompanies] = useState([]);

  const [deleteConfirmModalState, setDeleteConfirmModalState] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const tempCompanies = await getDocs(CompanyCollection);

      setCompanies(
        tempCompanies.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };

    getData();
  }, []);

  const { startLoading, endLoading, loading } = useLoadingContext();
  const navigation = useNavigation();
  const { user, setUser } = useUserContext();

  function openDeleteConfirmModal() {
    setDeleteConfirmModalState(true);
  }

  function hideDeleteConfirmModal() {
    setDeleteConfirmModalState(false);
  }

  function goToAddCompanyScreen() {
    navigation.navigate("AddEditCompany");
  }

  async function saveCompany(values, actions) {
    startLoading();

    const comp = await addDoc(CompanyCollection, values);

    actions.resetForm({
      CompanyName: "",
      CompanyDescr: "",
    });

    setCompanies((prev) => [
      ...prev,
      {
        id: comp.id,
        CompanyName: values.CompanyName,
        CompanyDescr: values.CompanyDescr,
      },
    ]);

    const collectionById = doc(db, "MartInfo", user.martInfoID);

    await updateDoc(collectionById, {
      CompaniesCount: user.companiesCount + 1,
    });

    setUser((prev) => ({ ...prev, companiesCount: prev.companiesCount + 1 }));

    endLoading();
  }

  function deleteCompany() {
    startLoading();
    console.log("CBM", "Delete Company");

    hideDeleteConfirmModal();

    endLoading();
  }

  const values = useMemo(
    () => ({
      //   Functions
      saveCompany,
      deleteCompany,
      goToAddCompanyScreen,
      openDeleteConfirmModal,
      setCompanies,
      // Properties
      companies,
      loading,
      deleteConfirmModalState,
      isEditMode,
    }),
    [companies, loading]
  );

  return (
    <CompanyScreenContext.Provider value={values}>
      {children}
    </CompanyScreenContext.Provider>
  );
};

import { createContext, useContext, useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";

const CompanyScreenContext = createContext({});

export const useCompanyScreenContext = () => useContext(CompanyScreenContext);

export const CompanyScreenProvider = ({ children }) => {
  const [deleteConfirmModalState, setDeleteConfirmModalState] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const navigation = useNavigation();

  function openDeleteConfirmModal() {
    setDeleteConfirmModalState(true);
  }

  function hideDeleteConfirmModal() {
    setDeleteConfirmModalState(false);
  }

  function goToAddCompanyScreen() {
    navigation.navigate("AddEditCompany");
  }

  function saveCompany() {
    console.log("CBM", "Save Company");
  }

  function deleteCompany() {
    console.log("CBM", "Delete Company");

    hideDeleteConfirmModal();
  }

  const values = useMemo(
    () => ({
      //   Functions
      saveCompany,
      deleteCompany,
      goToAddCompanyScreen,
      openDeleteConfirmModal,
      // Properties
      deleteConfirmModalState,
      isEditMode,
    }),
    []
  );

  return (
    <CompanyScreenContext.Provider value={values}>
      {children}
    </CompanyScreenContext.Provider>
  );
};

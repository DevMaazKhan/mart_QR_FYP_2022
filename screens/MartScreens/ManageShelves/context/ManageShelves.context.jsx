import { createContext, useContext, useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";

const ShelveScreenContext = createContext({});

export const useShelveScreenContext = () => useContext(ShelveScreenContext);

export const ShelveScreenProvider = ({ children }) => {
  const [deleteConfirmModalState, setDeleteConfirmModalState] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const navigation = useNavigation();

  function openDeleteConfirmModal() {
    setDeleteConfirmModalState(true);
  }

  function hideDeleteConfirmModal() {
    setDeleteConfirmModalState(false);
  }

  function goToAddShelveScreen() {
    navigation.navigate("AddEditShelveScreen");
  }

  function saveShelve() {
    console.log("CBM", "Save Shelve");
  }

  function deleteShelve() {
    console.log("CBM", "Delete Shelve");

    hideDeleteConfirmModal();
  }

  const values = useMemo(
    () => ({
      //   Functions
      saveShelve,
      deleteShelve,
      goToAddShelveScreen,
      openDeleteConfirmModal,
      // Properties
      deleteConfirmModalState,
      isEditMode,
    }),
    []
  );

  return (
    <ShelveScreenContext.Provider value={values}>
      {children}
    </ShelveScreenContext.Provider>
  );
};

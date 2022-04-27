import { createContext, useContext, useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";

const FloorScreenContext = createContext({});

export const useFloorScreenContext = () => useContext(FloorScreenContext);

export const FloorScreenProvider = ({ children }) => {
  const [deleteConfirmModalState, setDeleteConfirmModalState] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const navigation = useNavigation();

  function openDeleteConfirmModal() {
    setDeleteConfirmModalState(true);
  }

  function hideDeleteConfirmModal() {
    setDeleteConfirmModalState(false);
  }

  function goToAddFloorScreen() {
    navigation.navigate("AddEditFloorScreen");
  }

  function saveFloor() {
    console.log("CBM", "Save Floor");
  }

  function deleteFloor() {
    console.log("CBM", "Delete Floor");

    hideDeleteConfirmModal();
  }

  const values = useMemo(
    () => ({
      //   Functions
      saveFloor,
      deleteFloor,
      goToAddFloorScreen,
      openDeleteConfirmModal,
      // Properties
      deleteConfirmModalState,
      isEditMode,
    }),
    []
  );

  return (
    <FloorScreenContext.Provider value={values}>
      {children}
    </FloorScreenContext.Provider>
  );
};

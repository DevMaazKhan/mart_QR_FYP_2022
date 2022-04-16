import { createContext, useContext, useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";

const ItemScreenContext = createContext({});

export const useItemScreenContext = () => useContext(ItemScreenContext);

export const ItemScreenProvider = ({ children }) => {
  const [deleteConfirmModalState, setDeleteConfirmModalState] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const navigation = useNavigation();

  function openDeleteConfirmModal() {
    setDeleteConfirmModalState(true);
  }

  function hideDeleteConfirmModal() {
    setDeleteConfirmModalState(false);
  }

  function goToAddItemScreen() {
    navigation.navigate("AddEditItemScreen");
  }

  function saveItem() {
    console.log("CBM", "Save Item");
  }

  function deleteItem() {
    console.log("CBM", "Delete Item");

    hideDeleteConfirmModal();
  }

  const values = useMemo(
    () => ({
      //   Functions
      saveItem,
      deleteItem,
      goToAddItemScreen,
      openDeleteConfirmModal,
      // Properties
      deleteConfirmModalState,
      isEditMode,
    }),
    []
  );

  return (
    <ItemScreenContext.Provider value={values}>
      {children}
    </ItemScreenContext.Provider>
  );
};

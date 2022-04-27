import { createContext, useContext, useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";

const CategoryScreenContext = createContext({});

export const useCategoryScreenContext = () => useContext(CategoryScreenContext);

export const CategoryScreenProvider = ({ children }) => {
  const [deleteConfirmModalState, setDeleteConfirmModalState] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const navigation = useNavigation();

  function openDeleteConfirmModal() {
    setDeleteConfirmModalState(true);
  }

  function hideDeleteConfirmModal() {
    setDeleteConfirmModalState(false);
  }

  function goToAddCategoryScreen() {
    navigation.navigate("AddEditCategory");
  }

  function saveCategory() {
    console.log("CBM", "Save Category");
  }

  function deleteCategory() {
    console.log("CBM", "Delete Category");

    hideDeleteConfirmModal();
  }

  const values = useMemo(
    () => ({
      //   Functions
      saveCategory,
      deleteCategory,
      goToAddCategoryScreen,
      openDeleteConfirmModal,
      // Properties
      deleteConfirmModalState,
      isEditMode,
    }),
    []
  );

  return (
    <CategoryScreenContext.Provider value={values}>
      {children}
    </CategoryScreenContext.Provider>
  );
};

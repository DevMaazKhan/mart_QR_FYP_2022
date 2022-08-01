import { createContext, useContext, useMemo, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useLoadingContext } from "../../../contexts/LoadingContext";
import { useUserContext } from "../../../contexts/UserContext";
import { CategoryCollection, db } from "../../../firebase.config";
import {
  addDoc,
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useToast } from "../../../components";
import { ToastTypes } from "../../../components/utils/Toast/Toast";

const CategoryScreenContext = createContext({});

const validationSchema = yup.object().shape({
  CategoryName: yup.string().required("Category Name is required"),
});

export const useCategoryScreenContext = () => useContext(CategoryScreenContext);

export const ManageCategoryScreenProvider = ({ children }) => {
  const [pageState, setPageState] = useState({
    categories: [],
  });
  const { user, setUser } = useUserContext();
  const [toast, showToast] = useToast();
  const { startLoading, endLoading, loading } = useLoadingContext();
  const navigation = useNavigation();

  const formMethods = useForm({
    resolver: yupResolver(validationSchema),
  });

  function onItemClick(item) {
    formMethods.reset({
      ...item,
      ID: item.id,
    });

    navigation.navigate("AddEditCategory");
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
        const CategoryByID = doc(db, "Category", values.ID);

        await updateDoc(CategoryByID, {
          ...values,
          CategoryDesc: formMethods.getValues("CategoryDesc") || "",
        });

        setPageState({
          ...pageState,
          categories: pageState.categories.map((el) =>
            el.ID === values.ID ? { ...values } : el
          ),
        });

        formMethods.reset({
          CategoryName: "",
          CategoryDesc: "",
        });
        navigation.navigate("ManageCategoryDashboard");
      } catch (error) {
        console.log("CBM", { error });
        showToast("Error Occurred", "", ToastTypes.ERROR);
      } finally {
        endLoading();
      }
    } else {
      try {
        const comp = await addDoc(CategoryCollection, {
          ...formMethods.getValues(),
          CategoryDesc: formMethods.getValues("CategoryDesc") || "",
          MartID: user.martID,
        });

        setPageState({
          ...pageState,
          categories: [
            ...pageState.categories,
            {
              ID: comp.id,
              CategoryName: values.CategoryName,
              CategoryDesc: values.CategoryDesc,
            },
          ],
        });

        const collectionById = doc(db, "MartInfo", user.martInfoID);

        await updateDoc(collectionById, {
          CategoriesCount: user.categoriesCount + 1,
        });

        setUser((prev) => ({
          ...prev,
          categoriesCount: prev.categoriesCount + 1,
        }));

        showToast("Category created successfully", "", ToastTypes.SUCCESS);
        formMethods.reset({
          CategoryName: "",
          CategoryDesc: "",
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
    const CategoryRef = doc(db, "Category", formMethods.getValues("ID"));

    await deleteDoc(CategoryRef);

    setPageState({
      ...pageState,
      categories: pageState.categories.filter(
        (el) => el.ID !== formMethods.getValues("ID")
      ),
    });

    const collectionById = doc(db, "MartInfo", user.martInfoID);

    await updateDoc(collectionById, {
      CategoriesCount: user.categoriesCount - 1,
    });

    setUser((prev) => ({
      ...prev,
      categoriesCount: prev.categoriesCount - 1,
    }));

    endLoading();

    navigation.navigate("ManageCategoryDashboard");
  }

  useEffect(() => {
    const getData = async () => {
      const categoryQuery = query(
        CategoryCollection,
        where("MartID", "==", user.martID)
      );

      const categories = await getDocs(categoryQuery);

      setPageState({
        ...pageState,
        categories: categories.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          ID: doc.id,
        })),
      });
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
      <CategoryScreenContext.Provider value={values}>
        {children}
      </CategoryScreenContext.Provider>
    </FormProvider>
  );
};

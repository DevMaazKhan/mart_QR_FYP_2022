import { createContext, useContext, useMemo, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useLoadingContext } from "../../../contexts/LoadingContext";
import { useUserContext } from "../../../contexts/UserContext";
import {
  ShelveCollection,
  db,
  FloorCollection,
  CategoryCollection,
} from "../../../firebase.config";
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

const ShelveScreenContext = createContext({});

const validationSchema = yup.object().shape({
  ShelveName: yup.string().required("Shelve Name is required"),
});

export const useShelveScreenContext = () => useContext(ShelveScreenContext);

export const ManageShelveScreenProvider = ({ children }) => {
  const [pageState, setPageState] = useState({
    shelves: [],
  });
  const [pageDataSets, setPageDataSets] = useState({
    floors: [],
    categories: [],
  });
  const { user, setUser } = useUserContext();
  const [toast, showToast] = useToast();
  const { startLoading, endLoading, loading } = useLoadingContext();
  const navigation = useNavigation();

  const formMethods = useForm({
    resolver: yupResolver(validationSchema),
  });

  function resetItemForm() {
    formMethods.reset({
      ShelveName: "",
      CategoryID: "",
      FloorID: "",
      ID: undefined,
    });
  }

  function onNewItemAdd() {
    resetItemForm();
    navigation.navigate("AddEditShelve");
  }

  function onItemClick(item) {
    console.log("CBM", { item });

    formMethods.reset({
      ...item,
      ID: item.id,
    });

    navigation.navigate("AddEditShelve");
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
        const ShelveByID = doc(db, "Shelve", values.ID);

        await updateDoc(ShelveByID, {
          ...values,
          FloorID: formMethods.getValues("FloorID") || "",
          CategoryID: formMethods.getValues("CategoryID") || "",
          ID: formMethods.getValues("ID") || "",
        });

        setPageState({
          ...pageState,
          shelves: pageState.shelves.map((el) =>
            el.ID === values.ID ? { ...values } : el
          ),
        });

        formMethods.reset({
          ShelveName: "",
          ShelveDesc: "",
        });
        navigation.navigate("ManageShelveDashboard");
      } catch (error) {
        console.log("CBM", { error });
        showToast("Error Occurred", "", ToastTypes.ERROR);
      } finally {
        endLoading();
      }
    } else {
      try {
        const comp = await addDoc(ShelveCollection, {
          ...formMethods.getValues(),
          FloorID: formMethods.getValues("FloorID") || "",
          CategoryID: formMethods.getValues("CategoryID") || "",
          ID: formMethods.getValues("ID") || "",
          MartID: user.martID,
        });

        setPageState({
          ...pageState,
          shelves: [
            ...pageState.shelves,
            {
              ID: comp.id,
              ShelveName: values.ShelveName,
              ShelveDesc: values.ShelveDesc,
            },
          ],
        });

        const collectionById = doc(db, "MartInfo", user.martInfoID);

        await updateDoc(collectionById, {
          ShelvesCount: user.shelvesCount + 1,
        });

        setUser((prev) => ({
          ...prev,
          shelvesCount: prev.shelvesCount + 1,
        }));

        showToast("Shelve created successfully", "", ToastTypes.SUCCESS);
        formMethods.reset({
          ShelveName: "",
          ShelveDesc: "",
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
    const ShelveRef = doc(db, "Shelve", formMethods.getValues("ID"));

    await deleteDoc(ShelveRef);

    setPageState({
      ...pageState,
      shelves: pageState.shelves.filter(
        (el) => el.ID !== formMethods.getValues("ID")
      ),
    });

    const collectionById = doc(db, "MartInfo", user.martInfoID);

    await updateDoc(collectionById, {
      ShelvesCount: user.shelvesCount - 1,
    });

    setUser((prev) => ({
      ...prev,
      shelvesCount: prev.shelvesCount + 1,
    }));

    endLoading();

    navigation.navigate("ManageShelveDashboard");
  }

  useEffect(() => {
    const getData = async () => {
      startLoading();
      const floorQuery = query(
        ShelveCollection,
        where("MartID", "==", user.martID)
      );
      const shelveQuery = query(
        ShelveCollection,
        where("MartID", "==", user.martID)
      );
      const categoryQuery = query(
        CategoryCollection,
        where("MartID", "==", user.martID)
      );

      const shelves = await getDocs(shelveQuery);
      const floors = await getDocs(floorQuery);
      const categories = await getDocs(categoryQuery);

      setPageState({
        ...pageState,
        shelves: shelves.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          ID: doc.id,
        })),
      });

      setPageDataSets({
        ...pageDataSets,
        floors: floors.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          ID: doc.id,
        })),
        categories: categories.docs.map((doc) => ({
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
        onNewItemAdd,
        onItemClick,
        save,
        deleteItem,
      },
      pageState: {
        ...pageState,
        loading,
        toast,
      },
      pageDataSets,
    }),
    [pageState, loading, toast, pageDataSets]
  );

  return (
    <FormProvider {...formMethods}>
      <ShelveScreenContext.Provider value={values}>
        {children}
      </ShelveScreenContext.Provider>
    </FormProvider>
  );
};

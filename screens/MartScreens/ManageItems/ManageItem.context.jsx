import { createContext, useContext, useMemo, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useLoadingContext } from "../../../contexts/LoadingContext";
import { useUserContext } from "../../../contexts/UserContext";
import {
  ItemCollection,
  db,
  ShelveCollection,
  CompanyCollection,
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

const ItemScreenContext = createContext({});

const validationSchema = yup.object().shape({
  ItemName: yup.string().required("Item Name is required"),
  TPrice: yup.string().required("Price is required"),
});

export const useItemScreenContext = () => useContext(ItemScreenContext);

export const ManageItemScreenProvider = ({ children }) => {
  const [pageState, setPageState] = useState({
    items: [],
  });

  const [pageDataSets, setPageDataSets] = useState({
    shelves: [],
    companies: [],
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
      ItemName: "",
      ItemSpec: "",
      ItemDesc: "",
      TPrice: "",
      DPrice: "",
      ShelveID: "",
      CompanyID: "",
      ID: undefined,
    });
  }

  function onNewItemAdd() {
    resetItemForm();
    navigation.navigate("AddEditItem");
  }

  function onItemClick(item) {
    formMethods.reset({
      ...item,
      ID: item.id,
    });

    navigation.navigate("AddEditItem");
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
        const ItemByID = doc(db, "Item", values.ID);

        await updateDoc(ItemByID, {
          ...values,
          ItemSpec: formMethods.getValues("ItemSpec") || "",
          ItemDesc: formMethods.getValues("ItemDesc") || "",
          DPrice: formMethods.getValues("DPrice") || "",
          ShelveID: formMethods.getValues("ShelveID") || "",
          CompanyID: formMethods.getValues("CompanyID") || "",
          ID: formMethods.getValues("ID") || "",
        });

        setPageState({
          ...pageState,
          items: pageState.items.map((el) =>
            el.ID === values.ID ? { ...values } : el
          ),
        });

        formMethods.reset({
          ItemName: "",
          ItemDesc: "",
        });
        navigation.navigate("ManageItemDashboard");
      } catch (error) {
        console.log("CBM", { error });
        showToast("Error Occurred", "", ToastTypes.ERROR);
      } finally {
        endLoading();
      }
    } else {
      try {
        const comp = await addDoc(ItemCollection, {
          ...formMethods.getValues(),
          ItemSpec: formMethods.getValues("ItemSpec") || "",
          ItemDesc: formMethods.getValues("ItemDesc") || "",
          DPrice: formMethods.getValues("DPrice") || "",
          ShelveID: formMethods.getValues("ShelveID") || "",
          CompanyID: formMethods.getValues("CompanyID") || "",
          ID: formMethods.getValues("ID") || "",
          MartID: user.martID,
        });

        setPageState({
          ...pageState,
          items: [
            ...pageState.items,
            {
              ID: comp.id,
              ItemName: values.ItemName,
              ItemDesc: values.ItemDesc,
            },
          ],
        });

        const collectionById = doc(db, "MartInfo", user.martInfoID);

        await updateDoc(collectionById, {
          ItemsCount: user.itemsCount + 1,
        });

        setUser((prev) => ({
          ...prev,
          itemsCount: prev.itemsCount + 1,
        }));

        showToast("Item created successfully", "", ToastTypes.SUCCESS);
        formMethods.reset({
          ItemName: "",
          ItemDesc: "",
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
    const ItemRef = doc(db, "Item", formMethods.getValues("ID"));

    await deleteDoc(ItemRef);

    setPageState({
      ...pageState,
      items: pageState.items.filter(
        (el) => el.ID !== formMethods.getValues("ID")
      ),
    });

    const collectionById = doc(db, "MartInfo", user.martInfoID);

    await updateDoc(collectionById, {
      ItemsCount: user.itemsCount - 1,
    });

    setUser((prev) => ({
      ...prev,
      itemsCount: prev.itemsCount - 1,
    }));

    endLoading();

    navigation.navigate("ManageItemDashboard");
  }

  useEffect(() => {
    const getData = async () => {
      const itemQuery = query(
        ItemCollection,
        where("MartID", "==", user.martID)
      );

      const items = await getDocs(itemQuery);

      const shelveQuery = query(
        ShelveCollection,
        where("MartID", "==", user.martID)
      );
      const companiesQuery = query(
        CompanyCollection,
        where("MartID", "==", user.martID)
      );

      const shelves = await getDocs(shelveQuery);
      const companies = await getDocs(companiesQuery);

      setPageState({
        ...pageState,
        items: items.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          ID: doc.id,
        })),
      });

      setPageDataSets({
        ...pageDataSets,
        shelves: shelves.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          ID: doc.id,
        })),
        companies: companies.docs.map((doc) => ({
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
      <ItemScreenContext.Provider value={values}>
        {children}
      </ItemScreenContext.Provider>
    </FormProvider>
  );
};

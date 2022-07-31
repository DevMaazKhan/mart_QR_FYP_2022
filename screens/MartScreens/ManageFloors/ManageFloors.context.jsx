import { createContext, useContext, useMemo, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useLoadingContext } from "../../../contexts/LoadingContext";
import { useUserContext } from "../../../contexts/UserContext";
import { FloorCollection, db } from "../../../firebase.config";
import { addDoc, doc, getDocs, updateDoc, deleteDoc } from "firebase/firestore";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useToast } from "../../../components";
import { ToastTypes } from "../../../components/utils/Toast/Toast";

const FloorScreenContext = createContext({});

const validationSchema = yup.object().shape({
  FloorName: yup.string().required("Floor Name is required"),
});

export const useFloorScreenContext = () => useContext(FloorScreenContext);

export const ManageFloorScreenProvider = ({ children }) => {
  const [pageState, setPageState] = useState({
    floors: [],
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

    navigation.navigate("AddEditFloor");
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
        const FloorByID = doc(db, "Floor", values.ID);

        await updateDoc(FloorByID, {
          ...values,
          FloorDesc: formMethods.getValues("FloorDesc") || "",
        });

        setPageState({
          ...pageState,
          floors: pageState.floors.map((el) =>
            el.ID === values.ID ? { ...values } : el
          ),
        });

        formMethods.reset({
          FloorName: "",
          FloorDesc: "",
        });
        navigation.navigate("ManageFloorDashboard");
      } catch (error) {
        console.log("CBM", { error });
        showToast("Error Occurred", "", ToastTypes.ERROR);
      } finally {
        endLoading();
      }
    } else {
      try {
        const comp = await addDoc(FloorCollection, {
          ...formMethods.getValues(),
          FloorDesc: formMethods.getValues("FloorDesc") || "",
        });

        setPageState({
          ...pageState,
          floors: [
            ...pageState.floors,
            {
              ID: comp.id,
              FloorName: values.FloorName,
              FloorDesc: values.FloorDesc,
            },
          ],
        });

        const collectionById = doc(db, "MartInfo", user.martInfoID);

        await updateDoc(collectionById, {
          FloorsCount: user.floorsCount + 1,
        });

        setUser((prev) => ({
          ...prev,
          floorsCount: prev.floorsCount + 1,
        }));

        showToast("Floor created successfully", "", ToastTypes.SUCCESS);
        formMethods.reset({
          FloorName: "",
          FloorDesc: "",
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
    const FloorRef = doc(db, "Floor", formMethods.getValues("ID"));

    await deleteDoc(FloorRef);

    setPageState({
      ...pageState,
      floors: pageState.floors.filter(
        (el) => el.ID !== formMethods.getValues("ID")
      ),
    });

    const collectionById = doc(db, "MartInfo", user.martInfoID);

    await updateDoc(collectionById, {
      FloorsCount: user.floorsCount - 1,
    });

    setUser((prev) => ({
      ...prev,
      floorsCount: prev.floorsCount - 1,
    }));

    endLoading();

    navigation.navigate("ManageFloorDashboard");
  }

  useEffect(() => {
    const getData = async () => {
      const floors = await getDocs(FloorCollection);

      setPageState({
        ...pageState,
        floors: floors.docs.map((doc) => ({
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
      <FloorScreenContext.Provider value={values}>
        {children}
      </FloorScreenContext.Provider>
    </FormProvider>
  );
};

import { useState } from "react";
import MartRegisterStepOneScreen from "./MartRegisterStepOneScreen.screen";
import MartRegisterStepTwoScreen from "./MartRegisterStepTwoScreen.screen";
import { MartRegisterContextProvider } from "./context/MartRegister.context";

export function MartRegisterScreen() {
  const [currentScreen, setCurrentScreen] = useState("1");

  return (
    <MartRegisterContextProvider>
      {currentScreen === "1" ? (
        <MartRegisterStepOneScreen setCurrentScreen={setCurrentScreen} />
      ) : (
        <MartRegisterStepTwoScreen setCurrentScreen={setCurrentScreen} />
      )}
    </MartRegisterContextProvider>
  );
}

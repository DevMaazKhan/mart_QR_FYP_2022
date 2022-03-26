import { useRef, useState, useEffect } from "react";
import { Text, StyleSheet, Animated } from "react-native";
import { COLORS } from "../../../constants/Theme";
import animate from "../../../utils/animate";

export const ToastTypes = {
  SUCCESS: "SUCCESS",
  WARNING: "WARNING",
  ERROR: "ERROR",
};

export function useToast() {
  const [toast, setToast] = useState({
    msg: "",
    type: "",
    duration: NaN,
    show: false,
  });

  function showToast(msg, type, duration = 4000) {
    setToast({ msg, type, duration, show: true });

    setTimeout(() => {
      setToast({ msg, type, duration: NaN, show: false });
    }, duration);
  }

  return [toast, showToast];
}

function Toast({ msg, type, duration, show }) {
  const toastTypeContStyles =
    type === ToastTypes.SUCCESS
      ? styles.successToast
      : type === ToastTypes.WARNING
      ? styles.warningToast
      : styles.errorToast;

  const toastTypeTextStyles =
    type === ToastTypes.SUCCESS
      ? styles.successToastText
      : type === ToastTypes.WARNING
      ? styles.warningToastText
      : styles.errorToastText;

  const translateY = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    if (show) {
      animate(translateY, 0, 400);
    } else if (!show) {
      animate(translateY, -100, 400);
    }
  }, [show]);

  return (
    <Animated.View
      style={{
        ...styles.container,
        ...toastTypeContStyles,
        transform: [{ translateY }],
      }}
    >
      <Text style={{ ...toastTypeTextStyles }}>{msg}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 100,
    position: "absolute",
    zIndex: 99,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
  },

  successToast: {
    backgroundColor: COLORS.SUCCESS,
  },
  warningToast: {
    backgroundColor: COLORS.WARNING,
  },
  errorToast: {
    backgroundColor: COLORS.ERROR,
  },

  successToastText: {
    color: COLORS.WHITE,
    fontFamily: "REGULAR",
    fontSize: 16,
  },
  warningToastText: {
    color: COLORS.BLACK,
    fontFamily: "REGULAR",
    fontSize: 16,
  },
  errorToastText: {
    color: COLORS.WHITE,
    fontFamily: "REGULAR",
    fontSize: 16,
  },
});

export default Toast;

import { useRef, useState, useEffect } from "react";
import { Text, StyleSheet, View, Dimensions } from "react-native";
import { BarCodeScanner, BarCodeBounds } from "expo-barcode-scanner";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { COLORS } from "../../../constants/Theme";

export function ScannerScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{
          flex: 1,
          aspectRatio: 9 / 16,
        }}
      >
        <View
          style={{
            alignItems: "center",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <View
            style={{
              width: "70%",
              height: 300,
              backgroundColor: "transparent",
              marginRight: 22,
              marginBottom: 100,
            }}
          >
            <Ionicons name="scan-outline" size={280} color="white" />
          </View>

          <View
            style={{
              backgroundColor: COLORS.BLACK,
              borderRadius: 100,
              width: 60,
              height: 60,
              marginRight: 22,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AntDesign name="close" size={44} color={COLORS.WHITE} />
          </View>
        </View>
      </BarCodeScanner>
    </View>
  );
}

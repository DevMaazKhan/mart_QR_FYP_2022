import { View, Text, StyleSheet } from "react-native";

// import { ShelvesList } from "../../../../components/Shelves/ShelvesList";
import { Input } from "../../../../components";

export function ShelvesTable() {
  return (
    <View>
      <Input label="Search Shelve..." />
      <View>{/* <ShelvesList /> */}</View>
    </View>
  );
}

const styles = StyleSheet.create({});

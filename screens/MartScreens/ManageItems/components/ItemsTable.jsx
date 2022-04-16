import { View, Text, StyleSheet } from "react-native";

import { ItemsList } from "../../../../components/Items/ItemsList";
import { Input } from "../../../../components";

export function ItemsTable() {
  return (
    <View>
      <Input label="Search Item..." />
      <View>
        <ItemsList />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});

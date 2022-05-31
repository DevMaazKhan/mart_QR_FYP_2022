import { View, Text, StyleSheet } from "react-native";

import { ProductList } from "../../../../components/Products/ProductList";
import { Input } from "../../../../components";

export function ItemsTable() {
  return (
    <View>
      <Input label="Search Item..." />
      <View>
        <ProductList products={[]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});

import { ManageItemsDashboard } from "./components/ManageItemsDashboard";
import { ItemScreenProvider } from "./context/ManageItems.context";

export function ManageItemsScreen() {
  return (
    <ItemScreenProvider>
      <ManageItemsDashboard />
    </ItemScreenProvider>
  );
}

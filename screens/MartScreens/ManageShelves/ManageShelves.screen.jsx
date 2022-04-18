import { ManageShelvesDashboard } from "./components/ManageShelvesDashboard";
import { ShelveScreenProvider } from "./context/ManageShelves.context";

export function ManageShelvesScreen() {
  return (
    <ShelveScreenProvider>
      <ManageShelvesDashboard />
    </ShelveScreenProvider>
  );
}

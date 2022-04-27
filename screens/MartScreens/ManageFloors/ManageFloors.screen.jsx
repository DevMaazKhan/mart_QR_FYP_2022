import { ManageFloorsDashboard } from "./components/ManageFloorsDashboard";
import { FloorScreenProvider } from "./context/ManageFloors.context";

export function ManageFloorsScreen() {
  return (
    <FloorScreenProvider>
      <ManageFloorsDashboard />
    </FloorScreenProvider>
  );
}

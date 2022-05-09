import { ManageProfileSettingsProvider } from "./context/MartProfileSettings.context";
import { MartProfileSettingsDashboard } from "./components/MartProfileSettingsDashboard";

export function ManageProfileSettingsScreen() {
  return (
    <ManageProfileSettingsProvider>
      <MartProfileSettingsDashboard />
    </ManageProfileSettingsProvider>
  );
}
